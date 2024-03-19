cd /usr/share/nginx/html/static/js
grep -o -E "baseURL:................................." 

main.51e690cf.js




docker-compose run --rm certbot certonly --webroot --webroot-path /var/www/certbot/ -d blglib.ru -d www.blglib.ru -d admin.blglib.ru -d api.blglib.ru


docker compose run --rm certbot renew