import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { Address } from './entities/address.entity';
import { Phone } from './entities/phone.entity';

@Injectable()
export class UserService {
  constructor(private dataSource: DataSource) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.dataSource.getRepository(User).create({
        ...createUserDto,
        password: hashedPassword,
    });
    return await this.dataSource.getRepository(User).save(user);
  }

  async findAll() {
    return await this.dataSource.getRepository(User).find({ relations: ['addresses', 'phones'] }
    );
  }

  async findOne(id: number) {
    return await this.dataSource.getRepository(User).findOne({ where: { id }, relations: ['addresses', 'phones', 'orders'] });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.dataSource.getRepository(User).findOne({ where: { id }, relations: ['addresses', 'phones']});
   
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, addresses, phones, removeAddressIds, removePhoneIds, ...rest } = updateUserDto;
    Object.assign(user, rest);

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    if (addresses) {
      const newAddresses = addresses.map((addressData): Address => {
        const address = new Address();
        return Object.assign(address, addressData);
      })
      user.addresses = user.addresses.concat(newAddresses)
    }

    if (phones) {
      const newPhones = phones.map((phoneData): Phone => {
        const phone = new Phone;
        return Object.assign(phone, phoneData);
      })
      user.phones = user.phones.concat(newPhones);
    }

    if (removeAddressIds) {
      await Promise.all(removeAddressIds.map(addressId => {
        return this.dataSource.getRepository(Address).delete(addressId);
     }))
      user.addresses = user.addresses.filter(address => !removeAddressIds.includes(address.id.toString())); 
    }

    if (removePhoneIds) {
      await Promise.all(removePhoneIds.map(phoneId => {
         return this.dataSource.getRepository(Phone).delete(phoneId);
      }))
      user.phones = user.phones.filter(phone => !removePhoneIds.includes(phone.id?.toString()));
    }

    await this.dataSource.getRepository(User).save(user);
    return await this.getPublicUser(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return await this.dataSource.getRepository(User).remove(user);
  }

  async getPublicUser(id: number) {
    const user = await this.dataSource.getRepository(User).findOne({ where: { id }, relations: ['addresses', 'phones', 'orders'] });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const publicUser = Object.fromEntries(
      Object.entries(user).filter(([key]) => key !== 'password')
    );
    return publicUser;
  }
}
