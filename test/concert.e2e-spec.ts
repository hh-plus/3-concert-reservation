import { INestApplication } from '@nestjs/common';
import { setupPrismaService } from './start-container';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from '@@prisma/prisma.service';
import { UserMock } from './mock/users/user.mock';
import { ConcertMock } from './mock/concerts/concert.mock';
import { ConcertDateMock } from './mock/concerts/concert-date.mock';
import * as request from 'supertest';
import { JwtService } from '@nestjs/jwt';
import { JwtManageService } from 'src/domains/users/jwt/jwt.service';

const userCount = 300;
const tokenJoinCount = 100;
describe('Concert', () => {
  jest.setTimeout(100000);

  let app: INestApplication;
  let jwtService: JwtManageService;

  let prisma: PrismaService;
  let container;

  let token: string;
  let token2: string;
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

    jwtService = new JwtManageService(new JwtService());

    // mock data
    const userMock = new UserMock(prisma, 300);
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

  describe('날짜 조회, 좌석 조회, 예약, 결제가 가능해야한다.', () => {
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

  describe('should equal users requests count and reservation counts', () => {
    const tokens: any[] = [];
    let payloads: any[] = [];
    beforeAll(async () => {
      for (let i = 3; i < 301; i++) {
        const tokenRes = await request(app.getHttpServer()).get(
          `/user/${i}/token`,
        );
        // console.log(tokenRes.body);
        tokens.push(tokenRes.body.data.token);
      }
      for (const t of tokens) {
        const payload = await jwtService.verify(t);
        payloads.push(payload);
      }
    });

    it('multiple request', async () => {
      // 입장중인 트랜잭션이 tokenJoinCount보다 많다면 entryTime은 현재 시간보다 2분 이상 이후여야한다.

      for (let i = 0; i < userCount; i++) {
        if (i > tokenJoinCount && !!payloads[i]?.entryTime) {
          console.log(new Date(payloads[i].entryTime));
          expect(
            new Date(payloads[i].entryTime).getTime(),
          ).toBeGreaterThanOrEqual(new Date().getTime() + 1000 * 60 * 1);
        }
      }
    });

    it('같은 좌석에 여러명이 예약하면 1명만 예약되어야 한다.', async () => {
      const promises: any[] = [];

      for (let i = 3; i < 10; i++) {
        promises.push(
          request(app.getHttpServer())
            .post('/concert/1/reserve')
            .set('Authorization', `Bearer ${tokens[i - 3]}`)
            .send({ seat: 2 }),
        );
      }

      await Promise.allSettled(promises);
      const reservedSeat = await prisma.concertDate.findFirst({
        where: {
          id: 1,
        },
        include: {
          ConcertDateUser: true,
        },
      });
      if (!reservedSeat) {
        throw new Error('reservedSeat is null');
      }

      expect(reservedSeat.ConcertDateUser.length).toBe(1);
    });
  });
});
