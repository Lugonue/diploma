// address.entity.ts  
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()  
export class Address {  
  @PrimaryGeneratedColumn()  
  id: number;  

  @Column()  
  street: string;  

  @Column()  
  house: string;  

  @Column({ nullable: true })  
  building?: string;  

  @Column({ nullable: true })
  apartment?: string;

  @Column({ nullable: true })
  entrance?: string;

  @Column({ nullable: true })
  floor?: string;

  @ManyToOne(() => User, (user) => user.addresses)  
  user: User;
}  