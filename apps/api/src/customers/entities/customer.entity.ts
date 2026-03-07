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

export enum CustomerStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

@Entity('customers')
export class Customer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'company_name', length: 255 })
    companyName: string;

    @Column({ name: 'contact_name', length: 255, nullable: true })
    contactName: string | null;

    @Column({ unique: true, length: 255 })
    email: string;

    @Column({ length: 50, nullable: true })
    phone: string | null;

    @Column({ length: 100, nullable: true })
    industry: string | null;

    @Column({ type: 'text', nullable: true })
    address: string | null;

    @Column({
        type: 'enum',
        enum: CustomerStatus,
        default: CustomerStatus.ACTIVE,
    })
    status: CustomerStatus;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0, name: 'total_spent' })
    totalSpent: number;

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
