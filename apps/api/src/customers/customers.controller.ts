import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    Query,
    UseGuards,
    ParseUUIDPipe,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}

    /**
     * POST /customers
     * Create a new customer for the authenticated user.
     */
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateCustomerDto, @CurrentUser() user: User) {
        return this.customersService.create(dto, user.id);
    }

    /**
     * GET /customers
     * List all customers with optional pagination & filters.
     * ?page=1&limit=10&search=acme&status=active
     */
    @Get()
    findAll(@Query() query: Record<string, string>, @CurrentUser() user: User) {
        return this.customersService.findAll(user.id, query);
    }

    /**
     * GET /customers/:id
     * Get a single customer.
     */
    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
        return this.customersService.findOne(id, user.id);
    }

    /**
     * PATCH /customers/:id
     * Update a customer (partial update).
     */
    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateCustomerDto,
        @CurrentUser() user: User,
    ) {
        return this.customersService.update(id, dto, user.id);
    }

    /**
     * DELETE /customers/:id
     * Delete a customer.
     */
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    remove(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
        return this.customersService.remove(id, user.id);
    }
}
