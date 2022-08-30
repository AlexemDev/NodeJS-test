import { Injectable } from '@nestjs/common';
const fs = require('fs');
import { UserRepository } from './user.repository';
import { v4 as uuid } from 'uuid';
const pdf = require('pdf-creator-node');
import { NotFoundException } from '@nestjs/common';
import { IUser } from './types/user.interface';
var stream = require('stream');

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
export class UserService {


  constructor(
    private readonly userRepository: UserRepository
  ) {}


  getUsers() {
    return this.userRepository.getAllUsers();
  }

  getUser(userId) {
    const currentUser: IUser = this.userRepository.getUserById(userId)

    if (!currentUser) {
      throw new NotFoundException('User not found.');
    }

    return currentUser;
  }

  userUpdate(userId, userBody) {
    const users = this.userRepository.getAllUsers();

    users.find(user => {
      if (user.userId === userId) {
        user.fullName = userBody.fullName;
        user.role = userBody.role;
        user.email = userBody.email;
      }
    });

    try {
      const users = this.userRepository.getAllUsers();
      fs.promises.writeFile('./src/users.json', JSON.stringify(users));
      console.log('User has been updated')
    } catch (err) {
      console.log(err)
    }

    return userBody;
  }

  createUser(userBody) {
    const users = this.userRepository.getAllUsers();
    userBody.userId = uuid();
    users.push(userBody);

    try {
      fs.promises.writeFile('./src/users.json', JSON.stringify(users));
      console.log('User has been updated');
    } catch (err) {
      console.log(err);
    }

    return userBody;
  }

  generatePDF(name, document, res) {
    pdf.create(document, options)
      .then((response) => {
        var fileContents = Buffer.from(response, "base64");

        var readStream = new stream.PassThrough();
        readStream.end(fileContents);

        res.set('Content-disposition', `attachment; filename=${name}`);
        res.set('Content-Type', 'image/pdf');

        readStream.pipe(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getUserPDF(userId, res) {
    const html = fs.readFileSync("./src/userTemplatePDF.html", "utf8");

    const currentUser: IUser = this.userRepository.getUserById(userId);

    const document = {
      html: html,
      data: {
        user: currentUser,
      },
      type: "buffer",
    };

    this.generatePDF('UserPDF.pdf', document, res);
  }



  getUserListPDF(res) {
    const html = fs.readFileSync("./src/userListTemplatePDF.html", "utf8");

    const users = this.userRepository.getAllUsers();
    const document = {
      html: html,
      data: {
        users: users,
      },
      type: "buffer",
    };

    this.generatePDF('UserListPDF.pdf', document, res);
  }
}
