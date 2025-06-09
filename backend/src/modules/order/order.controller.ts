import { Controller, Body, Post, Get, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { User } from '../user/entities/user.entity';

@Controller('orders')
@UseGuards(JwtAuthGuard, RoleGuard)
@ApiBearerAuth()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Roles('user', 'admin')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.orderService.findAll();
  }

  @Get('my')
  @Roles('admin', 'user')
  getMyOrders(@Req() req: { user : User }) {
    const user = req.user;
    return this.orderService.findOrdersUsers(user.id);
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto)
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
