import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { Template } from '../../templates/entities/template.entity';

export enum InvoiceStatus {
    DRAFT = 'draft',
    SENT = 'sent',
    PAID = 'paid',
    OVERDUE = 'overdue',
    CANCELLED = 'cancelled',
}

@Entity('invoices')
export class Invoice {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /** Unique invoice number per user — e.g. "INV-2024-001" */
    @Column({ type: 'varchar', length: 50, name: 'number' })
    number: string;

    // ── Status ─────────────────────────────────────────────────────────────
    @Column({
        type: 'enum',
        enum: InvoiceStatus,
        default: InvoiceStatus.DRAFT,
    })
    status: InvoiceStatus;

    // ── Dates ──────────────────────────────────────────────────────────────
    @Column({ type: 'date', name: 'issue_date' })
    issueDate: string;

    @Column({ type: 'date', name: 'due_date' })
    dueDate: string;

    // ── Financial ──────────────────────────────────────────────────────────
    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    total: number;

    // ── Notes (optional) ───────────────────────────────────────────────────
    @Column({ type: 'text', nullable: true })
    notes: string | null;

    // ── Google Docs generation (filled after generation pipeline) ──────────
    @Column({ type: 'varchar', length: 255, name: 'google_doc_generated_id', nullable: true })
    googleDocGeneratedId: string | null;

    @Column({ type: 'text', name: 'pdf_url', nullable: true })
    pdfUrl: string | null;

    // ── Foreign keys ───────────────────────────────────────────────────────
    @Column({ name: 'client_id' })
    clientId: string;

    @ManyToOne(() => Customer, { onDelete: 'RESTRICT', eager: false })
    @JoinColumn({ name: 'client_id' })
    client: Customer;

    @Column({ name: 'template_id', nullable: true })
    templateId: string | null;

    @ManyToOne(() => Template, { onDelete: 'SET NULL', nullable: true, eager: false })
    @JoinColumn({ name: 'template_id' })
    template: Template | null;

    @Column({ name: 'user_id' })
    userId: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE', eager: false })
    @JoinColumn({ name: 'user_id' })
    user: User;

    // ── Timestamps ─────────────────────────────────────────────────────────
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
