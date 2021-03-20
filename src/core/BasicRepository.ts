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
  public db;

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
    const sortOptions = sort ? sequelize.literal(sort) : null;
    const skip = offset * limit;
    const count = await this.count({});
    const content = await this.db.findAll({ offset: skip, limit: limit, order: sortOptions });

    const page = new BasicPage<T>()
      .setContent(content)
      .setTotal(Number(count))
      .setHasNext(skip + content.length < Number(count))
      .build();

    return page;
  }

  findOne(query): Promise<T> {
    return this.db.findOne({ where: query });
  }

  find(query): Promise<T[]> {
    return this.db.findAll({ where: query });
  }

  findById(_id): Promise<T> {
    return this.db.findOne({
      where: {
        id: _id
      }
    });
  }

  async create(model): Promise<T> {
    this.emit('beforePersist', model);
    const persisted = await this.db.create(model.dataValues);
    return persisted;
  }

  async merge(_id, model): Promise<T> {
    delete model.dataValues['id'];
    await this.db.update(model.dataValues, {
      where: {
        id: _id
      }
    });

    return this.findById(_id);
  }

  delete(entity: T): Promise<T> {
    return this.db.destroy({
      where: {
        id: (<any>entity).id
      }
    });
  }
}
