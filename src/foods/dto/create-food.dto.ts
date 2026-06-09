import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFoodDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  price!: number;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsUrl()
  imageUrl!: string;

  @IsNotEmpty()
  @IsString()
  category!: string;
}
