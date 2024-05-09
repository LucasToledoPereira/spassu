import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsNumberString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Currency } from '../../../application/constants/currencies';

export class BookUpdateCommand {
  @ApiProperty({
    required: true,
  })
  @MaxLength(40, {
    message: (args) =>
      `The field ${args.property} must have max lenght of 40 letters`,
  })
  @MinLength(3, {
    message: (args) =>
      `The field ${args.property} must have min lenght of 3 letters`,
  })
  title: string;

  @ApiProperty({
    required: true,
  })
  @MaxLength(40, {
    message: (args) =>
      `The field ${args.property} must have max lenght of 40 letters`,
  })
  @MinLength(3, {
    message: (args) =>
      `The field ${args.property} must have min lenght of 3 letters`,
  })
  publisher: string;

  @ApiProperty({
    required: true,
  })
  @IsInt({
    message: (args) => `The field ${args.property} must be a valid integer`,
  })
  edition: number;

  @ApiProperty({
    required: true,
    example: '2020',
  })
  @IsNumberString(undefined, {
    message: (args) => `The field ${args.property} must be a valid number`,
  })
  year: string;

  @ApiProperty({
    required: false,
  })
  @IsNumber(undefined, {
    message: (args) => `The field ${args.property} must be a valid number`,
  })
  value: number;

  @ApiProperty({
    example: Currency.EUR,
    enum: Currency,
    enumName: 'Currency',
    required: false,
  })
  @IsEnum(Currency, {
    message: (args) => `The field ${args.property} must be a valid currency`,
  })
  currency: Currency;

  @ApiProperty({ required: false })
  @IsInt({ each: true })
  authors: number[];

  @ApiProperty({ required: false })
  @IsInt({ each: true })
  subjects: number[];
}
