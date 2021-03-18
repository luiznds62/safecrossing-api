import { EventEmitter } from 'events';
import { BasicPage } from './BasicPage';
import sequelize from 'sequelize';

interface IRepository<T> {
  findAll(offset: number, limit: number, sort: string): Promise<BasicPage<T>>;

  findById(id);

  find(query): Promise<T[]>;

  findOne(query): Promise<T>;

  create(model: T);

  merge(id, model: T);

  delete(id);
}

export abstract class BasicRepository<T> extends EventEmitter implements IRepository<T> {
  db;

  constructor(model) {
    super();
    this.db = model;

    this.on('beforePersist', (model) => {
      model.beforePersist(model);
    });
  }

  async count(where) {
    return this.db.count({ where: where });
  }

  async findAll(offset: number, limit: number, sort: string, filter?: string): Promise<BasicPage<T>> {
    return new Promise(async (resolve, reject) => {
      try {
        const sortOptions = sort ? sequelize.literal(sort) : null;
        const skip = offset * limit;
        const count = await this.count({});
        const content = await this.db.findAll({ offset: skip, limit: limit, order: sortOptions });

        const page = new BasicPage<T>()
          .setContent(content)
          .setTotal(Number(count))
          .setHasNext(skip + content.length < Number(count))
          .build();

        resolve(page);
      } catch (e) {
        reject(e);
      }
    });
  }

  findOne(query): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.db.findOne({ where: query }));
      } catch (e) {
        reject(e);
      }
    });
  }

  find(query): Promise<T[]> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.db.find({ where: query }));
      } catch (e) {
        reject(e);
      }
    });
  }

  findById(_id): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.db.findOne({
          where: {
            id: _id
          }
        }));
      } catch (e) {
        reject(e);
      }
    });
  }

  create(model): Promise<T> {
    return new Promise(async (resolve, reject) => {
      try {
        this.emit('beforePersist', model);
        const persisted = await this.db.create(model.dataValues);
        resolve(persisted);
      } catch (e) {
        reject(e);
      }
    });
  }

  merge(_id, model): Promise<T> {
    return new Promise(async (resolve, reject) => {
      try {
        delete model.dataValues['id'];
        await this.db.update(model.dataValues, {
          where: {
            id: _id
          }
        });

        resolve(this.findById(_id));
      } catch (e) {
        reject(e);
      }
    });
  }

  delete(entity: T): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.db.destroy({
          where: {
            id: (<any>entity).id
          }
        }));
      } catch (e) {
        reject(e);
      }
    });
  }
}
