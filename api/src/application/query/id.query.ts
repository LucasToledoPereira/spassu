import { ApiProperty } from '@nestjs/swagger';

export class IdQuery {
  @ApiProperty({
    example: 6,
    required: true,
  })
  id: number;
}
