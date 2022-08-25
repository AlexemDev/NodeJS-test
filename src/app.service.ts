import { Injectable } from '@nestjs/common';
import * as usersList from './users.json';
const fs = require('fs');
import { v4 as uuid } from 'uuid';
const pdf = require('pdf-creator-node');
import { NotFoundException } from '@nestjs/common';
import { IUser } from './interfaces/user';

const options = {
  format: "A3",
  orientation: "portrait",
  border: "10mm",
  footer: {
    height: "28mm",
    contents: {
      first: 'Cover page',
      2: 'Second page', // Any page number is working. 1-based index
      default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
      last: 'Last Page'
    }
  }
};

@Injectable()
export class AppService {
  private users = usersList

  getHello(): string {
    return 'Hello World!';
  }

  getUsers() {
    return this.users;
  }

  getUser(userId) {
    const currentUser: IUser = this.users.find(user => user.userId === userId);

    if (!currentUser) {
      throw new NotFoundException('User not found.');
    }

    return currentUser;
  }

  userUpdate(userId, userBody) {

    this.users.find(user => {
      if (user.userId === userId) {
        user.fullName = userBody.fullName;
        user.role = userBody.role;
        user.email = userBody.email;
      }
    });

    try {
      fs.promises.writeFile('./src/users.json', JSON.stringify(this.users));
      console.log('User has been updated')
    } catch (err) {
      console.log(err)
    }

    return userBody;
  }

  createUser(userBody) {

    userBody.userId = uuid();
    this.users.push(userBody);

    try {
      fs.promises.writeFile('./src/users.json', JSON.stringify(this.users));
      console.log('User has been updated')
    } catch (err) {
      console.log(err)
    }

    return userBody;
  }

  getUserPDF(userId) {
    const html = fs.readFileSync("./src/userTemplatePDF.html", "utf8");

    const currentUser: IUser = this.users.find(user => user.userId === userId);

    const document = {
      html: html,
      data: {
        user: currentUser,
      },
      path: "./UserPDF.pdf",
      type: "",
    };

    pdf
      .create(document, options)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getUserListPDF() {
    const html = fs.readFileSync("./src/userListTemplatePDF.html", "utf8");

    const document = {
      html: html,
      data: {
        users: this.users,
      },
      path: "./UserListPDF.pdf",
      type: "",
    };

    pdf
      .create(document, options)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
