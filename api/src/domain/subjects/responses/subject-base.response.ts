import { ApiProperty } from '@nestjs/swagger';
import { Subject } from '../models/subject.model';

export class SubjectBaseResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(subject: Subject) {
    this.id = subject.id;
    this.description = subject.description;
    this.createdAt = subject.createdAt;
    this.updatedAt = subject.updatedAt;
  }
}
