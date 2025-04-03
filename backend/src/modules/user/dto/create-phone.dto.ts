import { IsString } from 'class-validator';

export class PhoneDto {
    @IsString()
    number: string;
}