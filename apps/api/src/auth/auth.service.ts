import {
    Injectable,
    ConflictException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
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
    ) { }

    // ─── Register ────────────────────────────────────────────────────────────────
    async register(dto: RegisterDto) {
        // Check if email already taken
        const existing = await this.userRepo.findOne({
            where: { email: dto.email },
        });
        if (existing) {
            throw new ConflictException('Email is already in use.');
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);

        // Create & persist user
        const user = this.userRepo.create({
            companyName: dto.companyName,
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            passwordHash,
        });
        await this.userRepo.save(user);

        // Return access token immediately (auto-login after register)
        return this.buildTokenResponse(user);
    }

    // ─── Login ────────────────────────────────────────────────────────────────────
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

        return this.buildTokenResponse(user);
    }

    // ─── Private helpers ─────────────────────────────────────────────────────────
    private buildTokenResponse(user: User) {
        const payload = { sub: user.id, email: user.email, role: user.role };
        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken,
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
