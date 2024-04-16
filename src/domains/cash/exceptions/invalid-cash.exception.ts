import { BadRequestException } from '@nestjs/common';

export class InvalidCashException extends BadRequestException {
  constructor() {
    super('cash is invalid');
  }
}
