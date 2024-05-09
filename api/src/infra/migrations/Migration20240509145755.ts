import { Migration } from '@mikro-orm/migrations';

export class Migration20240509145755 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "books" ("id" serial primary key, "title" varchar(40) not null, "publisher" varchar(40) not null, "edition" integer not null, "year" varchar(4) not null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "books" cascade;');
  }

}
