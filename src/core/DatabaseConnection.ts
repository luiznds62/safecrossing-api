import environments from '../common/Environments';
import { Connection, createConnection } from 'typeorm';
import { User } from '../domain/user/User';
import { TrafficLight } from '../domain/traffic-light/TrafficLight';
import { InternalServerError } from './exception/InternalServerError';

class DatabaseConnection {
  connection: Connection;

  async createConnection(): Promise<void> {
    try {
      if(this.connection) {
        return;
      }
      this.connection = await createConnection({
        type: (<any>environments.DATABASE.TYPE),
        host: (<any>environments.DATABASE.HOST),
        port: (<any>environments.DATABASE.PORT),
        username: (<any>environments.DATABASE.USERNAME),
        password: (<any>environments.DATABASE.PASSWORD),
        database: (<any>environments.DATABASE.DATABASE),
        entities: [
          User,
          TrafficLight
        ],
        synchronize: (<any>environments.DATABASE.SYNCRONIZE)
      });
    } catch (e) {
      throw new InternalServerError();
    }
  }

}

export default new DatabaseConnection();