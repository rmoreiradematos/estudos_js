docker run \
  --name postgresHeroes \
  -e POSTGRES_USER=rodrigomatos \
  -e POSTGRES_PASSWORD="root123" \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres

docker logs postgresHeroes
docker exec -it postgresHeroes psql --username rodrigomatos --dbname heroes
CREATE TABLE warriors(id SERIAL PRIMARY KEY, name VARCHAR(255) not null);


docker run \
  --name mongodbHeroes \
  -e MONGO_INITDB_ROOT_USERNAME=rodrigomatos \
  -e MONGO_INITDB_ROOT_PASSWORD="root123" \
  -p 27017:27017 \
  -d \
  mongo:4
docker logs mongodbHeroes