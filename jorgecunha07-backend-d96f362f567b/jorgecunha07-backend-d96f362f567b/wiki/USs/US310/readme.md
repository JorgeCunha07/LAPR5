# US 150

## Criar uma sala

## 1. Requisitos

### 1.1. Critérios de aceitação do cliente



### 1.2 Caderno de encargos



### 1.3 Questões realizadas


### 1.4 Dependências

Esta User Story depende da Uer Story de criação de Floors

## 2. Análise

### 2.1 Sala
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
```
```
## 4. Implementação
RoomController
```
public async createRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const roomOrError = (await this.roomServiceInstance.createRoom(req.body as IRoomDTO)) as Result<IRoomDTO>;

      if (roomOrError.isFailure) {
        return res
          .status(400)
          .json(roomOrError.error)
          .send();
      }

      const roomDTO = roomOrError.getValue();
      return res.json(roomDTO).status(201);
    } catch (e) {
      console.error('Error in createRoom:', e);
      return next(e);
    }
  }
```

RoomService
```
public async createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>> {
    try {
      const roomOrError = await Room.create(roomDTO);

      if (roomOrError.isFailure) {
        return Result.fail<IRoomDTO>(roomOrError.errorValue());
      }

      const floor = await this.iFloorService.findFloorByBuildingCodeFloorNumber(
        roomDTO.buildingFinderId,
        roomDTO.floorNumber,
      );

      if (floor == null) {
        throw new Error('Could not find floor ');
      }

      const roomResult = roomOrError.getValue();
      await this.roomRepo.save(roomResult);

      const roomDTOResult = RoomMap.toDTO(roomResult) as IRoomDTO;
      return Result.ok<IRoomDTO>(roomDTOResult);
    } catch (e) {
      throw e;
    }
  }

```

## 5. Integração

## 6. Observações
