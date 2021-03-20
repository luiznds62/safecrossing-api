import { User } from '../../../src/domain/user/User';
import { UserRepository } from '../../../src/domain/user/UserRepository';
import { USER_CONSTS } from './UserTestUtils';

describe('UserRepository', () => {
  (<any>User).beforePersist = () => {
    return User.build(USER_CONSTS.userProps);
  };
  (<any>User).findOne = () => {
    return User.build(USER_CONSTS.userProps);
  };
  (<any>User).findAll = () => {
    return [User.build(USER_CONSTS.userProps), User.build(USER_CONSTS.userProps)];
  };
  (<any>User).create = () => {
    return User.build(USER_CONSTS.userProps);
  };
  (<any>User).update = () => {
    return (User.build(USER_CONSTS.userProps));
  }
  (<any>User).destroy = () => {
    return undefined;
  };

  const repository: UserRepository = new UserRepository();

  test('Should create instance', async () => {
    const repository: UserRepository = new UserRepository();

    expect(repository).toBeDefined();
  });

  test('Should find one User', async () => {
    const user: User = await repository.findOne({});

    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
  });

  test('Should find Users with query', async () => {
    const users: User[] = await repository.find({});

    expect(users).toBeDefined();
    expect(users.length).toBeGreaterThan(1);
  });

  test('Should find user by id', async () => {
    const user: User = await repository.findById(1);

    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
  });

  test('Should create new User', async () => {
    const user: User = await repository.create(<any>User.build(USER_CONSTS.userProps));

    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
  });

  test('Should update User', async () => {
    const user: User = await repository.merge(USER_CONSTS.userProps.id, <any>User.build(USER_CONSTS.userProps));

    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
  });

  test('Should delete user', async () => {
    const numDeleted = await repository.delete((<any>User.build(USER_CONSTS.userProps)).dataValues);

    expect(numDeleted).toBeUndefined();
  });
})
;
