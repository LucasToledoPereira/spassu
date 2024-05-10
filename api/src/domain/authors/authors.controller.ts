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

import { AuthorsService } from './authors.service';
import { AuthorCreateCommand } from './commands/author-create.command';
import { AuthorUpdateCommand } from './commands/author-update.command';
import { IdQuery } from '../../application/queries/id.query';
import { HttpError } from '../../application/types/http-error.type';
import {
  withBaseResponse,
  withBaseResponseList,
} from '../../application/types/response.type';
import { AuthorCreatedResponse } from './responses/author-created.response';
import { AuthorReadResponse } from './responses/author-read.response';
import { AuthorUpdatedResponse } from './responses/author-updated.response';
import { AuthorDeletedResponse } from './responses/author-deleted.response';

@Controller('authors')
@ApiTags('authors')
export class AuthorsController {
  constructor(private readonly service: AuthorsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create an author' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpError })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: withBaseResponse(AuthorCreatedResponse),
  })
  public create(
    @Body() command: AuthorCreateCommand,
  ): Observable<AuthorCreatedResponse> {
    return this.service
      .createAuthor(command)
      .pipe(map((author) => new AuthorCreatedResponse(author)));
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List and search authors' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpError })
  @ApiResponse({
    status: HttpStatus.OK,
    type: withBaseResponseList(AuthorReadResponse),
  })
  search(): Observable<AuthorReadResponse[]> {
    return this.service
      .searchAuthors()
      .pipe(map((authors) => authors.map((a) => new AuthorReadResponse(a))));
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Read an author' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpError })
  @ApiResponse({
    status: HttpStatus.OK,
    type: withBaseResponse(AuthorReadResponse),
  })
  public read(@Param() { id }: IdQuery): Observable<AuthorReadResponse> {
    return this.service
      .readAuthor(id)
      .pipe(map((author) => new AuthorReadResponse(author)));
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Update an author' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpError })
  @ApiResponse({
    status: HttpStatus.OK,
    type: withBaseResponse(AuthorUpdatedResponse),
  })
  public update(
    @Param() { id }: IdQuery,
    @Body() command: AuthorUpdateCommand,
  ): Observable<AuthorUpdatedResponse> {
    return this.service
      .updateAuthor(id, command)
      .pipe(map((author) => new AuthorUpdatedResponse(author)));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an unused author' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpError })
  @ApiResponse({
    status: HttpStatus.OK,
    type: withBaseResponse(AuthorDeletedResponse),
  })
  public delete(@Param() { id }: IdQuery): Observable<AuthorDeletedResponse> {
    return this.service
      .deleteAuthor(id)
      .pipe(map((author) => new AuthorDeletedResponse(author)));
  }
}
