FROM alpine:latest
MAINTAINER wicac@yahoo.com

RUN apk update && apk add tar gzip
RUN apk add --update nodejs

RUN mkdir -p /apps/oauth2_tutorial
RUN mkdir -p /apps/oauth2_tutorial/models
WORKDIR /apps/oauth2_tutorial

COPY models /apps/oauth2_tutorial/models
COPY package.json .
COPY server.js .

RUN npm install --save express
ENTRYPOINT ["node"]
CMD ["server.js"]
