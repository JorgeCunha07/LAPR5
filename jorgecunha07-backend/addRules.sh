#!/bin/bash iptables -F
filename='rules.txt'
while read line; do
IFS=';' read -r -a ARRAY <<< "$line"
if [ "${ARRAY[2]}" = "DROP" ]; then
iptables -A INPUT -p tcp -s ${ARRAY[0]} --dport ${ARRAY[1]} -j ${ARRAY[2]}
else
iptables -I INPUT -p tcp -s ${ARRAY[0]} --dport ${ARRAY[1]} -j ${ARRAY[2]}
fi
done < $filename
iptables-save