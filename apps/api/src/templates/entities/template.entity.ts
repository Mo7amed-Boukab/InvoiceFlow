import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { TemplateVariable } from './template-variable.entity';

export enum DocumentType {
    SALES_INVOICE   = 'sales_invoice',
    PURCHASE_ORDER  = 'purchase_order',
    DELIVERY_NOTE   = 'delivery_note',
    PROFORMA        = 'proforma',
}

@Entity('templates')
export class Template {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255 })
    name: string;

    /** Google Doc file ID  (e.g. "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms") */
    @Column({ length: 255, name: 'google_doc_id' })
    googleDocId: string;

    @Column({
        type: 'enum',
        enum: DocumentType,
        name: 'document_type',
        default: DocumentType.SALES_INVOICE,
    })
    documentType: DocumentType;

    @Column({ name: 'user_id' })
    userId: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE', eager: false })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => TemplateVariable, (v) => v.template, { cascade: true, eager: false })
    variables: TemplateVariable[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
