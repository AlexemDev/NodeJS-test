import { UserRoles } from './user-roles-enum';
import {
  IsEmail,
  IsDate,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
const date: string = Date.now().toString();

export class UserDto {
  // @ApiProperty({ example: '1', description: 'id' })
  // @ApiPropertyOptional({ type: String })
  // @IsString()
  // id?: string;

  @ApiProperty({ example: 'Alex', description: 'fullname' })
  @ApiPropertyOptional({ type: String })
  @IsNotEmpty()
  @IsString()
  fullName?: string;

  @ApiProperty({ example: 'ADMIN', description: 'role' })
  @ApiPropertyOptional({ type: String })
  @IsNotEmpty()
  @IsString()
  role?: UserRoles;

  @ApiProperty({ example: 'test@gmail.com', description: 'email' })
  @ApiPropertyOptional({ type: String })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email?: string;

  @ApiProperty({ example: date, description: 'date' })
  @ApiPropertyOptional({ type: String, format: 'date-time' })
  @IsString()
  @IsDate()
  createdAt?: string = date;
}