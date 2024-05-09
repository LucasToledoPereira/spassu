import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/core';

import { BooksModule } from './domain/books/books.module';
import { validate } from './application/config/env.validation';
import { AuthorsModule } from './domain/authors/authors.module';
import { SubjectsModule } from './domain/subjects/subjects.module';

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
})
export class AppModule {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    await this.orm.migrator.up();
  }
}
