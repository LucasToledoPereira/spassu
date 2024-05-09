import {
  Entity,
  Enum,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Currency } from '../../../application/constants/currencies';
import { Subject } from '../../subjects/models/subject.model';
import { Author } from '../../authors/models/author.model';

@Entity({ tableName: 'books' })
export class Book {
  @PrimaryKey({ columnType: 'serial' })
  id: number;

  @Property({
    nullable: false,
    length: 40,
    fieldName: 'title',
  })
  title: string;

  @Property({
    nullable: false,
    length: 40,
    fieldName: 'publisher',
  })
  publisher: string;

  @Property({
    nullable: false,
    columnType: 'integer',
    fieldName: 'edition',
  })
  edition: number;

  @Property({
    nullable: false,
    length: 4,
    fieldName: 'year',
  })
  year: string;

  @Property({
    nullable: true,
    columnType: 'numeric',
    fieldName: 'value',
  })
  value: number;

  @Enum({
    items: () => Currency,
    nullable: true,
    fieldName: 'currency',
  })
  currency: Currency;

  @ManyToMany(() => Subject, (subject) => subject.books)
  subjects: Subject[];

  @ManyToMany(() => Author, (author) => author.books)
  authors: Author[];

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
