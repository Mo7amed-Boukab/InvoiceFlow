import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from './src/users/entities/user.entity';

// Load .env
config();

const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: configService.get<string>('DB_HOST', 'localhost'),
    port: configService.get<number>('DB_PORT', 5432),
    username: configService.get<string>('DB_USERNAME', 'postgres'),
    password: configService.get<string>('DB_PASSWORD', '123'),
    database: configService.get<string>('DB_NAME', 'invoiceflow'),

    // Entities to include in migrations
    entities: [User],

    // Where generated migration files will be saved
    migrations: ['src/database/migrations/*.ts'],

    // NEVER enable this in the DataSource used for migrations
    synchronize: false,
});
