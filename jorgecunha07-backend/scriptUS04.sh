#!/bin/bash

# Variables
SCRIPTBACKUP="script.sh"
MES=$(date +%m)
DIA=$(date +%d)
DIADESEMANA=$(date +%w)
NUMEROSEMANA=$(date +%U)
ANO=$(date +%Y)
ANOPASSADO=$(date --date="-1 year" +"%Y")
DBNAME="testDB_"
search_dir="/home/asist/projeto/asistdb"

# Backup Monthly (last year)
if [ "$DIA" -eq "10" ]
then
    echo "Backup mensal feito."
    logger -p local0.info "Backup mensal feito hoje."
    sh "$SCRIPTBACKUP"
fi

# Backup Weekly (last month) and Daily (last week)
if [ "$MES" -eq "12" ]
then
    # Verifica se é domingo e executa o backup se for
    if [ "$DIADESEMANA" -eq "0" ]; then
    	echo "Backup semanal feito."
        logger -p local0.info "Backup semanal feito este mes."
        sh "$SCRIPTBACKUP"
    fi

    # Verifica se o número da semana atual é maior ou igual a 52 e executa o backup se verdadeiro
    if [ "$NUMEROSEMANA" -ge 52 ]; then
        echo "Backup diário feito."
        logger -p local0.info "Backup diário feito esta semana."
        sh "$SCRIPTBACKUP"
    fi
fi

AUX=0
for entry in "$search_dir"/*
do
    # Extract day and month from filename
    IFS="/"
    read -ra arr1 <<< "$entry"
    last_index="${arr1[-1]}"
    echo "$last_index"		
    if grep -q '^testDB' <<< "$last_index"
    then
        echo "$last_index"
        data_part=${last_index#*_}
        # Definir índice e comprimento para a data
        index=0  # Posição inicial da data na string
        t=8      # Comprimento da data (8 caracteres)

        # Extrair a substring correspondente à data
        dia_ficheiro=${data_part:$index:$t}

        # Utilizar o comando date para obter dados específicos da data
        dia=$(date -d "$dia_ficheiro" +%d)           # Dia
        mes=$(date -d "$dia_ficheiro" +%m)           # Mês
        ano=$(date -d "$dia_ficheiro" +%Y)           # Ano
        numerosemana=$(date -d "$dia_ficheiro" +%U) # Número da semana
        diadesemana=$(date -d "$dia_ficheiro" +%w)    # Dia da semana (0 a 6, onde 0 é domingo)
        
        if ! (
            [ "$dia" -eq "10" ] ||                        # Backup mensal no dia 10 de cada mês
            ( [ "$mes" -eq "12" ] && [ "$diadesemana" -eq "0" ] ) ||  # Backup nos domingos de dezembro
            ( [ "$mes" -eq "12" ] && [ "$numerosemana" -ge 52 ] )     # Backup na última semana de dezembro
        )
        then
            # Calcula a diferença de tempo em dias
            #diferenca_dias=$(expr $(date -d "$ANO-$MES-$DIA" +%s) - $(date -d "$ano-$mes-$dia" +%s) / 86400)
            diferenca_dias=$(expr \( $(date -d "$ANO-$MES-$DIA" +%s) - $(date -d "$ano-$mes-$dia" +%s) \) / 86400)
            echo "$ANO-$MES-$DIA"
            echo "$ano-$mes-$dia"
            echo "$diferenca_dias"
            echo "Remover"
            # Verifica se a diferença de tempo é maior que 7 dias
            if [ $diferenca_dias -gt 7 ]
            then
                echo "$dia_ficheiro"
                cd /home/asist/projeto/asistdb/
                rm "$DBNAME$dia_ficheiro.tar"
                AUX=1
            fi
        fi
    else	
        echo "O objeto nao é um backup file"
    fi
done

if [ "$AUX" -eq "1" ]
then
    cd /home/asist/projeto/asistdb/
    git add .
    git commit -m "Remoção do ficheiros que não cumprem a validade de 7 dias."
    git push origin
fi
