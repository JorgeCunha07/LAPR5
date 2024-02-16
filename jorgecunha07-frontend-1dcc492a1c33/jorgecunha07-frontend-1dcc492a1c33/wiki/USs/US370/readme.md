# US370 - LAP-20

## Inibir um robot

## 1. Requisitos

### 1.1. Critérios de aceitação do cliente

O estado do robot deve ser disabled

### 1.2 Caderno de encargos

N/A

### 1.3 Questões realizadas

Questão:

    Olá, 

    há a possibilidade de inibir um robo. No entanto, para além deste "estado" que outros estados pretende que existam? em funcionamento, ocupado, livre, a executar tarefa? Ou basta apenas inibido - desinibido?

Resposta:

    boa tarde,
    funcionalmente não existe esse conceito de "estado" que referes. poderá ser no entanto algo util em termos técnicos.
    de um ponto de vista funcional pretende-se que seja possivel inibir ou desinibr um robot e que essa informação seja devidamente utilizada nos restantes casos de uso. por exemplo, um robot inibido não pode executar tarefas.


### 1.4 Dependências

Esta User Story tem dependencia com a US360, uma vez que é necessário criar um robot para alterar o seu estado.

## 2. Análise

### 2.1 Robot

## 3. Design

### 3.1. Diagrama de sequência
### 3.1.1 Diagrama de Sequência Layer 1
![SD](./SD_1.png)
### 3.1.2 Diagrama de Sequência Layer 2
![SD](./SD_2.png)
### 3.1.3 Diagrama de Sequência Layer 3
![SD](./SD_3.png)

### 3.2. Diagrama de classes

![CD](./CD.svg)

### 3.3. Estrutura dos pedidos e das respostas

Pedido:
Sem body

Resposta:
200:
```json
{
    "robotCode": "exampleCode",
    "robotDescription": "exampleDescription",
    "robotNickname": "exampleNickname",
    "robotSerialNumber": "exampleSerialNumber",
    "robotTypeName": "robotTypeName",
    "enabled": "newState"

}
```
400:
```json
{
    "error": "Robot is already in the desired state"
}
```

### 3.4. Testes

## 4. Implementação

## 5. Integração

## 6. Observações