import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/core';
import { APP_FILTER } from '@nestjs/core';

import { BooksModule } from './domain/books/books.module';
import { validate } from './application/config/env.validation';
import { AuthorsModule } from './domain/authors/authors.module';
import { SubjectsModule } from './domain/subjects/subjects.module';
import { ExceptionHandler } from './infra/filters/exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
    MikroOrmModule.forRoot(),
    AuthorsModule,
    SubjectsModule,
    BooksModule,
  ],
  providers: [
    Logger,
    {
      provide: APP_FILTER,
      useClass: ExceptionHandler,
    },
  ],
})
export class AppModule {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    await this.orm.migrator.up();
  }
}
