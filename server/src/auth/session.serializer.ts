import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@common/auth/auth.interface';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor() {
    super();
  }

  serializeUser(user: User, done) {
    done(null, user);
  }

  deserializeUser(user: User, done) {
    done(null, user);
  }
}
