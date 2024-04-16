import { Injectable } from '@nestjs/common';
import { CashRepositoryPort } from 'src/applications/cash/adapters/cash.repository.port';

@Injectable()
export class CashFactory implements CashRepositoryPort {}
