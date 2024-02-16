# US 150

## Listar um elevador de um edifício

## 1. Requisitos

### 1.1. Critérios de aceitação do cliente



### 1.2 Caderno de encargos



### 1.3 Questões realizadas



### 1.4 Dependências

Esta User Story depende da criação tanto de elevadores como de edificios

## 2. Análise

### 2.1 Edifício
```json

```
## 3. Design

### 3.1. Diagrama de Sequência

### 3.1.1 Diagrama de Sequência Layer 1
![SD](ModuloGestaoCampus/SD_1.svg)
### 3.1.2 Diagrama de Sequência Layer 2
![SD](ModuloGestaoCampus/SD_2.svg)
### 3.1.3 Diagrama de Sequência Layer 3
![SD](ModuloGestaoCampus/SD_3.svg)

### 3.2. Diagrama de classes



### 3.3. Estrutura dos pedidos e das respostas
Estrutura dos pedidos
```json

```

Estrutura das respostas
```json


```




### 3.4. Testes



## 4. Implementação
ElevatorController
```
  public async getElevatorsByBuilding(param1: string, req: Request, res: Response, next: NextFunction) {
    try {
      const elevatorsOrError = await this.elevatorServiceInstance.getElevatorsByBuilding(param1);
      if (elevatorsOrError == null) {
        return res
          .status(402)
          .json('Building without Elevators.')
          .send();
      }
      return res.json(elevatorsOrError).status(201);
    } catch (e) {
      return next(e);
    }
  }
```

ElevatorService
```
  public async getElevatorsByBuilding(param1: string): Promise<Array<IElevatorDTO>> {
    try {
      const elevators = await this.elevatorRepo.findElevatorsObjectByBuilding(param1);
      if (elevators === null) {
        throw new Error('Floors of building:' + param1 + ' not found.');
      } else {
        return elevators;
      }
    } catch (e) {
      throw e;
    }
  }

```

## 5. Integração

## 6. Observações
