import { Migration } from '@mikro-orm/migrations';

export class Migration20240509184508 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "subjects_books" ("subject_id" int not null, "book_id" int not null, constraint "subjects_books_pkey" primary key ("subject_id", "book_id"));');

    this.addSql('alter table "subjects_books" add constraint "subjects_books_subject_id_foreign" foreign key ("subject_id") references "subjects" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "subjects_books" add constraint "subjects_books_book_id_foreign" foreign key ("book_id") references "books" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "books_subjects" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "books_subjects" ("book_id" int not null, "subject_id" int not null, constraint "books_subjects_pkey" primary key ("book_id", "subject_id"));');

    this.addSql('alter table "books_subjects" add constraint "books_subjects_book_id_foreign" foreign key ("book_id") references "books" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "books_subjects" add constraint "books_subjects_subject_id_foreign" foreign key ("subject_id") references "subjects" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "subjects_books" cascade;');
  }

}
