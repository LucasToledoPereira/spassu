import { HttpStatus } from '@nestjs/common';
import { AuthorError, ErrorCode } from '../enums/error-codes';
import { ApiProperty } from '@nestjs/swagger';

export class HttpError {
  @ApiProperty({
    example: 400,
  })
  statusCode: HttpStatus;

  @ApiProperty({
    enumName: 'ErrorCode',
    example: AuthorError.NOT_FOUND,
  })
  code: ErrorCode;

  @ApiProperty({
    example: '2024-05-10T12:57:59.129Z',
  })
  timestamp: string;

  @ApiProperty({
    example: '/api/authors/6',
  })
  path: string;
}
