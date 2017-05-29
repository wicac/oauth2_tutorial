FROM alpine:latest
MAINTAINER wicac@yahoo.com

RUN apk update && apk add tar gzip
RUN apk add --update nodejs

RUN mkdir -p /apps/oauth2_tutorial
RUN mkdir -p /apps/oauth2_tutorial/models
RUN mkdir -p /apps/oauth2_tutorial/controllers
RUN mkdir -p /apps/oauth2_tutorial/views
WORKDIR /apps/oauth2_tutorial

COPY models /apps/oauth2_tutorial/models
COPY controllers /apps/oauth2_tutorial/controllers
COPY views /apps/oauth2_tutorial/views

COPY package.json .
COPY server.js .

RUN npm install --save express
RUN npm install --save mongoose
RUN npm install --save body-parser
RUN npm install --save bcrypt-nodejs
RUN npm install --save passport
RUN npm install --save passport-http
RUN npm install --save passport-http-bearer
RUN npm install --save ejs
RUN npm install --save express-session
RUN npm install --save oauth2orize


ENTRYPOINT ["node"]
CMD ["server.js"]
