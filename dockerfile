FROM node:22-slim

WORKDIR /documents/triplebond/utilities

COPY package.json /documents/triplebond/utilities

RUN npm install

COPY . .

EXPOSE 8080

CMD node calculator_server.js