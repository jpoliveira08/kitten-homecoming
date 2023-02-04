FROM nginx:1.23-alpine

RUN apk update \
    && apk add git curl vim wget bash acl

RUN rm /etc/nginx/conf.d/default.conf