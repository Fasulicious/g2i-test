FROM node:alpine

WORKDIR /
COPY package*.json ./

RUN npm ci
COPY ./ ./

CMD npm run start