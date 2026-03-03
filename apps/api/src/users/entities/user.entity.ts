import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'company_name', length: 255 })
    companyName: string;

    @Column({ name: 'first_name', length: 255 })
    firstName: string;
    @Column({ name: 'last_name', length: 255 })
    lastName: string;

    @Column({ unique: true, length: 255 })
    email: string;

    @Column({ name: 'password_hash' })
    passwordHash: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.ADMIN,
    })
    role: UserRole;

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
