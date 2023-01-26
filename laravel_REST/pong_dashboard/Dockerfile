FROM php:8.1-rc-apache-buster

RUN apt-get update -y && apt-get install -y libmcrypt-dev git unzip php-xml php-dom php-curl

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /laravel
COPY . /laravel

RUN composer install

EXPOSE 8001
CMD php artisan serve --host=0.0.0.0 --port=8001