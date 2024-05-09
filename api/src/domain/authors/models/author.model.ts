import { Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Book } from 'src/domain/books/models/books.model';

@Entity({ tableName: 'authors' })
export class Author {
  @PrimaryKey({ columnType: 'serial' })
  id: number;

  @Property({
    nullable: false,
    length: 40,
    fieldName: 'name',
  })
  name: string;

  @ManyToMany(() => Book, (book) => book.authors, {
    owner: true,
    eager: false,
    cascade: null,
  })
  books: Book[];

  @Property({
    nullable: false,
    columnType: 'timestamp',
    fieldName: 'created_at',
    defaultRaw: 'now()',
  })
  createdAt: Date;

  @Property({
    nullable: false,
    columnType: 'timestamp',
    fieldName: 'updated_at',
    defaultRaw: 'now()',
    onUpdate: () => new Date(),
  })
  updatedAt: Date;
}
