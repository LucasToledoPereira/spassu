import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class SubjectCreateCommand {
  @ApiProperty()
  @MaxLength(20, {
    message: (args) =>
      `The field ${args.property} must have max lenght of 20 letters`,
  })
  @MinLength(3, {
    message: (args) =>
      `The field ${args.property} must have min lenght of 3 letters`,
  })
  description: string;
}
