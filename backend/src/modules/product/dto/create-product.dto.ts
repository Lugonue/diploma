import { IsString, IsOptional, IsNumber, IsPositive, IsObject } from 'class-validator';
import { CategoryDto } from './create-category.dto';
import { TypeDto } from './create-type.dto';

export class CreateProductDto {
    @IsString()
    name: string;

    @IsString()
    brand: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsObject()
    category: CategoryDto;

    @IsObject()
    type: TypeDto;

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
    number_of_purchases: number;
}