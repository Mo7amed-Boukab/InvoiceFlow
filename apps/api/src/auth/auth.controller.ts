import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    /**
     * POST /api/auth/register
     * Create a new user account and return a JWT access token.
     */
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    /**
     * POST /api/auth/login
     * Authenticate an existing user and return a JWT access token.
     */
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }
}
