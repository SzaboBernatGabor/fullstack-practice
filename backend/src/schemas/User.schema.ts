import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum Permission {
  reader,
  editor,
  admin,
}

@Schema()
export class User {
  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true, minlength: 8 })
  password: string;

  @Prop({ default: true, required: false, unique: false })
  active: boolean;

  @Prop({
    default: Permission.reader,
    enum: Permission,
    unique: false,
    required: false,
  })
  permission: Permission;
}

export const UserSchema = SchemaFactory.createForClass(User);
