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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    /**
     * POST /products
     * Create a new product or service.
     */
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateProductDto, @CurrentUser() user: User) {
        return this.productsService.create(dto, user.id);
    }

    /**
     * GET /products
     * List all products with optional filters.
     * ?page=1&limit=10&search=workstation&type=product&isActive=true
     */
    @Get()
    findAll(@Query() query: Record<string, string>, @CurrentUser() user: User) {
        return this.productsService.findAll(user.id, query as any);
    }

    /**
     * GET /products/:id
     * Get a single product.
     */
    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
        return this.productsService.findOne(id, user.id);
    }

    /**
     * PATCH /products/:id
     * Partial update of a product.
     */
    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateProductDto,
        @CurrentUser() user: User,
    ) {
        return this.productsService.update(id, dto, user.id);
    }

    /**
     * PATCH /products/:id/toggle-active
     * Toggle the isActive status of a product (used by the UI switch).
     */
    @Patch(':id/toggle-active')
    toggleActive(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
        return this.productsService.toggleActive(id, user.id);
    }

    /**
     * DELETE /products/:id
     * Delete a product.
     */
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    remove(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
        return this.productsService.remove(id, user.id);
    }
}
