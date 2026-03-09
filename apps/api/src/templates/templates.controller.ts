import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    UseGuards,
    ParseUUIDPipe,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { ImportTemplateDto } from './dto/import-template.dto';
import { MapVariablesDto } from './dto/map-variables.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('templates')
export class TemplatesController {
    constructor(private readonly templatesService: TemplatesService) { }

    /**
     * POST /templates/import
     * Import a Google Doc as a template and automatically extract variables.
     */
    @Post('import')
    @HttpCode(HttpStatus.CREATED)
    importTemplate(@Body() dto: ImportTemplateDto, @CurrentUser() user: User) {
        return this.templatesService.importTemplate(dto, user.id);
    }

    /**
     * GET /templates
     * List all templates belonging to the authenticated user.
     */
    @Get()
    findAll(@CurrentUser() user: User) {
        return this.templatesService.findAll(user.id);
    }

    /**
     * GET /templates/:id
     * Get a template with its extracted variables.
     */
    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
        return this.templatesService.findOne(id, user.id);
    }

    /**
     * DELETE /templates/:id
     * Delete a template and cascade-delete its variables.
     */
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    remove(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
        return this.templatesService.remove(id, user.id);
    }

    /**
     * POST /templates/:id/variables/mapping
     * Save the placeholder → system field mapping for a template.
     */
    @Post(':id/variables/mapping')
    @HttpCode(HttpStatus.OK)
    mapVariables(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: MapVariablesDto,
        @CurrentUser() user: User,
    ) {
        return this.templatesService.mapVariables(id, dto.mappings, user.id);
    }
}
