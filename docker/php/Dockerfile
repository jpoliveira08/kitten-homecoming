FROM php:8.2-fpm-alpine

RUN apk update \
    && apk add git \
        curl \
        vim \
        wget \
        bash \
        zlib \
        zlib-dev \
        patch \
        icu-dev

# install php dependencies
RUN apk add --no-cache $PHPIZE_DEPS
RUN apk add --update linux-headers
RUN pecl install -f xdebug
RUN docker-php-ext-install intl opcache bcmath sockets
RUN docker-php-ext-enable xdebug intl opcache bcmath sockets
RUN rm -rf /var/lib/apt/lists/*

COPY docker/php/config/90-xdebug.ini "${PHP_INI_DIR}/conf.d"

# Set timezone
ENV TIMEZONE=Etc/UCT
RUN ln -snf /usr/share/zoneinfo/${TIMEZONE} /etc/localtime && echo ${TIMEZONE} > /etc/timezone \
    && printf '[PHP]\ndate.timezone = "%s"\n', ${TIMEZONE} > /usr/local/etc/php/conf.d/tzone.ini \
    && "date"

# install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer selfupdate

CMD ["php-fpm", "-F"]

# PHP container didn't have the correct permissions to write to the filesystem
ARG UID
ARG GID
ENV UID=${UID}
ENV GID=${GID}
RUN addgroup -g ${GID} --system symfony
RUN adduser -G symfony --system -D -s /bin/sh -u ${UID} symfony
RUN sed -i "s/user = www-data/user = symfony/g" /usr/local/etc/php-fpm.d/www.conf
RUN sed -i "s/group = www-data/group = symfony/g" /usr/local/etc/php-fpm.d/www.conf

COPY api/ /var/www/kitten-homecoming/api/

WORKDIR /var/www/kitten-homecoming/api

EXPOSE 9000

USER symfony