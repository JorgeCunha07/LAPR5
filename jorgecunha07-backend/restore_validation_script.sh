#!/bin/bash

# Caminho para a pasta de backups
REPOSITORIO="/home/asist/projeto/asistdb/"

# Encontra o ficheiro mais recente na pasta de backups
NOME_BACKUP=$(ls -t "$REPOSITORIO" | head -n1)

# Local onde os backups são restaurados
LOCAL_RESTORE="restore/"
RESTORE_OBJECT=/home/asist/projeto/asistdb/restore/dump/test/buildings.bson

# Clone do repositório para garantir a obtenção dos backups mais recentes
cd $REPOSITORIO
#git pull origin

echo "$NOME_BACKUP"
# Verifica se o backup está disponível no repositório
if [ -f "$NOME_BACKUP" ]
then
    # Cria diretório para restauração, descompacta o backup e restaura a base de dados
    mkdir $LOCAL_RESTORE
    tar zxvf $NOME_BACKUP -C $LOCAL_RESTORE
    mongorestore --uri="mongodb://vsgate-s1.dei.isep.ipp.pt:10819" -u mongoadmin -p fa54150af5d9d3bd118de1bc --drop --dir=$RESTORE_OBJECT

    # Executa uma query para validar a integridade dos dados após a reposição
    mongo --host vsgate-s1.dei.isep.ipp.pt:10819 --authenticationDatabase admin -u mongoadmin -p fa54150af5d9d3bd118de1bc test --eval "db.buildings.find().limit(1)"

    # Captura o código de saída do comando anterior
    exit_code=$?

    # Verifica se a execução foi bem-sucedida (código de saída 0)
    if [ $exit_code -eq 0 ]
    then
        echo "Validação bem-sucedida."
    else
        echo "Erro na validação."
    fi


    # Limpa o diretório de restauração
    rm -r $LOCAL_RESTORE
else
    echo "Backup não encontrado."
fi