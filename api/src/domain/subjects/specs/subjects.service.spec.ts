import { Test } from '@nestjs/testing';

import { AuthorsService } from '../subjects.service';

describe('AuthorsService', () => {
  let service: AuthorsService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AuthorsService],
    }).compile();

    service = app.get<AuthorsService>(AuthorsService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
