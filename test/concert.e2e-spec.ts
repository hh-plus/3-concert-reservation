import { INestApplication } from '@nestjs/common';
import { setupPrismaService } from './start-container';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from '@@prisma/prisma.service';
import { UserMock } from './mock/user.mock';
import { ConcertMock } from './mock/concerts/concert.mock';
import { ConcertDateMock } from './mock/concerts/concert-date.mock';
import * as request from 'supertest';

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
      imports: [AppModule],
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

    const concertMock = new ConcertMock(prisma, 3, 100);
    const newConcerts = await concertMock.insert();

    for (const c of newConcerts) {
      const concertDateMock = new ConcertDateMock(prisma, c.id, 3);
      await concertDateMock.insert();
    }
  });

  it('should get user token', async () => {
    const res = await request(app.getHttpServer()).get('/user/1/token');

    expect(res.body.data).toEqual({
      token: expect.any(String),
    });
    token = res.body.data.token;

    const res2 = await request(app.getHttpServer()).get('/user/2/token');
    token2 = res2.body.data.token;
  });

  describe('', () => {
    it('should get concerts Dates', async () => {
      const res = await request(app.getHttpServer())
        .get('/concert/1/available-date')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.data.concertDates.length).toBe(3);
    });

    it('should get concerts seats', async () => {
      const res = await request(app.getHttpServer())
        .get('/concert/1/available-seats/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.data.seats.length).toBe(100);
    });

    it('should can reserve concert', async () => {
      const res = await request(app.getHttpServer())
        .post('/concert/1/reserve')
        .set('Authorization', `Bearer ${token}`)
        .send({
          seat: 2,
        });

      expect(res.body).toBeDefined();

      const res2 = await request(app.getHttpServer())
        .post('/concert/1/reserve')
        .set('Authorization', `Bearer ${token2}`)
        .send({
          seat: 2,
        });

      expect(res2.error).toBeDefined();

      await request(app.getHttpServer())
        .patch('/concert/1/pay')
        .set('Authorization', `Bearer ${token}`);
    });
  });
});