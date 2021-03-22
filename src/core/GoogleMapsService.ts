import { Client, DistanceMatrixRequest, TravelMode } from '@googlemaps/google-maps-services-js';
import environments from '../common/Environments';
import { Inject } from 'typescript-ioc';
import { TrafficLightService } from '../domain/traffic-light/TrafficLightService';
import { GOOGLE_MAPS_CONFIG } from '../common/Constants';
import { NearbyTrafficLight } from '../domain/traffic-light/NearbyTrafficLight';

class GoogleMapsService {
  @Inject
  private trafficLightService: TrafficLightService;
  private client: Client;

  constructor() {
    this.client = new Client();
  }

  getDistanceFromResponse(string) {
    return Number.parseFloat(string.split(" ")[0].replace(",","."));
  }

  private buildMetadata(data) {
    const metadata: any = {};
    metadata.originAddress = data.origin_addresses[0];
    metadata.destinationAddress = data.destination_addresses[0];
    metadata.distance = this.getDistanceFromResponse(data.rows[0].elements[0].distance.text);
    metadata.duration = data.rows[0].elements[0].duration.text;
    return metadata;
  }

  private buildRequestParams(origins,destinations) {
    return {
      params: {
        origins: origins,
        destinations: destinations,
        mode: TravelMode.walking,
        language: GOOGLE_MAPS_CONFIG.LANGUAGE,
        key: environments.GOOGLE_MAPS.API_KEY
      }
    };
  }

  async getTrafficLightsByCoordinate(coordinate): Promise<NearbyTrafficLight> {
    let nearbyTrafficLight = new NearbyTrafficLight();
    const trafficLights = await this.trafficLightService.find({});
    const origins = [coordinate];

    for (const trafficLight of trafficLights) {
      const destinations = [trafficLight.getCoordinates()];
      const distanceMatrixParams: DistanceMatrixRequest = this.buildRequestParams(origins, destinations);

      const { data } = await this.client.distancematrix(distanceMatrixParams);
      if (!nearbyTrafficLight.getMetadata()) {
        nearbyTrafficLight.setTrafficLight(trafficLight);
        nearbyTrafficLight.setMetadata(this.buildMetadata(data));
      } else {
        const newMetadata = this.buildMetadata(data);
        if (newMetadata.distance < nearbyTrafficLight.getMetadata().distance) {
          nearbyTrafficLight.setTrafficLight(trafficLight);
          nearbyTrafficLight.setMetadata(newMetadata);
        }
      }
    }

    return nearbyTrafficLight;
  }
}

export { GoogleMapsService };