import { IsNumber, IsOptional, IsString, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterDto {
  @IsOptional()
  @IsNumber()
  categoryId?: number;
  
  @IsOptional()
  @IsNumber()
  typeId?: number;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  limit?: number = 20;
}
