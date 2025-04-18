import { IsEnum, IsOptional, ValidateNested} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from '../entities/order.entity';
import { OrderItemDto } from './create-orderItem.dto';

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  user_id?: number;

  @IsOptional()
  address_id?: number;

  @IsOptional()
  phone_id?: number;

  @IsOptional()
  @Type(() => OrderItemDto)
  @ValidateNested({ each: true })
  items?: OrderItemDto[];
}