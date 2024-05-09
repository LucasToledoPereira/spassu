import { Test, TestingModule } from '@nestjs/testing';

import { BooksController } from '../books.controller';
import { BooksService } from '../books.service';

describe('BooksController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<BooksController>(BooksService);
      expect(appController.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
