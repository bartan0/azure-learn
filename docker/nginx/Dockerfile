FROM alpine

WORKDIR /opt/service

COPY ./install ./
RUN ./install

COPY ./init ./
COPY ./nginx.conf /etc/nginx/

ENTRYPOINT [ "./init" ]
