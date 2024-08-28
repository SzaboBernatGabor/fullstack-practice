import { Controller, Post, UseGuards, Req, Res, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Response } from 'express';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(user);

    if (!token) return { message: "Couldn't log in" };
    return { token };
  }

  @Post('logout')
  async logout(@Body() user, @Res({ passthrough: true }) res: Response) {
    const token = this.authService.login(user);

    if (!token) return { message: "Couldn't log out" };

    res.cookie('access_token', '', {
      httpOnly: true,
      secure: true,
      maxAge: 0,
      sameSite: 'strict',
    });
    return { message: 'Logout successful' };
  }
}
