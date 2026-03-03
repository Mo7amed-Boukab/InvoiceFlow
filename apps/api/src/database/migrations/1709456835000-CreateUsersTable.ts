import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateUsersTable1709456835000 implements MigrationInterface {
    name = 'CreateUsersTable1709456835000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create the user_role enum type first
        await queryRunner.query(`
      CREATE TYPE "public"."users_role_enum" AS ENUM ('admin', 'user')
    `);

        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'company_name',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'first_name',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'last_name',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '255',
                        isUnique: true,
                    },
                    {
                        name: 'password_hash',
                        type: 'varchar',
                    },
                    {
                        name: 'role',
                        type: 'enum',
                        enum: ['admin', 'user'],
                        default: `'admin'`,
                    },
                    {
                        name: 'is_active',
                        type: 'boolean',
                        default: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                ],
            }),
            true, // ifNotExists
        );

        // Index on email for fast lookups during login
        await queryRunner.createIndex(
            'users',
            new TableIndex({
                name: 'IDX_users_email',
                columnNames: ['email'],
            }),
        );

        // Enable uuid-ossp extension (needed for uuid_generate_v4)
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('users', 'IDX_users_email');
        await queryRunner.dropTable('users');
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }
}
