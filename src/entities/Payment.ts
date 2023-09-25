import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Payment {
  @PrimaryKey({ autoincrement: true, fieldName: 'id', hidden: true })
  id!: number;

  @Property()
  type!: string;

  @Property()
  address?: any;

  @Property()
  creditCard?: any;
}
