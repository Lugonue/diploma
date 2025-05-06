import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Category } from './entities/category.entity';
import { ProductType } from './entities/type.entity'
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterDto } from './dto/filter.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class ProductService {
  constructor(private dataSource: DataSource) {}

  async createProduct(createProductDto: CreateProductDto) {
    const category = await this.dataSource.getRepository(Category).findOne({ where: { id: createProductDto.category_id } });
    const productType = await this.dataSource.getRepository(ProductType).findOne({ where: { id: createProductDto.type_id } });

    if (!category || !productType) {
      throw new NotFoundException('Category or ProductType not found');
    }

    const product = this.dataSource.getRepository(Product).create({
      ...createProductDto,
      category,
      type: productType,
    });

    return this.dataSource.getRepository(Product).save(product);
  }

  async findAllProducts() {
    return await this.dataSource.getRepository(Product).find({ relations: ['category', 'type'] }
    );
  }

  async findOneProduct(id: number) {
    const product = await this.dataSource.getRepository(Product).findOne({ where: { id }, relations: ['category', 'type'] });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    return product;
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    await this.dataSource.getRepository(Product).update(id, updateProductDto);
    return this.findOneProduct(id);
  }

  async removeProduct(id: number) {
    const product = await this.findOneProduct(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return this.dataSource.getRepository(Product).remove(product);
  }

  async filter(filterDto: FilterDto) {
    const query = this.dataSource.getRepository(Product).createQueryBuilder('product');
    const { categoryId, typeId, brand,  minPrice, maxPrice } = filterDto;
    
    if (categoryId) {
      query.andWhere('product.category_id = :categoryId', { categoryId });
    }

    if (brand) {
      query.andWhere('product.brand = :brand', { brand });
    }

    if (typeId) {
      query.andWhere('product.type_id = :typeId', { typeId });
    }

    if (minPrice) {
      query.andWhere('product.price >= :minPrice', { minPrice });
    }

    if (maxPrice) {
      query.andWhere('product.price <= :maxPrice', { maxPrice });
    }
    
    const products = await query.getMany();
    return products;
  }

  async findAllCategories() {
    return await this.dataSource.getRepository(Category).find();
  }

  async findOneCategory(id: number) {
    return await this.dataSource.getRepository(Category).findOne({ where: { id }, relations: ['products'] });
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const category = this.dataSource.getRepository(Category).create(createCategoryDto);
    return this.dataSource.getRepository(Category).save(category);
  }

  async removeCategory(id: number) {
    const category = await this.findOneCategory(id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return this.dataSource.getRepository(Category).remove(category);
  }
}
