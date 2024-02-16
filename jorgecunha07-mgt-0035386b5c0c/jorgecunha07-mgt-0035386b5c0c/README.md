# MGT - APPLICATION FOR TASK MANAGEMENT

docker run -d --name postgresCont -p 5432:5432 -e POSTGRES_PASSWORD=pass123 postgres

docker run -d -p 27017:27017 --name=mongo-arqsi mongo:latest