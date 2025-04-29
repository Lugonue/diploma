import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { User } from './entities/user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard, RoleGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles('user', 'admin')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.userService.findAll();
  }

  @Get('profile')
  @Roles('user', 'admin')
  getProfile(@Req() req: { user : User }) {
    const user = req.user;
    return this.userService.getPublicUser(user.id);
  }

  @Patch('profile')
  @Roles('user', 'admin')
  async updateProfile(@Req() req: { user: User }, @Body() updateUserDto: UpdateUserDto) {
    const user = req.user;
    await this.userService.update(user.id, updateUserDto);
    return this.userService.getPublicUser(user.id);
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
