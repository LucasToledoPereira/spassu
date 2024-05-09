import { Test, TestingModule } from '@nestjs/testing';

import { AuthorsController } from '../authors.controller';
import { AuthorsService } from '../authors.service';

describe('BooksController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [AuthorsService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<AuthorsController>(AuthorsService);
      expect(appController.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
