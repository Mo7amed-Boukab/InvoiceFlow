import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';
import { CustomerStatus } from '../entities/customer.entity';

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    companyName: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    contactName?: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsOptional()
    @MaxLength(50)
    phone?: string;

    @IsString()
    @IsOptional()
    @MaxLength(100)
    industry?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsEnum(CustomerStatus)
    @IsOptional()
    status?: CustomerStatus;
}
