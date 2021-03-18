import { Sequelize } from 'sequelize';
import environments from '../common/Environments';

const sequelize = new Sequelize(environments.DATABASE.DATABASE, environments.DATABASE.USERNAME, environments.DATABASE.PASSWORD, {
  host: environments.DATABASE.HOST,
  dialect: (<any>environments.DATABASE.TYPE),
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export const openConnection = () => {
  return sequelize.authenticate();
};

export default sequelize;