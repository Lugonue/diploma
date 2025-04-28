import { Body, Controller, Get, Post, Patch, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto'; 
import { FilterDto } from './dto/filter.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('products')
@UseGuards(JwtAuthGuard, RoleGuard)
@ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  
  @Post()
  @Roles('admin')
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  @Roles('user', 'admin')
  findAllProducts() {
    return this.productService.findAllProducts()
  }

  @Get('filter')
  @Roles('user', 'admin')
  filter(@Query() filterDto: FilterDto) {
    return this.productService.filter(filterDto);
  }

  @Get('categories')
  @Roles('user', 'admin')
  findAllCategories() {
    return this.productService.findAllCategories();
  }

  @Get('categories/:id')
  @Roles('user', 'admin')
  findOneCategory(@Param('id') id: string) {
    return this.productService.findOneCategory(+id);
  }

  @Get(':id')
  @Roles('user', 'admin')
  findOneProduct(@Param('id') id: string) {
    return this.productService.findOneProduct(+id);
  }

  @Patch(':id')
  @Roles('admin')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(+id, updateProductDto);
  }

  @Delete(':id')
  @Roles('admin')
  removeProduct(@Param('id') id: string) {
    return this.productService.removeProduct(+id);
  }
}
