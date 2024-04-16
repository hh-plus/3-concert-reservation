import { ConflictException } from '@nestjs/common';

export class AlreadyReserveSeatException extends ConflictException {
  constructor() {
    super('already reserve seat');
  }
}
