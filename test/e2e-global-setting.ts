import { GenericContainer } from 'testcontainers';

const REDIS_IMAGE = 'redis:latest';
const REDIS_PORT = 6379;

export = async () => {
  const redisContainer = await new GenericContainer(REDIS_IMAGE)
    .withExposedPorts(REDIS_PORT)
    .start();
  console.log('??');
  global.__REDIS__ = {
    host: redisContainer.getHost(),
    port: redisContainer.getMappedPort(REDIS_PORT),
  };

  process.env.REDIS_HOST = global.__REDIS__.host;
  process.env.REDIS_PORT = global.__REDIS__.port.toString();
  console.log('reids!');
};
