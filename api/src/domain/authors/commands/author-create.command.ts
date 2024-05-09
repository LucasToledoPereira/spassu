import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class AuthorCreateCommand {
  @ApiProperty()
  @MaxLength(40, {
    message: (args) =>
      `The field ${args.property} must have max lenght of 40 letters`,
  })
  @MinLength(3, {
    message: (args) =>
      `The field ${args.property} must have min lenght of 3 letters`,
  })
  name: string;
}
