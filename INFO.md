## Docker + MongoDB

#### Удалить контейнер

```
sudo docker rm blglib-db
```

### Запустить с пробросом порта (поменять на другой) и сохранением тома mongo-gata
```
sudo docker run -d -p 27017:27017 --name blglib-db -v mongo-data:/data/db mongo:latest
```
