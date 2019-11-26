FROM node:10-alpine

WORKDIR /opt/service
COPY ./install ./
RUN ./install

ENTRYPOINT [ "nodemon", "./app/main.js" ]
