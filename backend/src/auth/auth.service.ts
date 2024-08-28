import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user) {
    const payload = {
      email: user.email,
      active: (await this.usersService.findOne(user.email))?.active,
      permission: (await this.usersService.findOne(user.email))?.permission,
    };

    const token = this.jwtService.sign(payload);
    console.log('user logged in: ', payload);
    return token;
  }
}
