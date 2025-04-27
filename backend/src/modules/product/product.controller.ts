import { Body, Controller, Get, Post, Patch, Delete, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto'; 
import { FilterDto } from './dto/filter.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  findAllProducts() {
    return this.productService.findAllProducts()
  }

  @Get('filter')
  filter(@Query() filterDto: FilterDto) {
    return this.productService.filter(filterDto);
  }

  @Get('categories')
  findAllCategories() {
    return this.productService.findAllCategories();
  }

  @Get('categories/:id')
  findOneCategory(@Param('id') id: string) {
    return this.productService.findOneCategory(+id);
  }

  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    return this.productService.findOneProduct(+id);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(+id, updateProductDto);
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    return this.productService.removeProduct(+id);
  }
}
