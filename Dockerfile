FROM alpine:latest
MAINTAINER wicac@yahoo.com

RUN apk update && apk add tar gzip
RUN apk add --update nodejs

WORKDIR /apps/oauth2_tutorial
RUN npm init -f

RUN npm install express --save
