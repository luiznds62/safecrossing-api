import { UserMap } from '../../../src/api/user/UserDto';
import { User } from '../../../src/domain/user/User';
import { USER_CONSTS } from '../../domain/user/UserTestUtils';

describe('UserDto', () => {
  test('Should do to domain', async () => {
    const user = await new UserMap().toDomain(USER_CONSTS.userProps);

    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
    expect(user.getId()).toBe(USER_CONSTS.userProps.id);
    expect(user.getName()).toBe(USER_CONSTS.userProps.name);
    expect(user.getEmail()).toBe(USER_CONSTS.userProps.email);
    expect(user.getPassword()).toBe(USER_CONSTS.userProps.password);
  });

  test('Should throw validation error in to domain', async () => {
    try {
      await new UserMap().toDomain({
        _id: '',
        name: '123',
        email: USER_CONSTS.userProps.email,
        password: USER_CONSTS.userProps.password
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.status).toBe(422);
    }
  });

  test('Should do to Dto', () => {
    const dto = new UserMap().toDTO(new User(USER_CONSTS.userProps));

    expect(dto).toBeDefined();
    expect(dto.id).toBeDefined();
    expect(dto.name).toBeDefined();
    expect(dto.email).toBeDefined();
    expect(dto.password).toBeDefined();
  });
});
