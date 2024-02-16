import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import IFloorMapDTO from "../../dto/IFloorMapDTO";

interface FloorMapProps {
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


export default class FloorMap extends ValueObject<FloorMapProps> {
  get value(): FloorMapProps {
    return this.props;
  }

  get maze(): IMaze | null {
    return this.props.maze;
  }

  get ground(): IGround | null {
    return this.props.ground;
  }

  get wall(): IWall | null {
    return this.props.wall;
  }

  get passageway(): IPassageway | null {
    return this.props.passageway;
  }

  get elevator(): IElevators | null {
    return this.props.elevator;
  }

  get door(): IDoor | null {
    return this.props.door;
  }

  get player(): IPlayer | null {
    return this.props.player;
  }
  get passagewayList(): PassagewayDTO[] | null {
    return this.props.passageways;
  }
  get elevatorFloors(): ElevatorFloorsDTO | null {
    return this.props.elevatorFloors;
  }

  private constructor(props: FloorMapProps) {
    super(props);
  }

  public static create(floorMapDTO: IFloorMapDTO): Result<FloorMap> {
    if (!floorMapDTO) {
      return Result.ok<FloorMap>(new FloorMap({
        maze: null,
        ground: null,
        wall: null,
        passageway:null,
        elevator: null,
        door: null,
        player: null,
        elevatorFloors:null,
        passageways:null,
      }));
    } else {
      return Result.ok<FloorMap>(new FloorMap({
        maze: floorMapDTO.maze,
        ground: floorMapDTO.ground,
        wall: floorMapDTO.wall,
        passageway:floorMapDTO.passageway,
        elevator: floorMapDTO.elevator,
        door: floorMapDTO.door,
        player: floorMapDTO.player,
        elevatorFloors:floorMapDTO.elevatorFloors,
        passageways:floorMapDTO.passageways,
      }));
    }
  }


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
