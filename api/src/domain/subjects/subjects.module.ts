import { Logger, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { SubjectsController } from './subjects.controller';
import { SubjectsRepository } from './subjects.repository';
import { ISubjectsRepository } from './interfaces/subjects-repository.interface';
import { SubjectsService } from './subjects.service';
import { Subject } from './models/subject.model';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [Subject],
    }),
  ],
  controllers: [SubjectsController],
  providers: [
    {
      provide: ISubjectsRepository,
      useClass: SubjectsRepository,
    },
    SubjectsService,
    Logger,
  ],
})
export class SubjectsModule {}
