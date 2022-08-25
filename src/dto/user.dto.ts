import { UserRoles } from '../enum/userRolesEnum';
import {
  IsEmail,
  IsDate,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
const date: string = Date.now().toString();

export class UserDto {
  @ApiPropertyOptional({ type: String })
  @IsString()
  id?: string;

  @ApiPropertyOptional({ type: String })
  @IsNotEmpty()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({ type: String })
  @IsNotEmpty()
  @IsString()
  role?: UserRoles;

  @ApiPropertyOptional({ type: String })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ type: String, format: 'date-time' })
  @IsString()
  @IsDate()
  createdAt?: string = date;
}