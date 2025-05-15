import { Body, Controller, Get, Post, Patch, Delete, Param, Query, UseGuards, UploadedFile } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto'; 
import { FilterDto } from './dto/filter.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UploadImage } from 'src/common/decorators/upload-image.decorator';
import { ProductSchema } from 'src/common/schemes/product.schema';

@Controller('products')
@UseGuards(JwtAuthGuard, RoleGuard)
@ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  
  @Post()
  @Roles('admin')
  @UploadImage()
  @ApiConsumes('multipart/form-data')
  @ApiBody(ProductSchema)
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.productService.createProduct(createProductDto, file);
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

  @Post('categories')
  @Roles('admin')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.productService.createCategory(createCategoryDto);
  }

  @Get('categories/:id')
  @Roles('user', 'admin')
  findOneCategory(@Param('id') id: string) {
    return this.productService.findOneCategory(+id);
  }

  @Delete('categories/:id')
  @Roles('admin')
  removeCategory(@Param('id') id: string) {
    return this.productService.removeCategory(+id);
  }

  @Get(':id')
  @Roles('user', 'admin')
  findOneProduct(@Param('id') id: string) {
    return this.productService.findOneProduct(+id);
  }

  @Patch(':id')
  @Roles('admin')
  @UploadImage()
  @ApiConsumes('multipart/form-data')
  @ApiBody(ProductSchema)
  updateProduct(
    @Param('id') id: string, 
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file?: Express.Multer.File,
) {
    return this.productService.updateProduct(+id, updateProductDto, file);
  }

  @Delete(':id')
  @Roles('admin')
  removeProduct(@Param('id') id: string) {
    return this.productService.removeProduct(+id);
  }
}
