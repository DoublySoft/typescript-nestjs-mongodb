import { PartialType, ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { CreateCategoryDto } from './category.dtos';

export class CreateProductDto {
  @IsString({ message: 'product.name.is_string' })
  @IsNotEmpty({ message: 'product.name.is_not_empty' })
  @ApiProperty({ description: "Product's name" })
  readonly name: string;

  @IsString({ message: 'product.description.is_string' })
  @IsNotEmpty({ message: 'product.description.is_not_empty' })
  @ApiProperty()
  readonly description: string;

  @IsNumber({}, { message: 'product.price.is_number' })
  @IsNotEmpty({ message: 'product.price.is_not_empty' })
  @IsPositive({ message: 'product.price.is_positive' })
  @ApiProperty()
  readonly price: number;

  @IsNumber({}, { message: 'product.stock.is_number' })
  @IsNotEmpty({ message: 'product.stock.is_not_empty' })
  @ApiProperty()
  readonly stock: number;

  @IsUrl({}, { message: 'product.image.is_url' })
  @IsNotEmpty({ message: 'product.image.is_not_empty' })
  @ApiProperty()
  readonly image: string;

  @IsNotEmpty({ message: 'product.category.is_not_empty' })
  @ValidateNested({ message: 'product' })
  @ApiProperty()
  readonly category: CreateCategoryDto;

  @IsNotEmpty({ message: 'product.brand.is_not_empty' })
  @IsMongoId({ message: 'product.brand.invalid_id' })
  @ApiProperty()
  readonly brand: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @ValidateIf((params) => params.maxPrice)
  @Min(0)
  minPrice: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  maxPrice: number;
}
