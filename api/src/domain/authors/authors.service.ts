import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Observable, concatMap, map, tap } from 'rxjs';

import { Author } from './models/author.model';
import { IAuthorsRepository } from './interfaces/authors-repository.interface';
import { AuthorCreateCommand } from './commands/author-create.command';
import { AuthorUpdateCommand } from './commands/author-update.command';
import { AuthorError } from '../../application/enums/error-codes';

@Injectable()
export class AuthorsService {
  constructor(private _repository: IAuthorsRepository) {}

  createAuthor(command: AuthorCreateCommand): Observable<Author> {
    return this._repository.create(command.name);
  }

  updateAuthor(id: number, command: AuthorUpdateCommand): Observable<Author> {
    return this._repository.find(id).pipe(
      tap(this._checkIfAuthorExists),
      concatMap((author) => {
        author.name = command.name;
        return this._repository.update(author);
      }),
    );
  }

  searchAuthors(): Observable<Author[]> {
    return this._repository.search();
  }

  deleteAuthor(id: number): Observable<Author> {
    return this._repository.find(id).pipe(
      tap(this._checkIfAuthorExists),
      tap(this._checkIfAuthorHasBooks),
      concatMap((author) =>
        this._repository.delete(author.id).pipe(map(() => author)),
      ),
    );
  }

  readAuthor(id: number): Observable<Author> {
    return this._repository.find(id).pipe(tap(this._checkIfAuthorExists));
  }

  private _checkIfAuthorExists(author: Author) {
    if (!author) {
      throw new NotFoundException(AuthorError.NOT_FOUND);
    }
  }

  private _checkIfAuthorHasBooks(author: Author) {
    if (author.books.length > 0) {
      throw new BadRequestException(AuthorError.HAS_BOOKS);
    }
  }
}
