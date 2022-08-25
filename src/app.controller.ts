import { Controller, Get, Post, Put, Param, Body, Patch } from '@nestjs/common';
import { IUser } from './interfaces/user';
import { UserDto } from './dto/user.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

@Controller('users')
export class UserController {
  constructor(private readonly appService: AppService) {}

  @Get(':userId')
  getUser(@Param('userId') userId: string): IUser {
    const currentUser = this.appService.getUser(userId);

    return currentUser;
  }

  @Get('/')
  getUserList() {
    const userList = this.appService.getUsers();

    return userList;
  }

  @Get('/export/:userId/pdf')
  getUserPDF(@Param('userId') userId: string) {
    const userList = this.appService.getUserPDF(userId);

    return userList;
  }

  @Get('/export//pdf')
  getUserListPDF() {
    this.appService.getUserListPDF();
  }

  @Post('/')
  createUser(@Body() user: UserDto): IUser {
    const updatedUser = this.appService.createUser(user);

    return updatedUser;
  }

  @Put(':userId')
  updateUser(@Param('userId') userId: string, @Body() user: UserDto): IUser {
    const updatedUser = this.appService.userUpdate(userId, user);

    return updatedUser;
  }

  @Patch(':userId')
  updatePropertyUser(@Param('userId') userId: string, @Body() user: UserDto): IUser {
    const updatedUser = this.appService.userUpdate(userId, user);

    return updatedUser;
  }

}
