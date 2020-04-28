import { AuthService, TokenPayload } from '../services/authService';
import { InjectorService } from '../services/injectorService';
import { SERVICE_IDENTIFIER } from '../services/services.constants';
import { ForbiddenError, LoginFailError, NotFoundError } from '../error';
import { UserService } from '../modules/users/user.service';
import { USER_SERVICE_IDENTIFIER } from '../modules/users/user.constants';

const authService: AuthService = InjectorService.get<AuthService>(SERVICE_IDENTIFIER.AUTH_SERVICE);
const userService: UserService = InjectorService.get<UserService>(USER_SERVICE_IDENTIFIER.USER_SERVICE);
const AUTHORIZATION_TOKEN_TYPES = ['Bearer'];

export async function authorize(req, res, next) {
  try {
    const [type, token] = req.headers.authorization.split(' ');

    if (!AUTHORIZATION_TOKEN_TYPES.includes(type)) {
      next(new LoginFailError());
      return;
    }

    const decoded: TokenPayload = await authService.decodeToken(token);
    await userService.getUserById(decoded.userId);

    next();
  } catch (error) {
    if (error instanceof NotFoundError) {
      next(new ForbiddenError());
      return;
    }
    next(new LoginFailError());
  }
}
