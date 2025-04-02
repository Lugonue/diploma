import { IsString, IsOptional } from 'class-validator';

export class AddressDto {
  @IsString()
  street: string;

  @IsString()
  house: string;

  @IsOptional()
  @IsString()
  building?: string;

  @IsOptional()
  @IsString()
  apartment?: string;

  @IsOptional()
  @IsString()
  entrance?: string;

  @IsOptional()
  @IsString()
  floor?: string;
}