#!/bin/sh
#git pull origin
FICHEIRO_AUTH="testDB_"$(date +"%Y%m%d")".tar"
# Diretório para o backup original do MongoDB
LOCALIZACAO_AUTH="dump"
# Diretório para o novo backup do MongoDB
DIR_MONGO_NOVO="dump2"
# Diretório para o backup do PostgreSQL
DIR_PG="pg_dump"


mongodump --uri="mongodb://vsgate-s1.dei.isep.ipp.pt:10819" -u mongoadmin -p fa54150af5d9d3bd118de1bc --out=$DIR_MONGO_ORIGINAL
mongodump --uri="mongodb://vsgate-s1.dei.isep.ipp.pt:11308" -u mongoadmin -p 0ba7af6ef8e5870720f23a37 --out=$DIR_MONGO_NOVO

# Cria um diretório para o backup do PostgreSQL
mkdir -p $DIR_PG

# Backup de todo o cluster PostgreSQL
export PGPASSWORD="J6RjfaiVErTj"
pg_dumpall -h vsgate-s1.dei.isep.ipp.pt -p 11186 -U postgres > $DIR_PG/all_databases.sql

tar zcvf $FICHEIRO_AUTH $LOCALIZACAO_AUTH $DIR_MONGO_NOVO $DIR_PG
rm -r $LOCALIZACAO_AUTH

mv $FICHEIRO_AUTH /home/asist/projeto/asistdb/

cd /home/asist/projeto/asistdb/
git add $FICHEIRO_AUTH
git commit -m "Backup de $(date)"
git push origin
