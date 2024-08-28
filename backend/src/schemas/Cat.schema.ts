import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ autoIndex: true })
export class Cat {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  breed: string;

  @Prop({ required: false, min: 1, max: 35 })
  age: number;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
