import { Check, Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Product {
  @PrimaryKey({ autoincrement: true, fieldName: 'id' })
  id!: number;

  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property()
  @Check({ expression: 'price > 0' })
  price!: number;
}
