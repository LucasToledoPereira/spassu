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

import { SubjectsService } from './subjects.service';
import { Subject } from './models/subject.model';
import { IdQuery } from '../../application/query/id.query';
import { SubjectCreateCommand } from './commands/subject-create.command';
import { SubjectUpdateCommand } from './commands/subject-update.command';

@Controller('subjects')
@ApiTags('subjects')
export class SubjectsController {
  constructor(private readonly service: SubjectsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a subject' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  public createAuthor(
    @Body() command: SubjectCreateCommand,
  ): Observable<Subject> {
    return this.service.createSubject(command);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List and search subjects' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  search(): Observable<Subject[]> {
    return this.service.searchSubjects();
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Update an subject' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  public updateAuthor(
    @Param() { id }: IdQuery,
    @Body() command: SubjectUpdateCommand,
  ): Observable<Subject> {
    return this.service.updateSubject(id, command);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an unused subject' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  public deleteAuthor(@Param() { id }: IdQuery): Observable<Subject> {
    return this.service.deleteSubjct(id);
  }
}
