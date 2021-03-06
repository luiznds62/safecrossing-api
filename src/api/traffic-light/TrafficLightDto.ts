import 'reflect-metadata';
import { Mapper } from '../../core/Mapper';
import { TrafficLight } from '../../domain/traffic-light/TrafficLight';

export interface TrafficLightDto {
  id: number;
  name: string;
  alias: string;
  coordinates: string;
  lastStatus: string;
}

export class TrafficLightMap extends Mapper<TrafficLight> {
  toDomain(raw: any): TrafficLight {
    return TrafficLight.build({
      id: raw.id,
      name: raw.name,
      alias: raw.alias,
      coordinates: raw.coordinates,
      lastStatus: raw.lastStatus
    })
  }

  toDTO(t: TrafficLight): TrafficLightDto {
    return {
      id: t.getId(),
      name: t.getName(),
      alias: t.getAlias(),
      coordinates: t.getCoordinates(),
      lastStatus: t.getLastStatus()
    };
  }
}
