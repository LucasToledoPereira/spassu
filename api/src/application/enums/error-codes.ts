export enum AuthorError {
  ALREADY_EXISTS = 'author.already.exists',
  NOT_FOUND = 'author.not.found',
  HAS_BOOKS = 'author.has.books',
}

export enum BookError {
  NOT_FOUND = 'book.not.found',
}

export enum SubjectError {
  NOT_FOUND = 'subject.not.found',
  IS_IN_USE = 'subject.in.use',
}

export enum CommonError {
  UNAUTHORIZED = 'unauthorized',
}

export type ErrorCode = AuthorError | BookError | SubjectError | CommonError;
