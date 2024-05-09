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
import { Observable } from 'rxjs';

import { BooksService } from './books.service';
import { Book } from './models/books.model';
import { BookCreateCommand } from './commands/book-create.command';
import { IdQuery } from '../../application/query/id.query';
import { BookUpdateCommand } from './commands/book-update.command';

@Controller('books')
@ApiTags('books')
export class BooksController {
  constructor(private readonly service: BooksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a book' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  public createAuthor(@Body() command: BookCreateCommand): Observable<Book> {
    return this.service.createBook(command);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List and search books' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  search() {
    return this.service.searchBooks();
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Update an author' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  public updateAuthor(
    @Param() { id }: IdQuery,
    @Body() command: BookUpdateCommand,
  ): Observable<Book> {
    return this.service.updateBook(id, command);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an unused author' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  public deleteAuthor(@Param() { id }: IdQuery): Observable<Book> {
    return this.service.deleteBook(id);
  }
}
