import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JwtAuthGuard
 *
 * Usage: Add @UseGuards(JwtAuthGuard) to any controller or route handler
 * that requires the user to be authenticated.
 *
 * It will:
 * 1. Extract the Bearer token from the Authorization header
 * 2. Verify the JWT signature and expiry
 * 3. Validate the user still exists and is active in DB (via JwtStrategy)
 * 4. Attach the User object to req.user
 *
 * If any step fails → 401 Unauthorized is returned automatically.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }
