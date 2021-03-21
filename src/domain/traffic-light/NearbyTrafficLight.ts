import { TrafficLight } from './TrafficLight';

interface IDistanceMetadata {
  originAddress: string,
  destinationAddress: string,
  distance: string,
  duration: string
}

class NearbyTrafficLight {
  private trafficLight: TrafficLight;
  private metadata: IDistanceMetadata;

  constructor() {
  }

  setTrafficLight(trafficLight) {
    this.trafficLight = trafficLight;
    return this;
  }

  setMetadata(metadata) {
    this.metadata = metadata;
    return this;
  }

  getTrafficLight() {
    return this.trafficLight;
  }

  getMetadata() {
    return this.metadata;
  }

  build() {
    return this;
  }
}

export { NearbyTrafficLight };