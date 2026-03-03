import {
    Body, Controller, Get, HttpCode, HttpStatus,
    Post, UseGuards, UseInterceptors, ClassSerializerInterceptor,
} from '@nestjs/common';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor) // Applies @Exclude() from entities globally
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    /**
     * POST /api/auth/register
     * Rate limited: 5 requests per 60s per IP
     */
    @Throttle({ default: { limit: 5, ttl: 60000 } })
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    /**
     * POST /api/auth/login
     * Rate limited: 5 requests per 60s per IP (brute-force protection)
     */
    @Throttle({ default: { limit: 5, ttl: 60000 } })
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    /**
     * POST /api/auth/refresh
     * Body: { userId, refreshToken }
     * Returns new accessToken + refreshToken pair (rotation).
     */
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refresh(@Body() dto: RefreshTokenDto) {
        return this.authService.refresh(dto.userId, dto.refreshToken);
    }

    /**
     * POST /api/auth/logout
     * Invalidates the refresh token stored in DB.
     * Requires: Authorization: Bearer <accessToken>
     */
    @Post('logout')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    logout(@CurrentUser() user: User) {
        return this.authService.logout(user.id);
    }

    /**
     * GET /api/auth/me
     * Returns the currently authenticated user profile.
     */
    @Get('me')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    getMe(@CurrentUser() user: User) {
        return {
            id: user.id,
            companyName: user.companyName,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
            createdAt: user.createdAt,
        };
    }
}
