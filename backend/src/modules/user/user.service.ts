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

  async create(createUserDto: CreateUserDto, file?: Express.Multer.File) {
    if (file) {
      createUserDto.avatarUrl = `/uploads/${file.filename}`;
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.dataSource.getRepository(User).create({
        ...createUserDto,
        password: hashedPassword,
        role: 'user',
    });
    return await this.dataSource.getRepository(User).save(user);
  }

  async findAll() {
    return await this.dataSource.getRepository(User).find({ relations: ['addresses', 'phones', 'orders'] }
    );
  }

  async findOne(id: number) {
    return await this.dataSource.getRepository(User).findOne({ where: { id }, relations: ['addresses', 'phones', 'orders'] });
  }

  async update(id: number, updateUserDto: UpdateUserDto, file?: Express.Multer.File) {
    const user = await this.dataSource.getRepository(User).findOne({ where: { id }, relations: ['addresses', 'phones']});
   
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if ('role' in updateUserDto) {
      delete updateUserDto.role;
    }
    
    const { password, addresses, phones, removeAddressIds, removePhoneIds, ...rest } = updateUserDto;
    Object.assign(user, rest);

    if (file) {
      user.avatarUrl = `/uploads/${file.filename}`;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    if (addresses) {
      const adressIds = user.addresses.map(address => address.id)
      if (adressIds.length > 0) {
        await this.dataSource.getRepository(Address).delete(adressIds);
      }

      const newAddresses = addresses.map((addressData): Address => {
        const address = new Address();
        return Object.assign(address, addressData);
      })
      user.addresses = newAddresses;
    }

    if (phones) {
      const phoneIds = user.phones.map(phone => phone.id) 
      if (phoneIds.length > 0) {
        await this.dataSource.getRepository(Phone).delete(phoneIds);
      }
      
      const newPhones = phones.map((phoneData): Phone => {
        const phone = new Phone;
        return Object.assign(phone, phoneData);
      })
      user.phones = newPhones;
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
