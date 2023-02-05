FROM node:lts-alpine

RUN apk update \
    && apk add git curl vim wget bash acl

WORKDIR /var/www/kitten-homecoming/ui

COPY ui/package*.json /var/www/kitten-homecoming/ui/

RUN npm ci

COPY ui/ /var/www/kitten-homecoming/ui/

EXPOSE 5173