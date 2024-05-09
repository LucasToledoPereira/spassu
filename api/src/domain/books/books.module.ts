import { Logger, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { BooksController } from './books.controller';
import { BooksRepository } from './books.repository';
import { IBooksRepository } from './interfaces/books-repository.interface';
import { BooksService } from './books.service';
import { Book } from './models/books.model';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [Book],
    }),
  ],
  controllers: [BooksController],
  providers: [
    {
      provide: IBooksRepository,
      useClass: BooksRepository,
    },
    BooksService,
    Logger,
  ],
})
export class BooksModule {}
