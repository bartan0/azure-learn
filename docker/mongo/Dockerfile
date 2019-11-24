FROM debian:buster-slim

WORKDIR /opt/service

COPY ./mongo.asc /etc/apt/trusted.gpg.d/
COPY ./install ./
RUN ./install

COPY ./init ./
ENTRYPOINT [ "./init" ]
