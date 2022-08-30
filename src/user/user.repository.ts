import { Injectable } from "@nestjs/common";
import * as usersList from '../users.json';
import { IUser } from './types/user.interface';

@Injectable()
export class UserRepository {

  private users = usersList;

  getAllUsers() {
    return this.users;
  }

  getUserById(userId) {
    const currentUser: IUser = this.users.find(user => user.userId === userId);
    return currentUser;
  }

}