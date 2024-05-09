import { Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Book } from 'src/domain/books/models/books.model';

@Entity({ tableName: 'subjects' })
export class Subject {
  @PrimaryKey({ columnType: 'serial' })
  id: number;

  @Property({
    nullable: false,
    length: 20,
    fieldName: 'description',
  })
  description: string;

  @ManyToMany(() => Book, (book) => book.subjects, {
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
