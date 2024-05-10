import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Observable, concatMap, map, tap } from 'rxjs';

import { Subject } from './models/subject.model';
import { SubjectCreateCommand } from './commands/subject-create.command';
import { SubjectUpdateCommand } from './commands/subject-update.command';
import { ISubjectsRepository } from './interfaces/subjects-repository.interface';
import { SubjectError } from '../../application/enums/error-codes';

@Injectable()
export class SubjectsService {
  constructor(private _repository: ISubjectsRepository) {}

  createSubject(command: SubjectCreateCommand): Observable<Subject> {
    return this._repository.create(command.description);
  }

  searchSubjects(): Observable<Subject[]> {
    return this._repository.search();
  }

  updateSubject(
    id: number,
    command: SubjectUpdateCommand,
  ): Observable<Subject> {
    return this._repository.find(id).pipe(
      tap(this._checkIfSubjectExists),
      concatMap((subject) => {
        subject.description = command.description;
        return this._repository.update(subject);
      }),
    );
  }

  deleteSubject(id: number): Observable<Subject> {
    return this._repository.find(id).pipe(
      tap(this._checkIfSubjectExists),
      tap(this._checkIfSubjectIsInUse),
      concatMap((subject) =>
        this._repository.delete(subject.id).pipe(map(() => subject)),
      ),
    );
  }

  readSubject(id: number): Observable<Subject> {
    return this._repository.find(id).pipe(tap(this._checkIfSubjectExists));
  }

  private _checkIfSubjectExists(subject: Subject) {
    if (!subject) {
      throw new NotFoundException(SubjectError.NOT_FOUND);
    }
  }

  private _checkIfSubjectIsInUse(subject: Subject) {
    if (subject.books.length > 0) {
      throw new BadRequestException(SubjectError.IS_IN_USE);
    }
  }
}
