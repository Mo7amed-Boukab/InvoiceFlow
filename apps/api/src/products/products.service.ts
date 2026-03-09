import {
    Injectable,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

export interface ProductQuery {
    search?: string;
    type?: string;
    isActive?: boolean;
    page?: number;
    limit?: number;
}

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
    ) {}

    async create(dto: CreateProductDto, userId: string): Promise<Product> {
        if (dto.sku) {
            const existing = await this.productRepo.findOne({ where: { sku: dto.sku, userId } });
            if (existing) throw new ConflictException('A product with this SKU already exists.');
        }

        const product = this.productRepo.create({ ...dto, userId });
        return this.productRepo.save(product);
    }

    async findAll(userId: string, query: ProductQuery) {
        const { search, type, isActive, page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;

        const qb = this.productRepo.createQueryBuilder('p')
            .where('p.user_id = :userId', { userId })
            .orderBy('p.created_at', 'DESC')
            .skip(skip)
            .take(limit);

        if (type) {
            qb.andWhere('p.type = :type', { type });
        }

        if (isActive !== undefined) {
            qb.andWhere('p.is_active = :isActive', { isActive });
        }

        if (search) {
            qb.andWhere(
                '(p.name ILIKE :search OR p.sku ILIKE :search OR p.description ILIKE :search)',
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

    async findOne(id: string, userId: string): Promise<Product> {
        const product = await this.productRepo.findOne({ where: { id, userId } });
        if (!product) throw new NotFoundException(`Product #${id} not found.`);
        return product;
    }

    async update(id: string, dto: UpdateProductDto, userId: string): Promise<Product> {
        const product = await this.findOne(id, userId);

        if (dto.sku && dto.sku !== product.sku) {
            const conflict = await this.productRepo.findOne({ where: { sku: dto.sku, userId } });
            if (conflict) throw new ConflictException('SKU already used by another product.');
        }

        Object.assign(product, dto);
        return this.productRepo.save(product);
    }

    async remove(id: string, userId: string): Promise<{ message: string }> {
        const product = await this.findOne(id, userId);
        await this.productRepo.remove(product);
        return { message: `Product #${id} deleted successfully.` };
    }

    async toggleActive(id: string, userId: string): Promise<Product> {
        const product = await this.findOne(id, userId);
        product.isActive = !product.isActive;
        return this.productRepo.save(product);
    }
}
