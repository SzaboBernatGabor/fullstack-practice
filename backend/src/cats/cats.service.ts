import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from 'src/schemas/Cat.schema';
import { Model } from 'mongoose';
import { CreateCatDto } from './dtos/createCat.dto';
import { UpdateCatDto } from './dtos/updateCat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async createCat(createCatDto: CreateCatDto) {
    const newCat = new this.catModel(createCatDto);
    console.log();
    return await newCat.save();
  }

  async deleteCat(id: string) {
    return await this.catModel.findByIdAndDelete(id);
  }

  async listCats() {
    return await this.catModel.find();
  }

  async getCatById(id: string) {
    return await this.catModel.findById(id);
  }

  async updateCat(id: string, updateCatDto: UpdateCatDto) {
    return await this.catModel.findByIdAndUpdate(id, updateCatDto, {
      new: true,
    });
  }
}
