import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.dataSource.getRepository(User).findOne({ where: { email: createUserDto.email } });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.dataSource.getRepository(User).create({ ...createUserDto, password: hashedPassword });
    await this.dataSource.getRepository(User).save(newUser);

    return { message: 'User registered successfully' };
  }

  async login(loginUserDto: { email: string; password: string }) {
    const user = await this.dataSource.getRepository(User).findOne({ where: { email: loginUserDto.email } });

    if (!user || !(await bcrypt.compare(loginUserDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, id: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
