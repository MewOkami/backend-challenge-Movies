import { randomUUID } from 'node:crypto';

export class Movie {
  readonly id: string;
  imageUrl: string;
  name: string;
  type: string;
  description: string;
  duration: string;
  classification: number;

  constructor() {
    this.id = randomUUID();
  }
}
