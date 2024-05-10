import { Injectable, NotFoundException } from '@nestjs/common';
import { Observable, concatMap, map, tap } from 'rxjs';

import { IBooksRepository } from './interfaces/books-repository.interface';
import { BookCreateCommand } from './commands/book-create.command';
import { Book } from './models/books.model';
import { BookUpdateCommand } from './commands/book-update.command';
import { BookError } from '../../application/enums/error-codes';

@Injectable()
export class BooksService {
  constructor(private _repository: IBooksRepository) {}

  createBook(command: BookCreateCommand): Observable<Book> {
    return this._repository.create(command);
  }

  searchBooks(): Observable<Book[]> {
    return this._repository.search();
  }

  updateBook(id: number, command: BookUpdateCommand): Observable<Book> {
    return this._repository.find(id).pipe(
      tap(this._checkIfBookExists),
      concatMap((book) => {
        command.authors =
          !command.authors || command.authors.length === 0
            ? null
            : command.authors;
        command.subjects =
          !command.subjects || command.subjects.length === 0
            ? null
            : command.subjects;

        return this._repository.update(book, command);
      }),
    );
  }

  deleteBook(id: number): Observable<Book> {
    return this._repository.find(id).pipe(
      tap(this._checkIfBookExists),
      concatMap((book) =>
        this._repository.delete(book.id).pipe(map(() => book)),
      ),
    );
  }

  readBook(id: number): Observable<Book> {
    return this._repository.find(id).pipe(tap(this._checkIfBookExists));
  }

  private _checkIfBookExists(book: Book) {
    if (!book) {
      throw new NotFoundException(BookError.NOT_FOUND);
    }
  }
}
