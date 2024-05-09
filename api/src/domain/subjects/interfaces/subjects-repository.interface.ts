import { Observable } from 'rxjs';
import { Subject } from '../models/subject.model';

export abstract class ISubjectsRepository {
  abstract create(description: string): Observable<Subject>;
  abstract search(): Observable<Subject[]>;
  abstract update(subject: Subject): Observable<Subject>;
  abstract find(id: number): Observable<Subject>;
  abstract delete(id: number): Observable<number>;
}
