import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Category } from './entities/category.entity';
import { ProductType } from './entities/type.entity'
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private dataSource: DataSource) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.dataSource.getRepository(Category).findOne({ where: { id: createProductDto.category } });
    const productType = await this.dataSource.getRepository(ProductType).findOne({ where: { id: createProductDto.type } });

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
}