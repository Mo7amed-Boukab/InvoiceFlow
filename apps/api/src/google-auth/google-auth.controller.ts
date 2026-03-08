import { Controller, Get, Query, Req, Res, UseGuards, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

import { ConfigService } from '@nestjs/config';

@Controller('auth/google')
export class GoogleAuthController {
    constructor(
        private readonly googleAuthService: GoogleAuthService,
        private readonly configService: ConfigService
    ) {}

    /**
     * GET /api/auth/google
     * Generate the OAuth URL and redirect the client to it.
     */
    @Get()
    @UseGuards(JwtAuthGuard)
    startOAuth(@CurrentUser() user: User, @Res() res: any) {
        const url = this.googleAuthService.getAuthUrl(user.id);
        return res.json({ url });
    }

    /**
     * GET /api/auth/google/callback
     * Google redirects here after successful consent. The state param contains the userId.
     */
    @Get('callback')
    async oauthCallback(
        @Query('code') code: string,
        @Query('state') userId: string,
        @Res() res: any
    ) {
        if (!code || !userId) {
            return res.status(400).send('Missing code or state parameter.');
        }

        try {
            await this.googleAuthService.handleCallback(code, userId);
            const frontendUrl = this.configService.get<string>('FRONTEND_URL', 'http://localhost:3001');
            return res.redirect(`${frontendUrl}/dashboard/settings?google_connected=success`);
        } catch (error) {
            console.error('Failed to handle Google callback:', error);
            const frontendUrl = this.configService.get<string>('FRONTEND_URL', 'http://localhost:3001');
            return res.redirect(`${frontendUrl}/dashboard/settings?google_connected=error`);
        }
    }
}
