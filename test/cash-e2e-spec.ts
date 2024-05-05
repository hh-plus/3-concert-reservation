import { INestApplication } from '@nestjs/common';
import { setupPrismaService } from './start-container';
import { Test, TestingModule } from '@nestjs/testing';
import { CashModule } from 'src/apis/cash/cash.module';
import { PrismaService } from '@@prisma/prisma.service';
import { UserMock } from './mock/user.mock';

describe('Concert', () => {
  jest.setTimeout(100000);

  let app: INestApplication;

  let prisma;
  let container;

  let token: string;
  let token2: string;
  beforeEach(async () => {
    ({ prisma, container } = await setupPrismaService());
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CashModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes();
    await app.init();

    // mock data
    const userMock = new UserMock(prisma, 10);
    await userMock.insert();
  });
});
