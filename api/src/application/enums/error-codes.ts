export enum AuthorError {
  ALREADY_EXISTS = 'O autor já existe',
  NOT_FOUND = 'Autor não encontrado',
  HAS_BOOKS = 'O autor possuí livros atribuídos a ele',
}

export enum BookError {
  NOT_FOUND = 'O livro não foi encontrado',
}

export enum SubjectError {
  NOT_FOUND = 'O assunto não foi encontrado',
  IS_IN_USE = 'O assunto está em uso',
}

export enum CommonError {
  UNAUTHORIZED = 'Não autorizado',
}

export type ErrorCode = AuthorError | BookError | SubjectError | CommonError;
