import { AuthService, TokenPayload } from '../services/authService';
import { InjectorService } from '../services/injectorService';
import { SERVICE_IDENTIFIER } from '../services/services.constants';
import { ForbiddenError, LoginFailError, NotFoundError } from '../error';
import { UserService } from '../modules/users/user.service';
import { USER_SERVICE_IDENTIFIER } from '../modules/users/user.constants';

const authService: AuthService = InjectorService.get<AuthService>(SERVICE_IDENTIFIER.AUTH_SERVICE);
const userService: UserService = InjectorService.get<UserService>(USER_SERVICE_IDENTIFIER.USER_SERVICE);

export async function authorize(req, res, next) {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded: TokenPayload = await authService.decodeToken(token);
    await userService.getUser(decoded.userId);

    next();
  } catch (error) {
    if (error instanceof NotFoundError) {
      next(new ForbiddenError());
      return;
    }
    next(new LoginFailError());
  }
}
