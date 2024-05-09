import { Migration } from '@mikro-orm/migrations';

export class Migration20240509172533 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "subjects" ("id" serial primary key, "description" varchar(20) not null, "created_at" timestamp not null default now(), "updated_at" timestamp not null default now());');

    this.addSql('create table "books_subjects" ("book_id" int not null, "subject_id" int not null, constraint "books_subjects_pkey" primary key ("book_id", "subject_id"));');

    this.addSql('alter table "books_subjects" add constraint "books_subjects_book_id_foreign" foreign key ("book_id") references "books" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "books_subjects" add constraint "books_subjects_subject_id_foreign" foreign key ("subject_id") references "subjects" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "books" add column "value" numeric null, add column "currency" text check ("currency" in (\'BRL\', \'USD\', \'EUR\')) null, add column "created_at" timestamp not null default now(), add column "updated_at" timestamp not null default now();');
  }

  async down(): Promise<void> {
    this.addSql('alter table "books_subjects" drop constraint "books_subjects_subject_id_foreign";');

    this.addSql('drop table if exists "subjects" cascade;');

    this.addSql('drop table if exists "books_subjects" cascade;');

    this.addSql('alter table "books" drop column "value", drop column "currency", drop column "created_at", drop column "updated_at";');
  }

}
