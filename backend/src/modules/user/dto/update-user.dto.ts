import { IsOptional, IsString, IsEmail, IsDateString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PhoneDto } from './create-phone.dto';
import { AddressDto } from './create-adress.dto';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;
  
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  addresses?: AddressDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PhoneDto)
  phones?: PhoneDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  removeAddressIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  removePhoneIds?: string[];
}
