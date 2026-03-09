import {
    Injectable,
    ConflictException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    // ─── Register ────────────────────────────────────────────────────────────────
    async register(dto: RegisterDto) {
        const existing = await this.userRepo.findOne({ where: { email: dto.email } });
        if (existing) {
            throw new ConflictException('Email is already in use.');
        }

        const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);

        const user = this.userRepo.create({
            companyName: dto.companyName,
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            passwordHash,
        });
        await this.userRepo.save(user);

        return this.buildFullTokenResponse(user);
    }

    // ─── Login ───────────────────────────────────────────────────────────────────
    async login(dto: LoginDto) {
        const user = await this.userRepo.findOne({ where: { email: dto.email } });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials.');
        }

        const passwordMatch = await bcrypt.compare(dto.password, user.passwordHash);
        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials.');
        }

        if (!user.isActive) {
            throw new UnauthorizedException('Account is inactive.');
        }

        return this.buildFullTokenResponse(user);
    }

    // ─── Refresh Token ───────────────────────────────────────────────────────────
    async refresh(userId: string, rawRefreshToken: string) {
        const user = await this.userRepo.findOne({ where: { id: userId } });

        if (!user || !user.refreshTokenHash) {
            throw new UnauthorizedException('Access denied.');
        }

        // Compare the incoming raw token with the stored hash
        const matches = await bcrypt.compare(rawRefreshToken, user.refreshTokenHash);
        if (!matches) {
            throw new UnauthorizedException('Refresh token invalid or expired.');
        }

        if (!user.isActive) {
            throw new UnauthorizedException('Account is inactive.');
        }

        return this.buildFullTokenResponse(user);
    }

    // ─── Logout — invalidate refresh token ───────────────────────────────────────
    async logout(userId: string): Promise<void> {
        await this.userRepo.update(userId, { refreshTokenHash: null });
    }

    // ─── Private helpers ─────────────────────────────────────────────────────────

    private buildAccessToken(user: User): string {
        const payload = { sub: user.id, email: user.email, role: user.role };
        return this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: '15m',  // Short-lived access token
        });
    }

    private buildRefreshToken(user: User): string {
        const expiresIn = this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d') as `${number}${'s' | 'm' | 'h' | 'd' | 'w' | 'y'}`;
        return this.jwtService.sign(
            { sub: user.id },
            {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET') as string,
                expiresIn,
            },
        );
    }

    private async buildFullTokenResponse(user: User) {
        const accessToken = this.buildAccessToken(user);
        const refreshToken = this.buildRefreshToken(user);

        // Store hashed refresh token in DB (rotation: each login replaces the old one)
        const refreshTokenHash = await bcrypt.hash(refreshToken, SALT_ROUNDS);
        await this.userRepo.update(user.id, { refreshTokenHash });

        return {
            accessToken,       // Short-lived (15min) — used for API calls
            refreshToken,      // Long-lived (7d) — used only to get a new accessToken
            user: {
                id: user.id,
                companyName: user.companyName,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            },
        };
    }
}
