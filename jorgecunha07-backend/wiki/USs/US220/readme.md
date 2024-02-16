# US 220

## Listar pisos de edifício com passagem para outros edifícios

## 1. Requisitos

### 1.1. Critérios de aceitação do cliente

* Todos os pisos e edificios foram listados

### 1.3 Questões realizadas

Questão:

  Boa noite,

  Relativamente a esta funcionalidade do sistema, seria expectável incluir informação relativa a onde a(s) passagem(ns) de cada piso vão ter; ou o pretendido é simplesmente ser possível saber quais dos pisos de um dado edifício possuem passagens para outros?

Resposta:

bom dia,
esta listagem deve mostrar a informação sobre o piso (edificio, piso, descrição) e a que outros edificios/pisos tem passagem

### 1.4 Dependências

  Para listar uma passagem, precisamos de ter as passagens e edifícios em causa criados anteriormente e com menção aos pisos.

## 2. Análise

### 2.1 Passagem

## 3. Design

### 3.1. Diagrama de Sequência

### 3.1.1 Diagrama de Sequência Layer 1
![SD](./SD_1.png)
### 3.1.2 Diagrama de Sequência Layer 2
![SD](./SD_2.png)
### 3.1.3 Diagrama de Sequência Layer 3
![SD](./SD_3.png)


### 3.2. Estrutura dos pedidos e das respostas
Estrutura dos pedidos
no body

Estrutura das respostas
```json
[
    {
        "buildingACode": "A",
        "buildingBCode": "B",
        "floorA": 0,
        "floorB": 0,
        "locationA": {
            "x": 3,
            "y": 1
        },
        "locationB": {
            "x": 3,
            "y": 1
        }
    },
    {
        "buildingACode": "A",
        "buildingBCode": "B",
        "floorA": 1,
        "floorB": 2,
        "locationA": {
            "x": 3,
            "y": 1
        },
        "locationB": {
            "x": 3,
            "y": 1
        }
    },
]
```

### 3.3. Testes
```

```

## 4. Integração
## 5. Observações
