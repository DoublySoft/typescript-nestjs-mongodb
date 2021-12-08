import { IsString, IsNotEmpty, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString({ message: 'product.name.is_string' })
  @IsNotEmpty({ message: 'product.name.is_not_empty' })
  readonly name: string;

  @IsUrl({}, { message: 'product.image.is_url' })
  @IsNotEmpty({ message: 'product.image.is_not_empty' })
  readonly image: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
