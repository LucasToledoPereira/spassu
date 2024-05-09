import { Test, TestingModule } from '@nestjs/testing';

import { SubjectsController } from '../subjects.controller';
import { SubjectsService } from '../subjects.service';

describe('SubjectsController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [SubjectsController],
      providers: [SubjectsService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<SubjectsController>(SubjectsService);
      expect(appController.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
