import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/User.schema';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec() as any;
  }

  async create(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new this.userModel({
      email: user.email,
      password: hashedPassword,
      active: user.active,
      permission: user.permission,
    });
    return newUser.save();
  }

  async listUsers() {
    return await this.userModel.find();
  }

  async deleteUser(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }
}
