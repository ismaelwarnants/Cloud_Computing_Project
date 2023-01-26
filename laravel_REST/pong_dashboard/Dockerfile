FROM php:8.1-rc-apache-buster

RUN apt-get update -y && apt-get install -y libmcrypt-dev git unzip

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /laravel
COPY . /laravel

RUN composer install
RUN chmod -R 777 storage
RUN chmod -R 777 bootstrap/cache

EXPOSE 8000
CMD php artisan serve --host=0.0.0.0 --port=8000