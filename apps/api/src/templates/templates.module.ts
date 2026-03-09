import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from './entities/template.entity';
import { TemplateVariable } from './entities/template-variable.entity';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { GoogleAuthModule } from '../google-auth/google-auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Template, TemplateVariable]),
        GoogleAuthModule,
    ],
    controllers: [TemplatesController],
    providers: [TemplatesService],
    exports: [TemplatesService],
})
export class TemplatesModule {}
