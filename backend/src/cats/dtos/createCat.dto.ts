import { IsString, IsNotEmpty, IsNumber, IsOptional, Min, Max } from 'class-validator'

export class CreateCatDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    breed: string;

    @IsNumber()
    @IsOptional()
    @Max(35)
    @Min(1)
    age: number;
}