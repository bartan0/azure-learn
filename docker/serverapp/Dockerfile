FROM node:10-alpine

WORKDIR /opt/service

COPY ./install ./
RUN ./install

COPY ./reload ./init ./
ENTRYPOINT [ "tini", "./init" ]
