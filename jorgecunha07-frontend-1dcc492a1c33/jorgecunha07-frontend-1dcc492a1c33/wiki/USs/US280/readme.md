# US 160

## Editar um elevador

## 1. Requisitos

### 1.1. Critérios de aceitação do cliente

Editar um elevador pressupõe a existência de pelo menos um elevador .
No caso de existirem vários elevadors, o ator deve indicar qual o elevador que quer editar.

Observações: PUT/PATCH

Esta *user story* permite editar um elevador, isto é, a sua informação:

nome, descrição e dimensão máxima de cada piso em termos de células.

### 1.2 Caderno de encargos

"O mapa do campus descreve os elevadores existentes"

### 1.3 Questões realizadas



### 1.4 Dependências

Esta User Story tem dependência da User Story 150

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
public async updateElevator(req: Request, res: Response, next: NextFunction) {
    try {
      const elevatorOrError = (await this.elevatorServiceInstance.updateElevator(req.body as IElevatorDTO)) as Result<
        IElevatorDTO
      >;

      if (elevatorOrError.isFailure) {
        return res
          .status(400)
          .json(elevatorOrError.error)
          .send();
      }

      const elevatorDTO = elevatorOrError.getValue();
      return res.status(200).json(elevatorDTO);
    } catch (e) {
      return next(e);
    }
  }

```

ElevatorService
```
public async updateElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
    try {
      const elevator = await this.elevatorRepo.findByCode(elevatorDTO.buildingFinderId);

      if (elevator === null) {
        return Result.fail<IElevatorDTO>('Elevator not found');
      } else {
        if (Array.isArray(elevatorDTO.floors)) {
          const { floors } = elevator.props.floorsList.props;
          while (floors.length > 0) {
            floors.pop();
          }
          elevatorDTO.floors.forEach(floor => {
            floors.push(floor);
          });
        }
        await this.elevatorRepo.update(elevator);

        const elevatorDTOResult = ElevatorMap.toDTO(elevator) as IElevatorDTO;
        return Result.ok<IElevatorDTO>(elevatorDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

```
## 5. Integração

## 6. Observações
