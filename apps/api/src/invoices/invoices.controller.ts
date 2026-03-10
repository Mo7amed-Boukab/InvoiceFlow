import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    Query,
    UseGuards,
    ParseUUIDPipe,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('invoices')
export class InvoicesController {
    constructor(private readonly invoicesService: InvoicesService) { }

    /**
     * POST /invoices
     * Create a new invoice for the authenticated user.
     */
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateInvoiceDto, @CurrentUser() user: User) {
        return this.invoicesService.create(dto, user.id);
    }

    /**
     * GET /invoices
     * List invoices with optional pagination & filters.
     * ?page=1&limit=10&status=draft&search=INV-2024
     */
    @Get()
    findAll(@Query() query: Record<string, string>, @CurrentUser() user: User) {
        return this.invoicesService.findAll(user.id, query);
    }

    /**
     * GET /invoices/:id
     * Get a single invoice with client and template relations.
     */
    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
        return this.invoicesService.findOne(id, user.id);
    }

    /**
     * PATCH /invoices/:id
     * Partially update an invoice.
     */
    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateInvoiceDto,
        @CurrentUser() user: User,
    ) {
        return this.invoicesService.update(id, dto, user.id);
    }

    /**
     * DELETE /invoices/:id
     * Delete an invoice.
     */
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    remove(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
        return this.invoicesService.remove(id, user.id);
    }
}
