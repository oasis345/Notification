import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LocalGuard } from './local.guard';
import { User } from '@common/auth/auth.interface';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signIn')
  @UseGuards(LocalGuard)
  signIn(@Req() request: Request) {
    return request?.user;
  }

  @Post('/signOut')
  async signOut(@Req() request: Request) {
    request.logout((err) => {
      if (err) console.error(err);
    });
    request.session.destroy((err) => {
      if (err) console.error(err);
    });
  }

  @Get('/user')
  async getUser(@Req() request: Request, @Res() response: Response) {
    const user = request.user as User;
    const session = request.session;

    if ((session as any)?.passport?.user) response.send(user);
    else response.send(null);
  }
}
