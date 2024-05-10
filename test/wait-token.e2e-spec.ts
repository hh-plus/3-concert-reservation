import { PrismaService } from '@@prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { setupPrismaService } from './start-container';
import { AppModule } from 'src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { UserMock } from './mock/user.mock';
import { CashLogMock } from './mock/cash-log.mock';
import { ConcertMock } from './mock/concerts/concert.mock';
import { ConcertDateMock } from './mock/concerts/concert-date.mock';
import { getWaitToken } from './mock/users/get-active-token';
import * as request from 'supertest';
import { UserModule } from 'src/apis/users/user.module';
import { RedisModule } from 'src/infrastructures/common/redis/redis.module';
import { RedisService } from 'src/infrastructures/common/redis/redis.service';
import { CronService } from 'cron/redis.del-data.service';

describe('대기열 테스트 진행', () => {
  jest.setTimeout(100000);

  let app: INestApplication;

  let prisma: PrismaService;
  let container;
  let newUsers;

  beforeAll(async () => {
    ({ prisma, container } = await setupPrismaService());
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)

      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes();
    await app.init();

    // mock data
    const userMock = new UserMock(prisma, 10000);
    newUsers = await userMock.insert();

    await CashLogMock.insertCashLog(
      prisma,
      newUsers.map((u) => u.id),
    );

    const concertMock = new ConcertMock(prisma, 3, 10);
    const newConcerts = await concertMock.insert();

    for (const c of newConcerts) {
      const concertDateMock = new ConcertDateMock(prisma, c.id, 3);
      await concertDateMock.insert();
    }
  });

  it('토큰을 발급받으려는 유저가 아주 많을 경우 대기열에 들어가야한다.', async () => {
    const tokens = await getWaitToken(app, 100);

    if (tokens === undefined) {
      throw new Error('tokens is undefined');
    }

    // 1초 대기
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const results = await Promise.all(
      tokens.map(async (token, i) => {
        const res = await request(app.getHttpServer())
          .get(`/user/${i}/token`)
          .set('Authorization', `Bearer ${token.body.token}`);
        return res.body;
      }),
    );
    for (const result of results) {
      console.log(result);
    }
  });
});
