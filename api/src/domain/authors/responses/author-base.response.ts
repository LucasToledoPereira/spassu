import { ApiProperty } from '@nestjs/swagger';
import { Author } from '../models/author.model';

export class AuthorBaseResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(author: Author) {
    this.id = author.id;
    this.name = author.name;
    this.createdAt = author.createdAt;
    this.updatedAt = author.updatedAt;
  }
}
