import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum ProductType {
    PRODUCT = 'product',
    SERVICE = 'service',
}

export enum TaxRule {
    VAT_15 = 'VAT_15',
    GST_10 = 'GST_10',
    NO_TAX = 'NO_TAX',
}

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 100, nullable: true })
    sku: string | null;

    @Column({
        type: 'enum',
        enum: ProductType,
        default: ProductType.PRODUCT,
    })
    type: ProductType;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0, name: 'unit_price' })
    unitPrice: number;

    @Column({
        type: 'enum',
        enum: TaxRule,
        name: 'tax_rule',
        default: TaxRule.NO_TAX,
    })
    taxRule: TaxRule;

    @Column({ type: 'text', nullable: true })
    description: string | null;

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @Column({ name: 'user_id' })
    userId: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE', eager: false })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
