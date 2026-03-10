import {
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    IsUUID,
    MaxLength,
    Min,
} from 'class-validator';
import { InvoiceStatus } from '../entities/invoice.entity';

export class CreateInvoiceDto {
    /** Unique invoice number, e.g. "INV-2024-001" */
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    number: string;

    /** Invoice status (draft by default) */
    @IsEnum(InvoiceStatus)
    @IsOptional()
    status?: InvoiceStatus;

    /** ISO date string, e.g. "2024-03-15" */
    @IsDateString()
    issueDate: string;

    /** ISO date string, e.g. "2024-04-15" */
    @IsDateString()
    dueDate: string;

    /** Total amount (must be >= 0) */
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    total: number;

    /** Optional notes / payment terms */
    @IsString()
    @IsOptional()
    notes?: string;

    /** UUID of the Customer (client) */
    @IsUUID()
    clientId: string;

    /** UUID of the Template to use for generation (optional) */
    @IsUUID()
    @IsOptional()
    templateId?: string;
}
