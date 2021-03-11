import { User } from '../../src/domain/user/User';
import { UserService } from '../../src/domain/user/UserService';
import { AuthHandler } from '../../src/security/AuthHandler';
import { USER_CONSTS } from '../domain/UserTestUtils';
import environment from '../../src/common/Environments';

jest.mock('../../src/domain/user/UserService');

describe('AuthHandler', () => {
  environment.SECURITY.ISS = 'safecrossing-api';
  environment.SECURITY.API_SECRET = 'f1fdeaf03bbc0f0134bfb24db9cd9989';
  UserService.prototype.findByEmail = jest.fn().mockReturnValue(new User(USER_CONSTS.userProps));

  const req = {
    body: {
      email: USER_CONSTS.userProps.email,
      password: USER_CONSTS.userProps.password
    }
  };

  const res = {
    json: jest.fn().mockImplementation((ret) => {
      return ret;
    })
  };

  const next = jest.fn().mockImplementation((ret) => {
    return ret;
  });

  beforeAll(() => {
    jest.clearAllMocks();
  });

  test('Should parse token', async () => {
    UserService.prototype.isPasswordMatch = jest.fn().mockReturnValue(true);
    const userService = new UserService();
    AuthHandler.prototype.userService = userService;
    const authHandler: AuthHandler = new AuthHandler();
    const response = await authHandler.authenticate(req, res, next);

    expect(response).toBeDefined();
    expect(response.accessToken).toBeDefined();
    expect(response._id).toBeDefined();
  });

  test('Should not authenticate with wrong password', async () => {
    UserService.prototype.isPasswordMatch = jest.fn().mockReturnValue(false);
    const userService = new UserService();
    AuthHandler.prototype.userService = userService;
    const authHandler: AuthHandler = new AuthHandler();

    const response = await authHandler.authenticate(req, res, next);

    expect(response).toBeDefined();
    expect(response.status).toBe(401);
    expect(response.message).toBe('Invalid credentials');
  });
});
