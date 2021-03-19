import Sequelize, { Model } from 'sequelize';
import sequelize from '../../core/DatabaseConnection';
import { logger } from '../../common/Logger';
import { BCRYPT } from '../../common/Constants';
import bcrypt from 'bcryptjs';

class User extends Model {
  private id: number;
  private name: string;
  private email: string;
  private password: string;

  beforePersist() {
    try {
      this.password = bcrypt.hashSync(this.password, BCRYPT.SALTED_ROUND);
    } catch (e) {
      logger.error(e);
    }
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email) {
    this.email = email;
  }

  getPassword() {
    return this.password;
  }

  setPassword(password) {
    this.password = password;
  }
}

User.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [5, 50],
        msg: '[O nome deve possuir de 5 a 50 caractéres]'
      },
      notNull: {
        msg: '[O nome deve ser informado]'
      }
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: '[E-mail inválido]'
      },
      notNull: {
        msg: '[O e-mail deve ser informado]'
      }
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [5, 20],
        msg: '[A senha deve possuir de 5 a 20 caractéres]'
      },
      notNull: {
        msg: '[A senha deve ser informada]'
      }
    }
  }
}, {
  sequelize,
  modelName: 'User',
  timestamps: true
});

export { User };
