FROM debian:buster-slim

WORKDIR /opt/service

COPY ./install ./
RUN ./install

USER azure
WORKDIR /home/azure/functionapp
ENTRYPOINT [ "tini", "func", "start" ]
