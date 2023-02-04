FROM php:8.2-fpm-alpine

COPY docker/php/config/xdebug.ini /etc/php8/conf.d/50_xdebug.ini

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

# Set timezone
ENV TIMEZONE=Etc/UCT
RUN ln -snf /usr/share/zoneinfo/${TIMEZONE} /etc/localtime && echo ${TIMEZONE} > /etc/timezone \
    && printf '[PHP]\ndate.timezone = "%s"\n', ${TIMEZONE} > /usr/local/etc/php/conf.d/tzone.ini \
    && "date"

# install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer selfupdate

CMD ["php-fpm", "-F"]

COPY docker/php/config/xdebug.ini /etc/php8.2/conf.d/50_xdebug.ini
COPY ../../api /var/www/api

WORKDIR /var/www/api

EXPOSE 9000