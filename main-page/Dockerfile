ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine

WORKDIR /app-main-page

# Так как образ node:alpine не включает дополнительных инструментов и ПО, 
# необходимо их добавить для сборки проекта, надо отфильтровать список
RUN apk add --update --no-cache \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    libtool \
    autoconf \
    automake 
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
ENV REACT_APP_BASE_URL_API=http://blglib.ru:4000/api
RUN npm run build
