FROM node:latest

WORKDIR /app

COPY package.json /app/package.json

RUN yarn

RUN npx prisma generate

COPY . /app


EXPOSE 3000

CMD ["yarn", "start"]
