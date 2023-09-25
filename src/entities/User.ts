import { Entity, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey({ autoincrement: true })
  id!: number;
}
