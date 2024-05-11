import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { Observable, from, map } from 'rxjs';

import { IBooksRepository } from './interfaces/books-repository.interface';
import { BookCreateCommand } from './commands/book-create.command';
import { Book } from './models/books.model';
import { BookUpdateCommand } from './commands/book-update.command';

@Injectable()
export class BooksRepository extends IBooksRepository {
  constructor(
    private readonly _entityManager: EntityManager,
    @InjectRepository(Book)
    private readonly _bookRepo: EntityRepository<Book>,
  ) {
    super();
  }

  create(command: BookCreateCommand): Observable<Book> {
    const book = this._bookRepo.create({
      title: command.title,
      publisher: command.publisher,
      edition: command.edition,
      year: command.year,
      value: command.value || null,
      currency: command.currency || null,
      subjects: command.subjects || [],
      authors: command.authors || [],
    });
    return from(this._entityManager.persistAndFlush([book])).pipe(
      map(() => book),
    );
  }

  search(): Observable<Book[]> {
    return from(
      this._bookRepo.findAll({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore because authors and subjects have a many to many relationship with books
        populate: ['authors', 'subjects'],
        orderBy: { id: 'asc' },
      }),
    );
  }

  find(id: number): Observable<Book> {
    return from(
      this._bookRepo.findOne(id, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore because authors and subjects have a many to many relationship with books
        populate: ['authors', 'subjects'],
      }),
    );
  }

  update(book: Book, command: BookUpdateCommand): Observable<Book> {
    const updateBook = this._bookRepo.assign(book, {
      title: command.title,
      publisher: command.publisher,
      edition: command.edition,
      year: command.year,
      value: command.value || null,
      currency: command.currency || null,
      subjects: command.subjects || [],
      authors: command.authors || [],
    });
    return from(this._entityManager.persistAndFlush(updateBook)).pipe(
      map(() => updateBook),
    );
  }

  delete(id: number): Observable<number> {
    return from(this._bookRepo.nativeDelete(id));
  }
}
