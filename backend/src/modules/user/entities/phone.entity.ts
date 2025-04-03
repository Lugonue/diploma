import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';  
import { User } from './user.entity';

@Entity()  
export class Phone {  
  @PrimaryGeneratedColumn()  
  id: number;  

  @Column()  
  number: string;

  @ManyToOne(() => User, (user) => user.phones, { onDelete: 'CASCADE' })  
    user: User;
}  