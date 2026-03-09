import {
    Injectable,
    NotFoundException,
    ConflictException,
    ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

export interface CustomerQuery {
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
}

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepo: Repository<Customer>,
    ) {}

    async create(dto: CreateCustomerDto, userId: string): Promise<Customer> {
        const existing = await this.customerRepo.findOne({ where: { email: dto.email, userId } });
        if (existing) {
            throw new ConflictException('A customer with this email already exists.');
        }

        const customer = this.customerRepo.create({ ...dto, userId });
        return this.customerRepo.save(customer);
    }

    async findAll(userId: string, query: CustomerQuery) {
        const { search, status, page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;

        const where: any = { userId };
        if (status) where.status = status;
        if (search) {
            // search across multiple fields with OR logic handled below
        }

        const qb = this.customerRepo.createQueryBuilder('c')
            .where('c.user_id = :userId', { userId })
            .orderBy('c.created_at', 'DESC')
            .skip(skip)
            .take(limit);

        if (status) {
            qb.andWhere('c.status = :status', { status });
        }

        if (search) {
            qb.andWhere(
                '(c.company_name ILIKE :search OR c.contact_name ILIKE :search OR c.email ILIKE :search)',
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
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findOne(id: string, userId: string): Promise<Customer> {
        const customer = await this.customerRepo.findOne({ where: { id, userId } });
        if (!customer) {
            throw new NotFoundException(`Customer #${id} not found.`);
        }
        return customer;
    }

    async update(id: string, dto: UpdateCustomerDto, userId: string): Promise<Customer> {
        const customer = await this.findOne(id, userId);

        if (dto.email && dto.email !== customer.email) {
            const conflict = await this.customerRepo.findOne({ where: { email: dto.email, userId } });
            if (conflict) throw new ConflictException('Email already used by another customer.');
        }

        Object.assign(customer, dto);
        return this.customerRepo.save(customer);
    }

    async remove(id: string, userId: string): Promise<{ message: string }> {
        const customer = await this.findOne(id, userId);
        await this.customerRepo.remove(customer);
        return { message: `Customer #${id} deleted successfully.` };
    }
}
