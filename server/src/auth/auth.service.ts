import { Injectable } from '@nestjs/common';
import { ServerAuthService, User } from '@common/auth/auth.interface';
import { DataService } from 'data/data.service';

@Injectable()
export class AuthService implements ServerAuthService {
  constructor(private dataService: DataService) {}

  async signUp(user: User) {
    const users: User[] = await this.dataService.get({ table: 'user' });

    if (users.find((item) => item.email === user.email)) {
      throw new Error('이미 사용된 이메일입니다!');
    }

    const result = await this.dataService.save({ table: 'user', data: user });
    return result;
  }

  async validateUser(user: User) {
    const users: User[] = await this.dataService.get({ table: 'user' });
    const findUser = users.find((item) => item.email === user.email && item.password === user.password);

    return findUser;
  }
}
