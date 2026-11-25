FROM node:20-alpine

WORKDIR /electronics-store-app

COPY package.json .
RUN npm install

COPY . .

CMD npm start
