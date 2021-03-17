import { BasicEntity } from './BasicEntity';
import { EventEmitter } from 'events';
import { BasicPage } from './BasicPage';
import { getRepository, Repository } from 'typeorm';

interface IRepository<T> {
  findAll(offset: number, limit: number, sort: string): Promise<BasicPage<T>>;

  findById(id);

  find(query): Promise<T[]>;

  findOne(query): Promise<T>;

  create(model: T);

  merge(id, model: T);

  delete(id);
}

export abstract class BasicRepository<T extends BasicEntity> extends EventEmitter implements IRepository<T> {
  db: Repository<T>;

  constructor(model) {
    super();
    this.db = getRepository(model);

    this.on('beforePersist', (model) => {
      model.beforePersist(model);
    });
  }

  async findAll(offset: number, limit: number, sort: string, filter?: string): Promise<BasicPage<T>> {
    return new Promise(async (resolve, reject) => {
      const skip = offset * limit;
      const count = await this.db.count({});
      const content = await this.db.createQueryBuilder('content')
        .where(filter)
        .offset(skip)
        .limit(limit)
        .orderBy(sort)
        .getMany();

      const page = new BasicPage<T>()
        .setContent(content)
        .setTotal(Number(count))
        .setHasNext(skip + content.length < Number(count))
        .build();

      resolve(page);
    });
  }

  findOne(query): Promise<T> {
    return new Promise((resolve, reject) => {
      resolve(this.db.findOne(query));
    });
  }

  find(query): Promise<T[]> {
    return new Promise((resolve, reject) => {
      resolve(this.db.find(query));
    });
  }

  findById(_id): Promise<T> {
    return new Promise((resolve, reject) => {
      resolve(this.db.findOne({ _id: _id }));
    });
  }

  create(model): Promise<T> {
    return new Promise(async (resolve, reject) => {
      try {
        this.emit('beforePersist', model);
        const persisted = await this.db.save(model);
        resolve(persisted);
      } catch (e) {
        reject(e);
      }
    });
  }

  merge(_id, model): Promise<T> {
    return new Promise(async (resolve, reject) => {
      try {
        const fromDb = await this.db.findOne({ _id: _id });
        this.db.merge(fromDb, model);
        resolve(this.db.save((<any>fromDb)));
      } catch (e) {
        reject(e);
      }
    });
  }

  delete(entity: T): Promise<T> {
    return new Promise((resolve, reject) => {
      resolve(this.db.remove(entity, {}));
    });
  }
}
