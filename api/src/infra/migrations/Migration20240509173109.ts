import { Migration } from '@mikro-orm/migrations';

export class Migration20240509173109 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "authors" ("id" serial primary key, "name" varchar(40) not null, "created_at" timestamp not null default now(), "updated_at" timestamp not null default now());');

    this.addSql('create table "authors_books" ("author_id" int not null, "book_id" int not null, constraint "authors_books_pkey" primary key ("author_id", "book_id"));');

    this.addSql('alter table "authors_books" add constraint "authors_books_author_id_foreign" foreign key ("author_id") references "authors" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "authors_books" add constraint "authors_books_book_id_foreign" foreign key ("book_id") references "books" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "authors_books" drop constraint "authors_books_author_id_foreign";');

    this.addSql('drop table if exists "authors" cascade;');

    this.addSql('drop table if exists "authors_books" cascade;');
  }

}
