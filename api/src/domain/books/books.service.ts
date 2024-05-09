import { Injectable } from '@nestjs/common';
import { Observable, concatMap, map, tap } from 'rxjs';

import { IBooksRepository } from './interfaces/books-repository.interface';
import { BookCreateCommand } from './commands/book-create.command';
import { Book } from './models/books.model';
import { BookUpdateCommand } from './commands/book-update.command';

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
          command.authors || book.authors.map((author) => author.id);
        command.subjects =
          command.subjects || book.subjects.map((subject) => subject.id);

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

  private _checkIfBookExists(book: Book) {
    if (!book) {
      throw new Error('Book not found');
    }
  }
}
