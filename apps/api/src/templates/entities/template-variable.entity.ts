import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Template } from './template.entity';

@Entity('template_variables')
export class TemplateVariable {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'template_id' })
    templateId: string;

    @ManyToOne(() => Template, (t) => t.variables, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'template_id' })
    template: Template;

    /** Raw placeholder detected in the doc e.g. {{client_name}} */
    @Column({ length: 255 })
    placeholder: string;

    /**
     * The mapped system field path e.g. "client.name" or "invoice.total"
     * Null until the user performs the mapping step.
     */
    @Column({ length: 255, name: 'system_field', nullable: true, default: null })
    systemField: string | null;
}
