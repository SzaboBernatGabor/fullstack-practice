import {
  Body,
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  Delete,
  Param,
  HttpException,
  Patch,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dtos/createCat.dto';
import mongoose from 'mongoose';
import { UpdateCatDto } from './dtos/updateCat.dto';
import { Validate } from 'class-validator';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  createCat(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto);
    return this.catsService.createCat(createCatDto);
  }

  @Get()
  listCats() {
    console.log('Listed all cats');
    return this.catsService.listCats();
  }

  @Delete(':id')
  async deleteCat(@Param('id') catId: string) {
    const isValid = mongoose.Types.ObjectId.isValid(catId);
    const findCatById = await this.catsService.getCatById(catId);
    if (!isValid || !findCatById) {
      throw new HttpException('CatId not found', 404);
    } else {
      console.log(`Cat deleted by id: ${catId}`);
    }
    return await this.catsService.deleteCat(catId);
  }

  @Get(':id')
  async findCatById(@Param('id') catId: string) {
    const isValid = mongoose.Types.ObjectId.isValid(catId);
    if (!isValid) throw new HttpException('Cat not found', 404);
    const findCatById = await this.catsService.getCatById(catId);
    if (!findCatById) throw new HttpException('Cat not found', 404);
    console.log(`Found cat by id: ${catId}: ${findCatById}`);
    return findCatById;
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateCatById(
    @Param('id') catId: string,
    @Body() updateCatDto: UpdateCatDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(catId);
    if (!isValid) throw new HttpException('Cat not found', 404);
    console.log(`Cat updated by id: ${catId}`);
    return await this.catsService.updateCat(catId, updateCatDto);
  }
}
