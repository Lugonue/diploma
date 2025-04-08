import { Injectable, NotFoundException} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private dataSource: DataSource) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.dataSource.getRepository(Product).create(createProductDto);
    return await this.dataSource.getRepository(Product).save(product);
  }
  async findAll() {
    return await this.dataSource.getRepository(Product).find({ relations: ['category', 'type'] }
    );
  }

    async findOne(id: number) {
      return await this.dataSource.getRepository(Product).findOne({ where: { id }, relations: [ 'category', 'type' ] });
    }
  
    async update(id: number, updateProductDto: Partial<CreateProductDto>) {
      await this.dataSource.getRepository(Product).update(id, updateProductDto);
      return await this.findOne(id);
    }
  
    async remove(id: number) {
      const product = await this.findOne(id);
      if (!product) {
        throw new NotFoundException(`Product with id ${id} not found`);
    }
      return await this.dataSource.getRepository(Product).remove(product);
    }
}