import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { OrderItem } from './orderItem.entity';
import { Address } from 'src/modules/user/entities/address.entity';
import { Phone } from 'src/modules/user/entities/phone.entity';

export enum OrderStatus {
  NEW = 'Новый',
  PROCESSING = 'В обработке',
  CANCELED = 'Отменен',
  COMPLETED = 'Завершен',
  SENT = 'Отправлен',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Address, { nullable: false })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @ManyToOne(() => Phone, { nullable: false })
  @JoinColumn({ name: 'phone_id' })
  phone: Phone;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.NEW })
  status: OrderStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;
}