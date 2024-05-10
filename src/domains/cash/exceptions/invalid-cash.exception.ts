import { BadRequestException } from '@nestjs/common';

export class InvalidCashException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Invalid cash.');
  }
}
