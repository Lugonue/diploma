import { IsString, IsOptional, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  brand: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  category_id: number;

  @IsNotEmpty()
  type_id: number;

  @IsString()
  color: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image_url?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  number_of_purchases: number = 0;
}