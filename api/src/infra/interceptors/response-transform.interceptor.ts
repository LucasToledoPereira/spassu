import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseBase } from '../../application/types/response.type';

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, ResponseBase<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseBase<T>> {
    return next.handle().pipe(
      map((data: any) => ({
        success: true,
        data,
      })),
    );
  }
}
