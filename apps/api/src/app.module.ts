import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { GoogleAuthModule } from './google-auth/google-auth.module';
import { TemplatesModule } from './templates/templates.module';
import { InvoicesModule } from './invoices/invoices.module';
import { User } from './users/entities/user.entity';
import { Customer } from './customers/entities/customer.entity';
import { Product } from './products/entities/product.entity';
import { Template } from './templates/entities/template.entity';
import { TemplateVariable } from './templates/entities/template-variable.entity';
import { Invoice } from './invoices/entities/invoice.entity';

@Module({
  imports: [
    // ── Environment variables ─────────────────────────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // ── Rate Limiting ────────────────────────────────────────────
    // Global: max 20 requests per 60 seconds per IP by default.
    // Auth endpoints have stricter limits via @Throttle() decorator.
    ThrottlerModule.forRoot([
      {
        name: 'global',
        ttl: 60000,   // 60 seconds window
        limit: 20,    // max 20 requests per window per IP
      },
    ]),

    // ── TypeORM (PostgreSQL) ──────────────────────────────────────────────
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get<string>('DB_USERNAME', 'postgres'),
        password: config.get<string>('DB_PASSWORD', 'postgres'),
        database: config.get<string>('DB_NAME', 'invoiceflow'),
        entities: [User, Customer, Product, Template, TemplateVariable, Invoice],
        synchronize: config.get<string>('NODE_ENV') !== 'production',
        logging: config.get<string>('NODE_ENV') === 'development',
      }),
    }),

    // ── Feature modules ───────────────────────────────────────────────────
    AuthModule,
    CustomersModule,
    ProductsModule,
    GoogleAuthModule,
    TemplatesModule,
    InvoicesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    // Apply ThrottlerGuard globally to ALL routes
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },

    // Apply ClassSerializerInterceptor globally so @Exclude() always works
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule { }
