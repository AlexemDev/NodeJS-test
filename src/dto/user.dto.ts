import { UserRoles } from '../enum/userRolesEnum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
const date: string = Date.now().toString();

export class UserDto {
  @ApiPropertyOptional({ type: String })
  id?: string;

  @ApiPropertyOptional({ type: String })
  fullName?: string;

  @ApiPropertyOptional({ type: String })
  role?: UserRoles;

  @ApiPropertyOptional({ type: String })
  email?: string;

  @ApiPropertyOptional({ type: String, format: 'date-time' })
  createdAt?: string = date;
}