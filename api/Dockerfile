ARG NODE_VERSION=20

FROM eddacris/blglib-main-page AS main-page

FROM node:${NODE_VERSION}-alpine

WORKDIR /app-api
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
COPY --from=main-page /app-main-page/build /app-api/app-main-page/build
EXPOSE 4000
CMD ["npm", "start"]