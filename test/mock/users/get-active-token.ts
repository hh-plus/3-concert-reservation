import * as request from 'supertest';

export const getWaitToken = async (app, count: number) => {
  const countArr = Array.from({ length: count }, (_, i) => i);
  const result: any[] = [];
  const batch = 50;

  for (let i = 0; i < count; i += batch) {
    console.log(i, i + batch);
    const promises = countArr.slice(i, i + batch).map(async (i) => {
      return request(app.getHttpServer()).get(`/user/${i}/token`);
    });

    try {
      const r = await Promise.all(promises);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      result.push(...r);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  return result;
};

export const getActiveToken = async (userId: number) => {};
