import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  active?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(2)
  permission?: number;
}
