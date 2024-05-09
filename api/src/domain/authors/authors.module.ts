import { Logger, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { AuthorsController } from './authors.controller';
import { AuthorsRepository } from './authors.repository';
import { IAuthorsRepository } from './interfaces/authors-repository.interface';
import { AuthorsService } from './authors.service';
import { Author } from './models/author.model';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [Author],
    }),
  ],
  controllers: [AuthorsController],
  providers: [
    {
      provide: IAuthorsRepository,
      useClass: AuthorsRepository,
    },
    AuthorsService,
    Logger,
  ],
})
export class AuthorsModule {}
