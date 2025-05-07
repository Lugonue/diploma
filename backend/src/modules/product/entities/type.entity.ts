import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Product } from './product.entity'
import { Category } from "./category.entity";

@Entity('type')
export class ProductType {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;
  
  @ManyToOne(() => Category)
  category: Category;

  @OneToMany(() => Product, (product) => product.type)
  products: Product[];
}
