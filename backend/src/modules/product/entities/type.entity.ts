import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from './product.entity'

@Entity('type')
export class ProductType {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.type)
  products: Product[];
}
