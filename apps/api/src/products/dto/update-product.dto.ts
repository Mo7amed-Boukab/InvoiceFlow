import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';
import { ProductType, TaxRule } from '../entities/product.entity';

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    @MaxLength(255)
    name?: string;

    @IsString()
    @IsOptional()
    @MaxLength(100)
    sku?: string;

    @IsEnum(ProductType)
    @IsOptional()
    type?: ProductType;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    @IsOptional()
    unitPrice?: number;

    @IsEnum(TaxRule)
    @IsOptional()
    taxRule?: TaxRule;

    @IsString()
    @IsOptional()
    description?: string;

    @IsOptional()
    isActive?: boolean;
}

