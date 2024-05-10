import { ApiProperty } from '@nestjs/swagger';
import { Currency } from '../../../application/enums/currencies';
import { AuthorReadResponse } from '../../authors/responses/author-read.response';
import { SubjectReadResponse } from '../../subjects/responses/subject-read.response';
import { Book } from '../models/books.model';

export class BookBaseResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  publisher: string;

  @ApiProperty()
  edition: number;

  @ApiProperty()
  year: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  currency: Currency;

  @ApiProperty({ type: [SubjectReadResponse] })
  subjects: SubjectReadResponse[];

  @ApiProperty({ type: [AuthorReadResponse] })
  authors: AuthorReadResponse[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(book: Book) {
    this.id = book.id;
    this.title = book.title;
    this.publisher = book.publisher;
    this.edition = book.edition;
    this.year = book.year;
    this.value = book.value;
    this.currency = book.currency;
    this.createdAt = book.createdAt;
    this.updatedAt = book.updatedAt;
    this.authors = (book.authors || []).map(
      (author) => new AuthorReadResponse(author),
    );
    this.subjects = (book.subjects || []).map(
      (subject) => new SubjectReadResponse(subject),
    );
  }
}
