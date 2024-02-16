#!/bin/bash

# Configurações
BACKUP_DIR="/backup"
APP_DIR="/backend"
DB_NAME="robodronegoDB"
REMOTE_HOST="root@10.9.10.76" # Substitua pelo endereço IP ou nome do host remoto
REMOTE_DIR="/remote/backup/directory" # Substitua pelo diretório de backup no servidor remoto
TIMESTAMP=$(date +"%Y%m%d%H%M")
APP_BACKUP_FILE="$BACKUP_DIR/robodronego_$TIMESTAMP.tar.gz"
DB_BACKUP_FILE="$BACKUP_DIR/robodronegoDB_$TIMESTAMP.gz"

# Backup da Aplicação robodronego
echo "Iniciando backup da aplicação robodronego..."
tar -czf $APP_BACKUP_FILE $APP_DIR
echo "Backup da aplicação concluído: $APP_BACKUP_FILE"

# Backup do Banco de Dados MongoDB
echo "Iniciando backup do banco de dados MongoDB..."
mongodump --db $DB_NAME --archive=$DB_BACKUP_FILE --gzip
echo "Backup do banco de dados concluído: $DB_BACKUP_FILE"

# Transferindo Backup para o Servidor Remoto
echo "Transferindo backup para o servidor remoto..."
scp $APP_BACKUP_FILE $REMOTE_HOST: $REMOTE_DIR
scp $DB_BACKUP_FILE $REMOTE_HOST: $REMOTE_DIR
echo "Transferência concluída."

# Fim do Script
echo "Backup de robodronego completo."
