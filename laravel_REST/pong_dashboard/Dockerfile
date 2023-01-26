FROM amd64/php:8.1-cli-buster

RUN apt-get update -y && apt-get install -y libmcrypt-dev git unzip

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /laravel
COPY . /laravel/

RUN composer install
RUN chmod --recursive 777 /laravel/

EXPOSE 8001
CMD php artisan serve --host=0.0.0.0 --port=8001