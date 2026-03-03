import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';

/**
 * CurrentUser decorator
 *
 * Usage: @CurrentUser() user: User
 * Extracts the authenticated user from req.user (set by JwtAuthGuard).
 *
 * Example:
 *   @Get('me')
 *   @UseGuards(JwtAuthGuard)
 *   getMe(@CurrentUser() user: User) {
 *     return user;
 *   }
 */
export const CurrentUser = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext): User => {
        const request = ctx.switchToHttp().getRequest();
        return request.user as User;
    },
);
