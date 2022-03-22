FROM node:latest

WORKDIR /usr/app

COPY package.json ./

RUN yarn install 

COPY src ./src
COPY prisma ./prisma
COPY tsconfig.json .
COPY .env.example .env

RUN yarn build

EXPOSE 3333
CMD ["yarn", "start"]