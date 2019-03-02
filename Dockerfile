FROM node:10.13-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN apk add --no-cache --virtual .gyp \
    python \
    make \
    g++ \
    && npm install --production --silent && mv node_modules ../\
    && apk del .gyp
COPY . .
EXPOSE 3000
CMD npm start