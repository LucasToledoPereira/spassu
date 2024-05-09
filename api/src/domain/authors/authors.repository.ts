import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

import { IAuthorsRepository } from './interfaces/authors-repository.interface';
import { Observable, from, map } from 'rxjs';
import { Author } from './models/author.model';

@Injectable()
export class AuthorsRepository extends IAuthorsRepository {
  constructor(
    private readonly _entityManager: EntityManager,
    @InjectRepository(Author)
    private readonly _authorRepo: EntityRepository<Author>,
  ) {
    super();
  }

  create(name: string): Observable<Author> {
    const author = this._authorRepo.create({
      name,
    });
    return from(this._entityManager.persistAndFlush([author])).pipe(
      map(() => author),
    );
  }

  search(): Observable<Author[]> {
    return from(this._authorRepo.findAll());
  }

  find(id: number): Observable<Author> {
    return from(
      this._authorRepo.findOne(id, {
        populate: ['books'],
      }),
    );
  }

  update(author: Author): Observable<Author> {
    return from(this._entityManager.persistAndFlush([author])).pipe(
      map(() => author),
    );
  }

  delete(id: number): Observable<number> {
    return from(this._authorRepo.nativeDelete(id));
  }
}
