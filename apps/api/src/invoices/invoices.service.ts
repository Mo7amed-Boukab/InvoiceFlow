import {
    Injectable,
    NotFoundException,
    ConflictException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

export interface InvoiceQuery {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
}

@Injectable()
export class InvoicesService {
    constructor(
        @InjectRepository(Invoice)
        private readonly invoiceRepo: Repository<Invoice>,
    ) { }

    // ──────────────────────────────────────────────────────────────────────
    // CREATE
    // ──────────────────────────────────────────────────────────────────────

    async create(dto: CreateInvoiceDto, userId: string): Promise<Invoice> {
        // Ensure invoice number is unique for this user
        const existing = await this.invoiceRepo.findOne({
            where: { number: dto.number, userId },
        });
        if (existing) {
            throw new ConflictException(
                `An invoice with number "${dto.number}" already exists.`,
            );
        }

        // Validate issueDate <= dueDate
        if (new Date(dto.issueDate) > new Date(dto.dueDate)) {
            throw new BadRequestException('Issue date cannot be after due date.');
        }

        const invoice = this.invoiceRepo.create({
            ...dto,
            templateId: dto.templateId ?? null,
            notes: dto.notes ?? null,
            userId,
        });

        return this.invoiceRepo.save(invoice);
    }

    // ──────────────────────────────────────────────────────────────────────
    // LIST (with pagination + filters)
    // ──────────────────────────────────────────────────────────────────────

    async findAll(userId: string, query: InvoiceQuery) {
        const { page = 1, limit = 10, status, search } = query;
        const skip = (Number(page) - 1) * Number(limit);

        const qb = this.invoiceRepo
            .createQueryBuilder('inv')
            .leftJoinAndSelect('inv.client', 'client')
            .where('inv.user_id = :userId', { userId })
            .orderBy('inv.created_at', 'DESC')
            .skip(skip)
            .take(Number(limit));

        if (status) {
            qb.andWhere('inv.status = :status', { status });
        }

        if (search) {
            qb.andWhere(
                '(inv.number ILIKE :search OR client.company_name ILIKE :search)',
                { search: `%${search}%` },
            );
        }

        const [data, total] = await qb.getManyAndCount();

        return {
            data,
            meta: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / Number(limit)),
            },
        };
    }

    // ──────────────────────────────────────────────────────────────────────
    // FIND ONE
    // ──────────────────────────────────────────────────────────────────────

    async findOne(id: string, userId: string): Promise<Invoice> {
        const invoice = await this.invoiceRepo.findOne({
            where: { id, userId },
            relations: ['client', 'template', 'template.variables'],
        });
        if (!invoice) {
            throw new NotFoundException(`Invoice #${id} not found.`);
        }
        return invoice;
    }

    // ──────────────────────────────────────────────────────────────────────
    // UPDATE
    // ──────────────────────────────────────────────────────────────────────

    async update(id: string, dto: UpdateInvoiceDto, userId: string): Promise<Invoice> {
        const invoice = await this.findOne(id, userId);

        // If changing number, ensure uniqueness
        if (dto.number && dto.number !== invoice.number) {
            const conflict = await this.invoiceRepo.findOne({
                where: { number: dto.number, userId },
            });
            if (conflict) {
                throw new ConflictException(
                    `An invoice with number "${dto.number}" already exists.`,
                );
            }
        }

        // Validate dates if both are present after merge
        const issueDate = dto.issueDate ?? invoice.issueDate;
        const dueDate = dto.dueDate ?? invoice.dueDate;
        if (new Date(issueDate) > new Date(dueDate)) {
            throw new BadRequestException('Issue date cannot be after due date.');
        }

        Object.assign(invoice, dto);
        return this.invoiceRepo.save(invoice);
    }

    // ──────────────────────────────────────────────────────────────────────
    // REMOVE
    // ──────────────────────────────────────────────────────────────────────

    async remove(id: string, userId: string): Promise<{ message: string }> {
        const invoice = await this.findOne(id, userId);
        await this.invoiceRepo.remove(invoice);
        return { message: `Invoice #${id} deleted successfully.` };
    }
}
