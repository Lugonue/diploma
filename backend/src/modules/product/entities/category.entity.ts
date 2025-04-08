import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from './product.entity'

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}

