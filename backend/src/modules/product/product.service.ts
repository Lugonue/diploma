import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Category } from './entities/category.entity';
import { ProductType } from './entities/type.entity'
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class ProductService {
  constructor(private dataSource: DataSource) {}

  async create(createProductDto: CreateProductDto) {
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

  async findAll() {
    return await this.dataSource.getRepository(Product).find({ relations: ['category', 'type'] }
    );
  }

  async findOne(id: number) {
    const product = await this.dataSource.getRepository(Product).findOne({ where: { id }, relations: ['category', 'type'] });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.dataSource.getRepository(Product).update(id, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
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
}
