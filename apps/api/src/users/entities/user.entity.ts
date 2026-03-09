import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

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

    // @Exclude() ensures passwordHash is NEVER serialized in JSON responses
    @Exclude()
    @Column({ name: 'password_hash' })
    passwordHash: string;

    // @Exclude() ensures refreshTokenHash is NEVER serialized in JSON responses  
    @Exclude()
    @Column({ type: 'varchar', name: 'refresh_token_hash', nullable: true, default: null })
    refreshTokenHash: string | null;

    @Exclude()
    @Column({ type: 'text', name: 'google_access_token', nullable: true, default: null })
    googleAccessToken: string | null;

    @Exclude()
    @Column({ type: 'text', name: 'google_refresh_token', nullable: true, default: null })
    googleRefreshToken: string | null;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
