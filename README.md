### Docker + MongoDB

#### Удалить контейнер

```
sudo docker rm blglib-db
```

#### Запустить с пробросом порта (поменять на другой) и сохранением тома mongo-gata
```
sudo docker run -d -p 27017:27017 --name dbtest -v mongo-data:/data/db mongo:latest

sudo docker run -d -p 27017:27017 --name blglib -v mongo-data:/data/db -v ./mongodb/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js mongo:latest 


sudo docker run --name blglib -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=ring3 -v ./mongodb/mongodb-data:/data/db mongo:latest 

```


```
sudo docker compose down --rmi all
```