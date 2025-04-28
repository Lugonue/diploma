import { IsNumber, IsOptional, IsString } from 'class-validator';

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
}
