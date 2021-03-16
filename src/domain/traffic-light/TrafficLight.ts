import { IsDefined, Length } from 'class-validator';
import { Result } from '../../common/Result';
import { BasicEntity, IEntity } from '../../core/BasicEntity';

interface TrafficLightProps extends IEntity {
  name: string;
  coordinates: string;
  lastStatus: string;
}

class TrafficLight extends BasicEntity {
  static path: Object = { filename: 'traffic-lights.db' };

  @IsDefined()
  @Length(5, 30)
  private name: string;

  @IsDefined()
  private coordinates: string;

  @IsDefined()
  private lastStatus: string;

  constructor(props: TrafficLightProps) {
    super();
    if (props) {
      if (this.hasId(props)) {
        this.setId(props._id);
      }
      this.setName(props.name);
      this.setCoordinates(props.coordinates);
      this.setLastStatus(props.lastStatus);
    }
  }

  hasId(props) {
    return Object.keys(props).includes('_id');
  }

  setName = (name: string): TrafficLight => {
    this.name = name;
    return this;
  };

  getName = (): string => {
    return this.name;
  };

  setCoordinates = (coordinates: string): TrafficLight => {
    this.coordinates = coordinates;
    return this;
  };

  getCoordinates = (): string => {
    return this.coordinates;
  };

  setLastStatus = (lastStatus: string): TrafficLight => {
    this.lastStatus = lastStatus;
    return this;
  };

  getLastStatus = (): string => {
    return this.lastStatus;
  };

  beforePersist() {}

  public static async create(props: TrafficLightProps) {
    const trafficLight = new TrafficLight({ ...props });

    try {
      return Result.ok<TrafficLight>(await (<TrafficLight>(<unknown>this.validate(trafficLight))));
    } catch (error) {
      throw error;
    }
  }
}

export { TrafficLight };
