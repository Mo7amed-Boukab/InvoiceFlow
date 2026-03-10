import {
  Controller,
  Get,
  Query,
  Res,
  UseGuards,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import type { Response } from 'express';

import { ConfigService } from '@nestjs/config';

@Controller('auth/google')
export class GoogleAuthController {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * GET /api/auth/google
   * Generate the OAuth URL and redirect the client to it.
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  startOAuth(@CurrentUser() user: User, @Res() res: Response): void {
    const url = this.googleAuthService.getAuthUrl(user.id);
    res.json({ url });
  }

  /**
   * GET /api/auth/google/callback
   * Google redirects here after successful consent. The state param contains the userId.
   */
  @Get('callback')
  async oauthCallback(
    @Query('code') code: string,
    @Query('state') userId: string,
    @Res() res: Response,
  ): Promise<void> {
    if (!code || !userId) {
      res.status(400).send('Missing code or state parameter.');
      return;
    }

    try {
      await this.googleAuthService.handleCallback(code, userId);
      const frontendUrl = this.configService.get<string>(
        'FRONTEND_URL',
        'http://localhost:3001',
      );
      res.redirect(
        `${frontendUrl}/dashboard/settings?google_connected=success`,
      );
      return;
    } catch (error) {
      console.error('Failed to handle Google callback:', error);
      const frontendUrl = this.configService.get<string>(
        'FRONTEND_URL',
        'http://localhost:3001',
      );
      res.redirect(`${frontendUrl}/dashboard/settings?google_connected=error`);
      return;
    }
  }

  /**
   * GET /api/auth/google/status
   * Check if the authenticated user has connected their Google account.
   */
  @Get('status')
  @UseGuards(JwtAuthGuard)
  async getStatus(@CurrentUser() user: User) {
    return this.googleAuthService.getConnectionStatus(user.id);
  }

  /**
   * POST /api/auth/google/disconnect
   * Clear the Google tokens for the authenticated user.
   */
  @Post('disconnect')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async disconnect(@CurrentUser() user: User) {
    await this.googleAuthService.disconnect(user.id);
    return { message: 'Disconnected from Google successfully.' };
  }
}
