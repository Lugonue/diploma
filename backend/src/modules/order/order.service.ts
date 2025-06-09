import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderStatus } from './entities/order.entity';
import { Address } from '../user/entities/address.entity';
import { Phone } from '../user/entities/phone.entity';
import { User } from '../user/entities/user.entity';
import { Product } from '../product/entities/product.entity';
import { OrderItem } from './entities/orderItem.entity';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private dataSource: DataSource) {}

  async create(createOrderDto: CreateOrderDto) {
    const address = await this.dataSource.getRepository(Address).findOneBy({ id: createOrderDto.address_id });
    const phone = await this.dataSource.getRepository(Phone).findOneBy({ id: createOrderDto.phone_id });
    const user = await this.dataSource.getRepository(User).findOneBy({ id: createOrderDto.user_id});

    if (!user || !address || !phone) {
      throw new NotFoundException('User, Address, or Phone not found');
    }

    const products = await Promise.all(createOrderDto.items.map(item => {
      return this.dataSource.getRepository(Product).findOneBy({ id: item.product_id });
    }));

    const orderItems = products.map((product, index) => {
      if (!product) {
        throw new NotFoundException(`Product with id ${createOrderDto.items[index].product_id} not found`);
      }
      const quantity = createOrderDto.items[index].quantity;
      return this.dataSource.getRepository(OrderItem).create({ product, quantity });
    });

    const order = this.dataSource.getRepository(Order).create({ user, address, phone, items: orderItems });
    return await this.dataSource.getRepository(Order).save(order);
  }

  async findAll() {
    return await this.dataSource.getRepository(Order).find({ relations: ['user', 'phone', 'address', 'items', 'items.product'] });
  }

  async findOne(id: number) {
    return await this.dataSource.getRepository(Order).findOne({ where: { id }, relations: ['user', 'phone', 'address', 'items', 'items.product'] });
  }

  async findOrdersUsers(id: number) {
    return await this.dataSource.getRepository(Order).find({ where: { user: { id }}, relations: ['phone', 'address', 'items', 'items.product'] });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.dataSource.getRepository(Order).findOne({ where: { id }, relations: ['items', 'items.product']});
    
    if (!order) {
        throw new NotFoundException('Order not found');
    }

    const wasCompleted = order.status === OrderStatus.COMPLETED;
    const willBeCompleted = updateOrderDto.status === OrderStatus.COMPLETED;

    if (updateOrderDto.status) {
      order.status = updateOrderDto.status;
    }

    if (updateOrderDto.user_id) {
      const user = await this.dataSource.getRepository(User).findOne({ where: { id: updateOrderDto.user_id }});
      if (user) {
          order.user = user;
      }
    }

    if (updateOrderDto.address_id) {
      const address = await this.dataSource.getRepository(Address).findOne({ where: { id: updateOrderDto.address_id }})
      if (address) {
        order.address = address;
      }
    }

    if (updateOrderDto.phone_id) {
      const phone = await this.dataSource.getRepository(Phone).findOne({ where: { id: updateOrderDto.phone_id }})
      if (phone) {
        order.phone = phone;
      }
    }

    if (updateOrderDto.items) {
      await Promise.all(updateOrderDto.items.map(async itemDto => {
        console.log('Order items:', order.items);
        const existingItem = order.items.find(item => item.product.id === itemDto.product_id);
        const product = await this.dataSource.getRepository(Product).findOne({ where: { id: itemDto.product_id }});

        if (!product) {
          throw new NotFoundException('Product not found');
        }

        if (existingItem) {
          if (existingItem.quantity === 0) {
            order.items = order.items.filter(item => item.product.id !== itemDto.product_id);
          } else {
            existingItem.quantity = itemDto.quantity;
          }
        } else {
          const newOrderItem = new OrderItem();
          newOrderItem.product = product;
          newOrderItem.quantity = itemDto.quantity;
          order.items.push(newOrderItem);
        }
      }));
    }

    await this.dataSource.getRepository(Order).save(order);

    if (!wasCompleted && willBeCompleted) {
      await this.updateNumberOfPurchases(order);
    }
    
    return await this.findOne(id);
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return this.dataSource.getRepository(Order).remove(order);
  }

  async updateNumberOfPurchases(order: Order) {
    const productIds = order.items.map((item) => item.product.id);
    const products = await this.dataSource.getRepository(Product).find({
      where: { id: In(productIds) },
    });

    for (const item of order.items) {
      const product = products.find((p) => p.id === item.product.id);
      if (product) {
        product.number_of_purchases += item.quantity;
      }
    }

    await this.dataSource.getRepository(Product).save(products);
  }
}
