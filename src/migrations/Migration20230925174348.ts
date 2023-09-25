import { Migration } from '@mikro-orm/migrations';

export class Migration20230925174348 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "delivery" ("id" serial primary key, "type" varchar(255) not null, "address" varchar(255) not null);');

    this.addSql('create table "payment" ("id" serial primary key, "type" varchar(255) not null, "address" varchar(255) null, "credit_card" varchar(255) null);');

    this.addSql('create table "product" ("id" serial primary key, "title" varchar(255) not null, "description" varchar(255) not null, "price" int not null, constraint product_price_check check (price > 0));');

    this.addSql('create table "user" ("id" serial primary key);');

    this.addSql('create table "cart" ("id" serial primary key, "user_id" int not null, "is_deleted" boolean not null default false, "total_price" int not null default 0);');
    this.addSql('alter table "cart" add constraint "cart_user_id_unique" unique ("user_id");');

    this.addSql('create table "order" ("id" serial primary key, "cart_id" int not null, "payment" int not null, "delivery" int not null, "comments" varchar(255) not null, "status" text check ("status" in (\'created\', \'completed\')) not null, "total" int not null default 0);');
    this.addSql('alter table "order" add constraint "order_payment_unique" unique ("payment");');
    this.addSql('alter table "order" add constraint "order_delivery_unique" unique ("delivery");');

    this.addSql('create table "cart_item" ("id" serial primary key, "cart_id" int not null, "product" int not null, "count" int not null, constraint cart_item_count_check check (count > 0));');

    this.addSql('alter table "cart" add constraint "cart_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "order" add constraint "order_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade;');
    this.addSql('alter table "order" add constraint "order_payment_foreign" foreign key ("payment") references "payment" ("id") on update cascade;');
    this.addSql('alter table "order" add constraint "order_delivery_foreign" foreign key ("delivery") references "delivery" ("id") on update cascade;');

    this.addSql('alter table "cart_item" add constraint "cart_item_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade;');
    this.addSql('alter table "cart_item" add constraint "cart_item_product_foreign" foreign key ("product") references "product" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "order" drop constraint "order_delivery_foreign";');

    this.addSql('alter table "order" drop constraint "order_payment_foreign";');

    this.addSql('alter table "cart_item" drop constraint "cart_item_product_foreign";');

    this.addSql('alter table "cart" drop constraint "cart_user_id_foreign";');

    this.addSql('alter table "order" drop constraint "order_cart_id_foreign";');

    this.addSql('alter table "cart_item" drop constraint "cart_item_cart_id_foreign";');

    this.addSql('drop table if exists "delivery" cascade;');

    this.addSql('drop table if exists "payment" cascade;');

    this.addSql('drop table if exists "product" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "cart" cascade;');

    this.addSql('drop table if exists "order" cascade;');

    this.addSql('drop table if exists "cart_item" cascade;');
  }

}
