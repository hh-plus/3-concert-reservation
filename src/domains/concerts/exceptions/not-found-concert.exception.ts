import { NotFoundException } from '@nestjs/common';

export class NotFoundConcertException extends NotFoundException {
  constructor() {
    super('concert not found');
  }
}
