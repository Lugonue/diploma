import { IsString, IsEmail, IsOptional, IsDateString, ArrayMinSize } from 'class-validator';
import { AddressDto } from './create-adress.dto';
import { PhoneDto } from './create-phone.dto';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsEmail()
  email: string;

  @IsDateString()
  dateOfBirth: Date;

  @IsString()
  password: string; 

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  role: string;

  @ArrayMinSize(1)
  addresses?: AddressDto[];

  @ArrayMinSize(1)
  phones?: PhoneDto[];
}

