import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable, map } from 'rxjs';

import { BooksService } from './books.service';
import { BookCreateCommand } from './commands/book-create.command';
import { IdQuery } from '../../application/queries/id.query';
import { BookUpdateCommand } from './commands/book-update.command';
import { HttpError } from '../../application/types/http-error.type';
import { BookCreatedResponse } from './responses/book-created.response';
import {
  withBaseResponse,
  withBaseResponseList,
} from '../../application/types/response.type';
import { BookReadResponse } from './responses/book-read.response';
import { BookUpdatedResponse } from './responses/book-updated.response';
import { BookDeletedResponse } from './responses/book-deleted.response';

@Controller('books')
@ApiTags('books')
export class BooksController {
  constructor(private readonly service: BooksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a book' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpError })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: withBaseResponse(BookCreatedResponse),
  })
  public create(
    @Body() command: BookCreateCommand,
  ): Observable<BookCreatedResponse> {
    return this.service
      .createBook(command)
      .pipe(map((book) => new BookCreatedResponse(book)));
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List and search books' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpError })
  @ApiResponse({
    status: HttpStatus.OK,
    type: withBaseResponseList(BookReadResponse),
  })
  search() {
    return this.service
      .searchBooks()
      .pipe(map((books) => books.map((b) => new BookReadResponse(b))));
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Read a book' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpError })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: withBaseResponse(BookReadResponse),
  })
  public read(@Param() { id }: IdQuery): Observable<BookReadResponse> {
    return this.service
      .readBook(id)
      .pipe(map((book) => new BookReadResponse(book)));
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Update an author' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpError })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: withBaseResponse(BookUpdatedResponse),
  })
  public update(
    @Param() { id }: IdQuery,
    @Body() command: BookUpdateCommand,
  ): Observable<BookUpdatedResponse> {
    return this.service
      .updateBook(id, command)
      .pipe(map((book) => new BookUpdatedResponse(book)));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an unused author' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpError })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: withBaseResponse(BookDeletedResponse),
  })
  public delete(@Param() { id }: IdQuery): Observable<BookDeletedResponse> {
    return this.service
      .deleteBook(id)
      .pipe(map((book) => new BookDeletedResponse(book)));
  }
}
