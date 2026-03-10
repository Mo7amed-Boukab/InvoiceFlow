import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceDto } from './create-invoice.dto';

/**
 * All fields are optional — allows partial updates (PATCH).
 * Inherits all validators from CreateInvoiceDto via PartialType.
 */
export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) { }
