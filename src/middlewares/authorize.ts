import { AuthService } from '../services/auth/authService';
import { InjectorService } from '../services/injector/injectorService';
import { ForbiddenError, LoginFailError, NotFoundError } from '../error';
import { UserService } from '../services/user/user.service';
import { HTTP_METHOD } from "../constants/request";
import { SERVICE_IDENTIFIER, USER_IDENTIFIER } from '../services/injector/injectorService.constants';
import { TokenPayload } from '../services/auth/authService.interface';

const authService: AuthService = InjectorService.get<AuthService>(SERVICE_IDENTIFIER.AUTH_SERVICE);
const userService: UserService = InjectorService.get<UserService>(USER_IDENTIFIER.USER_SERVICE);
const AUTHORIZATION_TOKEN_TYPES = ['Bearer'];
const NOT_AUTH_API_ENDPOINTS: { routeRegexp: RegExp, method?: HTTP_METHOD }[] = [
    { routeRegexp: /^\/doc/ },
    { routeRegexp: /^\/login$/ },
    { routeRegexp: /^\/$/ },
];

export async function authorize(req, res, next) {
  const [url] = req.url.split('?');

  if (authValidationNotRequired(url, req.method)) {
    next();
    return;
  }

  try {
    const [type, token] = req.headers.authorization.split(' ');

    if (!AUTHORIZATION_TOKEN_TYPES.includes(type)) {
      next(new LoginFailError());
      return;
    }

    const decoded: TokenPayload = await authService.decodeToken(token);
    res.locals.user = await userService.getUserById(decoded.userId);

    next();
  } catch (error) {
    if (error instanceof NotFoundError) {
      next(new ForbiddenError());
      return;
    }
    next(new LoginFailError());
  }
}

function authValidationNotRequired(url: string, reqMethod: HTTP_METHOD): boolean {
  return NOT_AUTH_API_ENDPOINTS.some(({ routeRegexp, method }) => {
    const isMethodValid = method ? method === reqMethod : true;

    return url.match(routeRegexp) && isMethodValid;
  })
}
