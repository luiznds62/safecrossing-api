import { BasicRepository } from './BasicRepository';
import { BasicPage } from './BasicPage';

export abstract class BasicService<R extends BasicRepository<T>, T> {
  repository: R;

  constructor(repository: R) {
    this.repository = repository;
  }

  findAll(offset: number, limit: number, sort: string): Promise<BasicPage<T>> {
    return this.repository.findAll(offset, limit, sort);
  }

  find(query): Promise<T[]> {
    return this.repository.find(query);
  }

  findOne(query): Promise<T> {
    return this.repository.findOne(query);
  }

  findById(id): Promise<T> {
    return this.repository.findById(id);
  }

  create(model): Promise<T> {
    return this.repository.create(model);
  }

  merge(id, model): Promise<T> {
    return this.repository.merge(id, model);
  }

  delete(model): Promise<T> {
    return this.repository.delete(model);
  }
}
