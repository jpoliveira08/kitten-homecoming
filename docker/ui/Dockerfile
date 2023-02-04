FROM node:lts-alpine

WORKDIR /var/www/ui

COPY ../../ui/package*.json .

RUN npm ci

COPY ../../ui/* .

EXPOSE 5173