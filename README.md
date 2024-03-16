
### Production

1. Перенести .env.prod и .env.mongo

2. Переместить ключи сертификатов в папке proxy

3. Создать сети

```
sudo docker network create api-net
sudo docker network create main-page-net
```
4. Запустить docker-compose up


#### package.json
  "dev:client": "yarn --cwd main-page",
  "dev:api": "yarn --cwd api dev",
  "dev": "concurrently \"yarn dev:client\" \"yarn dev:api\"",

### Docker + MongoDB

#### Удалить контейнер

```
sudo docker rm blglib-db
```

#### Запустить с пробросом порта (поменять на другой) и сохранением тома mongo-gata
```
<!-- sudo docker run -d -p 27017:27017 --name blglib -v blglib_v10_mongodb-data:/data/db -v ./mongodb/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js mongo:latest  -->

sudo docker run --name blglib-mongodb -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=ring3 -v blglib_v10_mongodb-data:/data/db mongo:latest  
```

#### rmi
```
sudo docker compose down --rmi all
```

mongosh -u "root" -p "ring3-1foyL" --authenticationDatabase "blglib-db"


mongosh -u "root" -p "ring3-1foyL" --authenticationDatabase "admin"


sudo docker exec -it mongodb-blglib mongosh -u root -p ring3-1foyL --authenticationDatabase admin
use blglib-db
db.mycollection.find()
db.getUsers()

sudo docker volume rm blglib_v10_mongodb-data

sudo docker network create net