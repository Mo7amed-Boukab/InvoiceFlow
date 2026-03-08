import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { google } from 'googleapis';
import { User } from '../users/entities/user.entity';

@Injectable()
export class GoogleAuthService {
    private readonly oauth2Client;

    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {
        this.oauth2Client = new google.auth.OAuth2(
            this.configService.get<string>('GOOGLE_CLIENT_ID'),
            this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
            this.configService.get<string>('GOOGLE_REDIRECT_URI')
        );
    }

    /**
     * Generate the Google consent screen URL for the given user.
     * We pass the userId in the `state` parameter to map the callback back to the user.
     */
    getAuthUrl(userId: string): string {
        const scopes = [
            'https://www.googleapis.com/auth/documents',
            'https://www.googleapis.com/auth/drive.file',
            'https://www.googleapis.com/auth/drive.readonly',
        ];

        return this.oauth2Client.generateAuthUrl({
            access_type: 'offline', // Required to get a refresh token
            prompt: 'consent', // Force consent to guarantee we get a refresh token
            scope: scopes,
            state: userId,
        });
    }

    /**
     * Handle the OAuth callback, exchange the authorization code for tokens,
     * and store them securely against the user.
     */
    async handleCallback(code: string, userId: string): Promise<void> {
        const { tokens } = await this.oauth2Client.getToken(code);
        
        const updateData: Partial<User> = {
            googleAccessToken: tokens.access_token || undefined,
        };

        if (tokens.refresh_token) {
            updateData.googleRefreshToken = tokens.refresh_token;
        }

        await this.userRepo.update(userId, updateData);
    }
}
