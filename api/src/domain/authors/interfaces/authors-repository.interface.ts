import { Observable } from 'rxjs';
import { Author } from '../models/author.model';

export abstract class IAuthorsRepository {
  abstract create(name: string): Observable<Author>;
  abstract update(author: Author): Observable<Author>;
  abstract search(): Observable<Author[]>;
  abstract find(id: number): Observable<Author>;
  abstract delete(id: number): Observable<number>;
}
