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

import { SubjectsService } from './subjects.service';
import { IdQuery } from '../../application/queries/id.query';
import { SubjectCreateCommand } from './commands/subject-create.command';
import { SubjectUpdateCommand } from './commands/subject-update.command';
import { HttpError } from '../../application/types/http-error.type';
import {
  withBaseResponse,
  withBaseResponseList,
} from '../../application/types/response.type';
import { SubjectCreatedResponse } from './responses/subject-created.response';
import { SubjectReadResponse } from './responses/subject-read.response';
import { SubjectUpdatedResponse } from './responses/subject-updated.response';
import { SubjectDeletedResponse } from './responses/subject-deleted.response';

@Controller('subjects')
@ApiTags('subjects')
export class SubjectsController {
  constructor(private readonly service: SubjectsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a subject' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpError })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: withBaseResponse(SubjectCreatedResponse),
  })
  public create(
    @Body() command: SubjectCreateCommand,
  ): Observable<SubjectCreatedResponse> {
    return this.service
      .createSubject(command)
      .pipe(map((subject) => new SubjectCreatedResponse(subject)));
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List and search subjects' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpError })
  @ApiResponse({
    status: HttpStatus.OK,
    type: withBaseResponseList(SubjectReadResponse),
  })
  search(): Observable<SubjectReadResponse[]> {
    return this.service
      .searchSubjects()
      .pipe(map((subjects) => subjects.map((s) => new SubjectReadResponse(s))));
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Read an subject' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpError })
  @ApiResponse({
    status: HttpStatus.OK,
    type: withBaseResponse(SubjectReadResponse),
  })
  public read(@Param() { id }: IdQuery): Observable<SubjectReadResponse> {
    return this.service
      .readSubject(id)
      .pipe(map((subject) => new SubjectReadResponse(subject)));
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Update an subject' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpError })
  @ApiResponse({
    status: HttpStatus.OK,
    type: withBaseResponse(SubjectUpdatedResponse),
  })
  public update(
    @Param() { id }: IdQuery,
    @Body() command: SubjectUpdateCommand,
  ): Observable<SubjectUpdatedResponse> {
    return this.service
      .updateSubject(id, command)
      .pipe(map((subject) => new SubjectUpdatedResponse(subject)));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an unused subject' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpError })
  @ApiResponse({
    status: HttpStatus.OK,
    type: withBaseResponse(SubjectDeletedResponse),
  })
  public delete(@Param() { id }: IdQuery): Observable<SubjectDeletedResponse> {
    return this.service
      .deleteSubject(id)
      .pipe(map((subject) => new SubjectDeletedResponse(subject)));
  }
}
