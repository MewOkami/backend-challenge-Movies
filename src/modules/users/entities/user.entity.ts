import { Exclude } from 'class-transformer';
import { randomUUID } from 'node:crypto';

export class User {
  readonly id: string;
  name: string;
  nickname: string;
  email: string;
  isAdm: boolean;

  @Exclude()
  password: string;

  constructor() {
    this.id = randomUUID();
  }
}
