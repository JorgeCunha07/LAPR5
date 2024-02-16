# US 150

## Criar um elevador

## 1. Requisitos

### 1.1. Critérios de aceitação do cliente

* O código é obrigatório e deverá ter, no máximo 5 caracteres, letras, digitos, onde pode conter espaçoes no meio.
* O nome do edificio é opcional, no máximo 50 caracteres alfanuméricos

### 1.2 Caderno de encargos


### 1.3 Questões realizadas

Questão:


  Boa tarde,

  Após análise do enunciado deparei-me com a coincidência: todos os edificios que têm elevador, este último serve todos os pisos desse edificio. Pode existir algum edifício em que o elevador não sirva todos os pisos?

  Cumprimentos,

Resposta:

  bom dia,
  sim, é possivel tal situação


### 1.4 Dependências

Esta User Story não tem nenhuma dependência a nenhuma outra

## 2. Análise

### 2.1 Edifício
```json
{
  "buildingFinderId": "A",
  "floors": [
    "0",
    "1",
    "2",
    "3"
  ],
  "location": {
    "x": 1,
    "y": 2
  }
}
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
{
  "buildingFinderId": "A",
  "floors": [
    "0",
    "1",
    "2",
    "3"
  ],
  "location": {
    "x": 1,
    "y": 2
  }
}
```

Estrutura das respostas
```json

```




### 3.4. Testes



## 4. Implementação
ElevatorController
```
public async createElevator(req: Request, res: Response, next: NextFunction) {
    try {
      const elevatorOrError = (await this.elevatorServiceInstance.createElevator(req.body as IElevatorDTO)) as Result<
        IElevatorDTO
      >;

      if (elevatorOrError.isFailure) {
        return res
          .status(400)
          .json(elevatorOrError.error)
          .send();
      }

      const elevatorDTO = elevatorOrError.getValue();
      return res.json(elevatorDTO).status(201);
    } catch (e) {
      console.error('Error in createElevator:', e);
      return next(e);
    }
  }
```

ElevatorService
```
  public async createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
    try {
      const elevatorOrError = await Elevator.create(elevatorDTO);
      const buildingCode = elevatorDTO.buildingFinderId;

      if (elevatorOrError.isFailure) {
        return Result.fail<IElevatorDTO>(elevatorOrError.errorValue());
      }

      const buildingDoesExit = await this.findBuilding(elevatorDTO.buildingFinderId);

      if (buildingDoesExit == null) {
        throw new Error('Building not found');
      }

      const dimensions: BuildingSize = buildingDoesExit.buildingSize;
      if (
        elevatorDTO.location.x < 0 ||
        elevatorDTO.location.x >= dimensions.width ||
        elevatorDTO.location.y < 0 ||
        elevatorDTO.location.y >= dimensions.length
      ) {
        return Result.fail<IElevatorDTO>('Elevator location is outside the building');
      }

      const buildingFloors = await this.findFloorsForBuilding(buildingCode);
      const floors = elevatorDTO.floors;
      for (const floor of floors) {
        if (!buildingFloors.some(existingFloor => existingFloor.floorNumber.toString() == floor)) {
          return Result.fail<IElevatorDTO>(`Floor ${floor} does not exist in the building`);
        }
      }

      const elevatorResult = elevatorOrError.getValue();
      await this.elevatorRepo.save(elevatorResult);
      const elevatorDTOResult = ElevatorMap.toDTO(elevatorResult) as IElevatorDTO;
      return Result.ok<IElevatorDTO>(elevatorDTOResult);
    } catch (e) {
      throw e;
    }
  }

```

## 5. Integração

## 6. Observações
