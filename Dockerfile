FROM node:16-alpine as build

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build:prod

FROM nginx:1.21.5-alpine

COPY --from=build app/dist/split-angular /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/

EXPOSE 80
