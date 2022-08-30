import { Controller, Get, Post, Res, Put, Param, Body, Patch } from '@nestjs/common';
import { IUser } from './types/user.interface';
import { UserDto } from './types/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';


@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get user by Id' })
  @ApiResponse({ status: 200, type: UserDto })
  @Get(':userId')
  getUser(@Param('userId') userId: string): IUser {
    const currentUser = this.userService.getUser(userId);

    return currentUser;
  }

  @ApiOperation({ summary: 'Get list of users' })
  @ApiResponse({ status: 200, type: [UserDto] })
  @Get('/')
  getUserList() {
    const userList = this.userService.getUsers();

    return userList;
  }

  @ApiOperation({ summary: 'Get PDF user by Id' })
  @Get('/export/:userId/pdf')
  getUserPDF(@Param('userId') userId: string, @Res() res) {
    this.userService.getUserPDF(userId, res);
  }

  @ApiOperation({ summary: 'Get PDF user list' })
  @Get('/export/pdf')
  getUserListPDF(@Res() res) {
    this.userService.getUserListPDF(res);
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 200, type: UserDto })
  @Post('/')
  createUser(@Body() user: UserDto): IUser {
    const updatedUser = this.userService.createUser(user);

    return updatedUser;
  }

  @ApiOperation({ summary: 'Update user by Id' })
  @ApiResponse({ status: 200, type: UserDto })
  @Put(':userId')
  updateUser(@Param('userId') userId: string, @Body() user: UserDto): IUser {
    const updatedUser = this.userService.userUpdate(userId, user);

    return updatedUser;
  }

  @ApiOperation({ summary: 'Update parameter of user by Id' })
  @ApiResponse({ status: 200, type: UserDto })
  @Patch(':userId')
  updatePropertyUser(@Param('userId') userId: string, @Body() user: UserDto): IUser {
    const updatedUser = this.userService.userUpdate(userId, user);

    return updatedUser;
  }

}
