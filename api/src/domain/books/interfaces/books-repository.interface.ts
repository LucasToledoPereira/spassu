import { Observable } from 'rxjs';
import { Book } from '../models/books.model';
import { BookCreateCommand } from '../commands/book-create.command';
import { BookUpdateCommand } from '../commands/book-update.command';

export abstract class IBooksRepository {
  abstract create(command: BookCreateCommand): Observable<Book>;
  abstract search(): Observable<Book[]>;
  abstract find(id: number): Observable<Book>;
  abstract delete(id: number): Observable<number>;
  abstract update(book: Book, command: BookUpdateCommand): Observable<Book>;
}
