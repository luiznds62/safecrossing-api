import { User } from '../../../src/domain/user/User';

const CONSTS = {
  _id: 1,
  name: 'tester',
  email: 'test@test.com',
  password: '123456'
};

describe('UserModel', () => {
  test('Should create User', async () => {
    const ret = await User.build({
      id: CONSTS._id,
      name: CONSTS.name,
      email: CONSTS.email,
      password: CONSTS.password
    });

    expect(ret).toBeDefined();
    expect(ret.getId()).toBe(CONSTS._id);
    expect(ret.getEmail()).toBe(CONSTS.email);
    expect(ret.getPassword()).toBe(CONSTS.password);
  });

  test('Should not create User without name', async () => {
    try {
      await User.build({
        id: CONSTS._id,
        name: null,
        email: CONSTS.email,
        password: CONSTS.password
      }).validate();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('notNull Violation: [O nome deve ser informado]');
    }
  });

  test('Should not create User without email', async () => {
    try {
      await User.build({
        id: CONSTS._id,
        name: CONSTS.name,
        email: undefined,
        password: CONSTS.password
      }).validate();;
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('notNull Violation: [O e-mail deve ser informado]');
    }
  });

  test('Should not create User without password', async () => {
    try {
      await User.build({
        id: CONSTS._id,
        name: CONSTS.name,
        email: CONSTS.email,
        password: undefined
      }).validate();;
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('notNull Violation: [A senha deve ser informada]');
    }
  });

  test('Should not create User with name length lower than five', async () => {
    try {
      await User.build({
        id: CONSTS._id,
        name: 'name',
        email: CONSTS.email,
        password: CONSTS.password
      }).validate();;
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Validation error: [O nome deve possuir de 5 a 50 caractéres]');
    }
  });

  test('Should not create User with invalid e-mail', async () => {
    try {
      await User.build({
        id: CONSTS._id,
        name: CONSTS.name,
        email: 'invalidmail.com',
        password: CONSTS.password
      }).validate();;
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Validation error: [E-mail inválido]');
    }
  });

  test('Should not create User with password lower than 6', async () => {
    try {
      await User.build({
        id: CONSTS._id,
        name: CONSTS.name,
        email: CONSTS.email,
        password: '12345'
      }).validate();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Validation error: [A senha deve possuir de 5 a 20 caractéres]');
    }
  });

  test('Should not create User with password bigger than 20', async () => {
    try {
      await User.build({
        id: CONSTS._id,
        name: CONSTS.name,
        email: CONSTS.email,
        password: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      }).validate();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Validation error: [A senha deve possuir de 5 a 20 caractéres]');
    }
  });
});
