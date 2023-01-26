FROM node:16.19.0-alpine3.16

LABEL Maintainer="Ismael"

WORKDIR /node

COPY . /node/

EXPOSE 51000

RUN npm install -g npm@9.3.1
RUN npm install http socket.io cors ws socket.io-client path request

CMD [ "node", "server.js" ]