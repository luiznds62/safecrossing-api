import { BasicEntity } from './BasicEntity';
import { EventEmitter } from 'events';
import { BasicPage } from './BasicPage';
import { getConnection, getRepository, Repository } from 'typeorm';
import databaseConnection from './DatabaseConnection';
import { InternalServerError } from './exception/InternalServerError';

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
  model;

  constructor(model) {
    super();
    this.model = model;

    this.on('beforePersist', (model) => {
      model.beforePersist(model);
    });

    if (!databaseConnection.connection) {
      databaseConnection.createConnection().then(() => {
        this.db = getConnection().getRepository(model);
      }).catch(err => {
        throw new InternalServerError();
      });
    } else {
      this.db = getRepository(model);
    }
  }


  async findAll(offset: number, limit: number, sort: string): Promise<BasicPage<T>> {
    return new Promise((resolve, reject) => {
      const skip = offset * limit;
      // this.db
      //   .find({})
      //   .skip(skip)
      //   .limit(limit)
      //   .sort(sort)
      //   .exec((err, docs) => {
      //     if (err) reject(err);
      //
      //     this.db.count({}).exec((err, count) => {
      //       const page = new BasicPage<T>()
      //         .setContent(docs.map((doc) => new this.model(doc)))
      //         .setTotal(Number(count))
      //         .setHasNext(skip + docs.length < Number(count))
      //         .build();
      //
      //       resolve(page);
      //     });
      //   });
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
