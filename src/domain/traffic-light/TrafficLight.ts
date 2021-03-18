import Sequelize from 'sequelize';
import { TRAFFIC_LIGHT_STATUS } from '../../common/Constants';
import sequelize from '../../core/DatabaseConnection';

class TrafficLight extends Sequelize.Model {
  private id: number;
  private name: string;
  private coordinates: string;
  private lastStatus: string;

  beforePersist() {

  }

  getId() {
    return this.id;
  };

  setId(id) {
    this.id = id;
  };

  getName() {
    return this.name;
  };

  setName(name) {
    this.name = name;
  };

  getCoordinates() {
    return this.coordinates;
  };

  setCoordinates(coordinates) {
    this.coordinates = coordinates;
  };

  getLastStatus() {
    return this.lastStatus;
  };

  setLastStatus(lastStatus) {
    this.lastStatus = lastStatus;
  };
}

TrafficLight.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  coordinates: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastStatus: {
    type: Sequelize.ENUM({
      values: [TRAFFIC_LIGHT_STATUS.SAFE, TRAFFIC_LIGHT_STATUS.WAIT]
    }),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'TrafficLight',
  timestamps: true
});

export { TrafficLight };
