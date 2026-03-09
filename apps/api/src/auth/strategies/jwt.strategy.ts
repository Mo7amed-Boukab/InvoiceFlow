import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';

export interface JwtPayload {
    sub: string;   // User UUID
    email: string;
    role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        config: ConfigService,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {
        super({
            // Extract Bearer token from Authorization header
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // Reject expired tokens automatically
            ignoreExpiration: false,
            secretOrKey: config.get<string>('JWT_SECRET') as string,
        });
    }

    /**
     * Called automatically by Passport after token signature is verified.
     * The return value is attached to `request.user` in every guarded route.
     */
    async validate(payload: JwtPayload): Promise<User> {
        const user = await this.userRepo.findOne({ where: { id: payload.sub } });

        if (!user || !user.isActive) {
            throw new UnauthorizedException('Token invalid or account inactive.');
        }

        return user;  // attached to req.user
    }
}
