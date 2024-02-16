# US 210

## Listar pisos edificio

## 1. Requisitos

### 1.1. Critérios de aceitação do cliente

*

### 1.2 Caderno de encargos


### 1.3 Questões realizadas
* Não foram realizadas questões

### 1.4 Dependências

Esta User Story assume que ja estão criados tanto os buildings como o floor

## 2. Análise

### 2.1 Floor
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


### 3.3. Estrutura dos pedidos e das respostas
Estrutura dos pedidos
```postman request

http://localhost:4000/api/floors/buildingFinderId=B
```

Estrutura das respostas
```json
[
  {
    "id": "653e843852a80c4a32a142da",
    "buildingFinderId": "B",
    "floorNumber": 0,
    "floorDescription": "Description of the floor",
    "floorMap": [
      [
        "R1C1",
        "R1C2",
        "R1C3"
      ],
      [
        "R2C1",
        "R2C2",
        "R2C3"
      ],
      [
        "R3C1",
        "R3C2",
        "R3C3"
      ]
    ],
    "floorMaxDimensions": {
      "width": 3,
      "length": 3
    }
  }
]
```




### 3.4. Testes

## 4. Implementação
FloorController
```
  public async getFloorsByBuildingFinderId(param1: string, req: Request, res: Response, next: NextFunction) {
    try {
      const floorOrError = await this.floorServiceInstance.getFloorsByBuildingFinderId(param1);
      if (floorOrError == null) {
        return res
          .status(402)
          .json('Building without Floors.')
          .send();
      }
      return res.json(floorOrError).status(201);
    } catch (e) {
      return next(e);
    }
  }
```

FloorgService
```
  public async getFloorsByBuildingFinderId(param1: string): Promise<Array<IFloorDTO>> {
    try {
      const floors = await this.floorRepo.findFloorsObjectByBuilding(param1);

      if (floors === null) {
        throw new Error('Floors of building:' + param1 + ' not found.');
      } else {
        return floors;
      }
    } catch (e) {
      throw e;
    }
  }

```

## 5. Integração

## 6. Observações
