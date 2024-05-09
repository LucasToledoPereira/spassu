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

import { AuthorsService } from './authors.service';
import { AuthorCreateCommand } from './commands/author-create.command';
import { Author } from './models/author.model';
import { AuthorUpdateCommand } from './commands/author-update.command';
import { IdQuery } from '../../application/query/id.query';

@Controller('authors')
@ApiTags('authors')
export class AuthorsController {
  constructor(private readonly service: AuthorsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create an author' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  public createAuthor(
    @Body() command: AuthorCreateCommand,
  ): Observable<Author> {
    return this.service.createAuthor(command);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List and search authors' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  search() {
    return this.service.searchAuthors();
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Update an author' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  public updateAuthor(
    @Param() { id }: IdQuery,
    @Body() command: AuthorUpdateCommand,
  ): Observable<Author> {
    return this.service.updateAuthor(id, command);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an unused author' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  public deleteAuthor(@Param() { id }: IdQuery): Observable<Author> {
    return this.service.deleteAuthor(id);
  }
}
