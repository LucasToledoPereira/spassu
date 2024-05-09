import { Test } from '@nestjs/testing';

import { BooksService } from '../books.service';

describe('AppService', () => {
  let service: BooksService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [BooksService],
    }).compile();

    service = app.get<BooksService>(BooksService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
