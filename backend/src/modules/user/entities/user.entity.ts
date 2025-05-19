import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Address } from './address.entity';
import { Phone } from './phone.entity';
import { Order } from 'src/modules/order/entities/order.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'middle_name', nullable: true })
  middleName?: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'date', name: 'date_of_birth' })
  dateOfBirth: Date;

  @Column()
  password: string;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl?: string;

  @Column({ default: 'user' })
  role?: string;

  @OneToMany(() => Address, (address) => address.user, { cascade: true })
  addresses: Address[];

  @OneToMany(() => Phone, (phone) => phone.user, { cascade: true })
  phones: Phone[];

  @OneToMany(() => Order, (order) => order.user, { cascade: true })
  orders: Order[];
}
