import { User } from '../../../src/domain/user/User';
import { UserRepository } from '../../../src/domain/user/UserRepository';
import { USER_CONSTS } from './UserTestUtils';
jest.mock('typeorm');


describe('UserRepository', () => {
  test('', () => {
    console.log(1)
  })
  // (<any>UserRepository.prototype.db).findOne.mockImplementation(async (query, fn) => {
  //   fn(false, await new User(USER_CONSTS.userProps));
  // });
  //
  // (<any>UserRepository.prototype.db).find.mockImplementation(async (query, fn) => {
  //   const users = [await new User(USER_CONSTS.userProps), await new User(USER_CONSTS.userProps)];
  //   fn(false, users);
  // });
  //
  // (<any>UserRepository.prototype.db).save.mockImplementation(async (query, fn) => {
  //   fn(false, await new User(USER_CONSTS.userProps));
  // });
  //
  //
  // (<any>UserRepository.prototype.db).remove.mockImplementation(async (query, {}, fn) => {
  //   fn(false, 1);
  // });
  //
  // const repository: UserRepository = new UserRepository();
  //
  //
  // test('Should create instance', async () => {
  //   const repository: UserRepository = new UserRepository();
  //
  //   expect(repository).toBeDefined();
  // });
  //
  // test('Should find one User', async () => {
  //   const user: User = await repository.findOne({});
  //
  //   expect(user).toBeDefined();
  //   expect(user).toBeInstanceOf(User);
  // });
  //
  // test('Should find Users with query', async () => {
  //   const users: User[] = await repository.find({});
  //
  //   expect(users).toBeDefined();
  //   expect(users.length).toBeGreaterThan(1);
  // });
  //
  // test('Should find user by id', async () => {
  //   const user: User = await repository.findById(1);
  //
  //   expect(user).toBeDefined();
  //   expect(user).toBeInstanceOf(User);
  // });
  //
  // test('Should create new User', async () => {
  //   const user: User = await repository.create(await new User(USER_CONSTS.userProps));
  //
  //   expect(user).toBeDefined();
  //   expect(user).toBeInstanceOf(User);
  // });
  //
  // test('Should update User', async () => {
  //   const user: User = await repository.merge(USER_CONSTS.userProps._id, await new User(USER_CONSTS.userProps));
  //
  //   expect(user).toBeDefined();
  //   expect(user).toBeInstanceOf(User);
  // });
  //
  // test('Should delete user', async () => {
  //   const numDeleted = await repository.delete(await new User(USER_CONSTS.userProps));
  //
  //   expect(numDeleted).toBeDefined();
  //   expect(numDeleted).toBe(1);
  // });
  //
  // afterAll(() => {
  //   jest.clearAllMocks();
  // });
});
