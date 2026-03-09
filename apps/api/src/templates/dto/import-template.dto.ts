import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { DocumentType } from '../entities/template.entity';

export class ImportTemplateDto {
    /** The Google Doc file ID from the URL */
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    googleDocId: string;

    /** Human-readable name (can be auto-filled from Doc title) */
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @IsEnum(DocumentType)
    documentType: DocumentType;
}
