import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

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

  async update(id: number, updateUserDto: Partial<CreateUserDto>) {
    await this.dataSource.getRepository(User).update(id, updateUserDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
  }
    return await this.dataSource.getRepository(User).remove(user);
  }
}
