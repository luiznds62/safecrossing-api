import 'reflect-metadata';
import { Mapper } from '../../core/Mapper';
import { TrafficLight } from '../../domain/traffic-light/TrafficLight';

export interface TrafficLightDto {
  _id: string;
  name: string;
  coordinates: string;
  lastStatus: string;
}

export class TrafficLightMap extends Mapper<TrafficLight> {
  toDomain(raw: any): Promise<TrafficLight> {
    return TrafficLight.create({
      _id: raw._id,
      name: raw.name,
      coordinates: raw.coordinates,
      lastStatus: raw.lastStatus
    })
      .then((result) => {
        return result.isSuccess ? result.getValue() : null;
      })
      .catch((error) => {
        throw error;
      });
  }

  toDTO(t: TrafficLight): TrafficLightDto {
    return {
      _id: t.getId(),
      name: t.getName(),
      coordinates: t.getCoordinates(),
      lastStatus: t.getLastStatus()
    };
  }
}
