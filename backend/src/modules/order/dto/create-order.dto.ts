import { ArrayMinSize, IsNotEmpty } from "class-validator";
import { OrderItemDto } from "./create-orderItem.dto";

export class CreateOrderDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  address_id: number;

  @IsNotEmpty()
  phone_id: number;

  @ArrayMinSize(1)
  items: OrderItemDto[];
}