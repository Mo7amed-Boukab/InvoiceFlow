import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleAuthService } from './google-auth.service';
import { User } from '../users/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [GoogleAuthController],
    providers: [GoogleAuthService],
    exports: [GoogleAuthService],
})
export class GoogleAuthModule {}
