import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class OrderItemDto {
  @IsNotEmpty()
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number;
}