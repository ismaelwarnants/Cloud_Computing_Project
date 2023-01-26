FROM lorisleiva/laravel-docker:8.1

WORKDIR /laravel
COPY . /laravel/

RUN composer install
RUN chmod -R 777 storage
RUN chmod -R 777 bootstrap/cache

EXPOSE 8000
CMD php artisan serve --host=0.0.0.0 --port=8000