import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginRequest } from './request/login.request';
import { LoginResponse } from './response/login.response';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(
    request: LoginRequest
  ): Promise<LoginResponse> {
    const user = await this.userService.findOne(request.email);
    if (!user) {
      throw new HttpException('User Not Found', 404);
    }
    const matchPassword = bcrypt.compare(request.password, user?.password);
    if (!matchPassword) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}