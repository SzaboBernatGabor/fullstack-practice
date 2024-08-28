import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Patch,
  UsePipes,
  ValidationPipe,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import mongoose from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Get()
  async getAll() {
    return await this.usersService.listUsers();
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return await this.usersService.deleteUser(userId);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateCatById(
    @Param('id') catId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(catId);
    if (!isValid) throw new HttpException('Cat not found', 404);
    console.log(`Cat updated by id: ${catId}`);
    return await this.usersService.updateUser(catId, updateUserDto);
  }
}
