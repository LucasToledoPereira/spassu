import { Injectable } from '@nestjs/common';
import { ISubjectsRepository } from './interfaces/subjects-repository.interface';
import { Observable, from, map } from 'rxjs';
import { Subject } from './models/subject.model';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class SubjectsRepository extends ISubjectsRepository {
  constructor(
    private readonly _entityManager: EntityManager,
    @InjectRepository(Subject)
    private readonly _subjectRepo: EntityRepository<Subject>,
  ) {
    super();
  }

  create(description: string): Observable<Subject> {
    const subject = this._subjectRepo.create({
      description,
    });
    return from(this._entityManager.persistAndFlush([subject])).pipe(
      map(() => subject),
    );
  }

  search(): Observable<Subject[]> {
    return from(this._subjectRepo.findAll());
  }

  find(id: number): Observable<Subject> {
    return from(
      this._subjectRepo.findOne(id, {
        populate: ['books'],
      }),
    );
  }

  update(subject: Subject): Observable<Subject> {
    return from(this._entityManager.persistAndFlush([subject])).pipe(
      map(() => subject),
    );
  }

  delete(id: number): Observable<number> {
    return from(this._subjectRepo.nativeDelete(id));
  }
}
