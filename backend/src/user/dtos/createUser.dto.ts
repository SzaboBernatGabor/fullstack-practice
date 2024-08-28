import {
  IsString,
  IsNotEmpty,
  MinLength,
  Contains,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { Permission } from 'src/schemas/User.schema';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Contains('@')
  @Contains('.')
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsBoolean()
  active: boolean = false;

  @IsEnum(Permission)
  permission: Permission = Permission.reader;
}
