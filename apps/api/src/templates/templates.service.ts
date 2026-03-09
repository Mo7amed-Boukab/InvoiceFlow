import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { google } from 'googleapis';
import { Template } from './entities/template.entity';
import { TemplateVariable } from './entities/template-variable.entity';
import { ImportTemplateDto } from './dto/import-template.dto';
import { GoogleAuthService } from '../google-auth/google-auth.service';

@Injectable()
export class TemplatesService {
    constructor(
        @InjectRepository(Template)
        private readonly templateRepo: Repository<Template>,
        @InjectRepository(TemplateVariable)
        private readonly variableRepo: Repository<TemplateVariable>,
        private readonly googleAuthService: GoogleAuthService,
    ) { }

    // ─── Import ───────────────────────────────────────────────────────────────

    /**
     * Import a Google Doc as a template.
     * Steps:
     *   1. Verify Google is connected
     *   2. Fetch document metadata from Google Docs API to validate the ID
     *   3. Create template record in DB
     *   4. Extract {{variables}} from doc content and save them
     */
    async importTemplate(dto: ImportTemplateDto, userId: string): Promise<Template> {
        // 1. Get authenticated OAuth2 client
        const authClient = await this.googleAuthService.getOAuthClient(userId);

        // 2. Fetch doc from Google Docs API to validate the googleDocId exists
        const docsClient = google.docs({ version: 'v1', auth: authClient });
        const doc = await docsClient.documents.get({ documentId: dto.googleDocId });

        // 3. Create and persist the template
        const template = this.templateRepo.create({
            name: dto.name || doc.data.title || 'Untitled Template',
            googleDocId: dto.googleDocId,
            documentType: dto.documentType,
            userId,
        });
        const saved = await this.templateRepo.save(template);

        // 4. Extract variables from document content
        await this.extractVariables(doc.data, saved.id);

        // Return template with variables loaded
        return this.findOne(saved.id, userId);
    }

    // ─── Extract Variables ────────────────────────────────────────────────────

    /**
     * Parse the Google Doc content for {{placeholder}} patterns and store them.
     * Called internally after importing a template.
     */
    private async extractVariables(
        docContent: any,
        templateId: string,
    ): Promise<void> {
        const fullText = this.extractTextFromDoc(docContent);
        const regex = /\{\{(.*?)\}\}/g;
        const found = new Set<string>();
        let match: RegExpExecArray | null;

        while ((match = regex.exec(fullText)) !== null) {
            found.add(match[1].trim()); // e.g. "client_name"
        }

        if (found.size === 0) return;

        const variables = Array.from(found).map((placeholder) =>
            this.variableRepo.create({
                templateId,
                placeholder,
                systemField: null,
            }),
        );

        await this.variableRepo.save(variables);
    }

    /**
     * Recursively extract all text from a Google Doc JSON structure.
     */
    private extractTextFromDoc(docContent: any): string {
        const body = docContent?.body?.content ?? [];
        const parts: string[] = [];

        for (const element of body) {
            if (element.paragraph) {
                for (const el of element.paragraph.elements ?? []) {
                    if (el.textRun?.content) {
                        parts.push(el.textRun.content);
                    }
                }
            }
            if (element.table) {
                for (const row of element.table.tableRows ?? []) {
                    for (const cell of row.tableCells ?? []) {
                        for (const cellContent of cell.content ?? []) {
                            if (cellContent.paragraph) {
                                for (const el of cellContent.paragraph.elements ?? []) {
                                    if (el.textRun?.content) {
                                        parts.push(el.textRun.content);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        return parts.join('');
    }

    // ─── CRUD ─────────────────────────────────────────────────────────────────

    async findAll(userId: string): Promise<Template[]> {
        return this.templateRepo.find({
            where: { userId },
            relations: ['variables'],
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string, userId: string): Promise<Template> {
        const template = await this.templateRepo.findOne({
            where: { id, userId },
            relations: ['variables'],
        });
        if (!template) throw new NotFoundException(`Template #${id} not found.`);
        return template;
    }

    async remove(id: string, userId: string): Promise<{ message: string }> {
        const template = await this.findOne(id, userId);
        await this.templateRepo.remove(template); // cascade deletes variables
        return { message: `Template #${id} deleted successfully.` };
    }

    // ─── Variable Mapping ─────────────────────────────────────────────────────

    /**
     * Save user-defined mappings: placeholder → system field path.
     * e.g. { "client_name": "client.companyName", "total": "invoice.total" }
     */
    async mapVariables(
        templateId: string,
        mappings: Record<string, string>,
        userId: string,
    ): Promise<Template> {
        const template = await this.findOne(templateId, userId);

        for (const variable of template.variables) {
            if (mappings[variable.placeholder] !== undefined) {
                variable.systemField = mappings[variable.placeholder];
                await this.variableRepo.save(variable);
            }
        }

        return this.findOne(templateId, userId);
    }
}
