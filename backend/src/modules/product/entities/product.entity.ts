import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Category } from "./category.entity";
import { ProductType } from './type.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToOne(() => ProductType, (type) => type.products)
  type: ProductType;

  @Column({ nullable: true })
  color: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { nullable: true })
  imageBase64: string;

  @Column({ default: 0})
  number_of_purchases: number;
}
