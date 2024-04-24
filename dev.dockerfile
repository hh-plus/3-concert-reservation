FROM node:18.19.0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .


RUN npx prisma generate

RUN npx prisma migrate dev

EXPOSE 3000

CMD ["yarn", "start"]
