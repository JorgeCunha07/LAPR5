export default interface IFloorDTO {
    buildingFinderId: string;
    floorNumber: number;
    floorDescription: string;
    floorMap?: IFloorMap;
    floorMaxDimensions: {
        width: number;
        length: number;
    };
}
  interface IFloorMap {
  maze: IMaze;
  ground: IGround;
  wall: IWall;
  passageway: IPassageway;
  elevator: IElevators;
  door: IDoor;
  player: IPlayer;
  elevatorFloors: ElevatorFloorsDTO;
  passageways: PassagewayDTO[];
}

interface IWall  {
  segments: {
    width: number;
    height: number;
  };
  primaryColor: string;
  maps: IMaps;
  wrapS: number;
  wrapT: number;
  repeat: {
    u: number;
    v: number;
  };
  magFilter: number;
  minFilter: number;
  secondaryColor: string;
}

interface IPassageway  {
  segments: {
    width: number;
    height: number;
  };
  primaryColor: string;
  maps: IMaps;
  wrapS: number;
  wrapT: number;
  repeat: {
    u: number;
    v: number;
  };
  magFilter: number;
  minFilter: number;
  secondaryColor: string;
}
interface IElevators  {
  segments: {
    width: number;
    height: number;
  };
  primaryColor: string;
  maps: IMaps;
  wrapS: number;
  wrapT: number;
  repeat: {
    u: number;
    v: number;
  };
  magFilter: number;
  minFilter: number;
  secondaryColor: string;
}

interface IDoor  {
  segments: {
    width: number;
    height: number;
  };
  primaryColor: string;
  maps: IMaps;
  wrapS: number;
  wrapT: number;
  repeat: {
    u: number;
    v: number;
  };
  magFilter: number;
  minFilter: number;
  secondaryColor: string;
}

interface IMaze {
  size: {
    width: number;
    depth: number;
  };
  map: number[][];
  exitLocation: number[];
}


interface IGround  {
  size: {
    width: number;
    height: number;
    depth: number;
  };
  segments: {
    width: number;
    height: number;
    depth: number;
  };
  primaryColor: string;
  maps: IMaps;
  wrapS: number;
  wrapT: number;
  repeat: {
    u: number;
    v: number;
  };
  magFilter: number;
  minFilter: number;
  secondaryColor: string;
}

interface IMaps {
  color: IColorTexture;
  ao: IAoTexture;
  displacement: IDisplacementTexture;
  normal: INormalTexture;
  bump: IBumpTexture;
  roughness: IRoughnessTexture;
}

interface IColorTexture {
  url: string;
}

interface IAoTexture {
  url: string;
  intensity: number;
}

interface IDisplacementTexture {
  url: string;
  scale: number;
  bias: number;
}

interface INormalTexture {
  url: string;
  type: number;
  scale: IScaleMatrix;
}

interface IBumpTexture {
  url: string;
  scale: number;
}

interface IRoughnessTexture {
  url: string;
  rough: number;
}

interface IScaleMatrix {
  x: number;
  y: number;
}

interface IPlayer {
  initialPosition: number[];
  initialDirection: number;
}

interface ElevatorFloorsDTO {
  floors: string[];
  positionWhenLeavingElevator: number[];
}

interface PassagewayDTO {
  floor: string[];
  location: number[];
  locationOnExit: number[];
}
