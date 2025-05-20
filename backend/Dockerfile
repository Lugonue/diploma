# Этап сборки
FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 5000

CMD ["yarn", "start:prod"]