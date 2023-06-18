import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import { User } from '@common/auth/auth.interface';

@Injectable()
export class AuthService {
  async validateUser(user: User) {
    let users: any = await fs.readFile('../server/data/user.json');
    users = JSON.parse(users.toString());

    const findUser = users.find((item: User) => item.email === user.email && item.password === user.password);
    return findUser;
  }
}
