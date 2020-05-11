import * as express from 'express';
import { safeHandler } from "../decorators/safeHandler";
import { AuthService } from '../services/auth/authService';
import { InjectorService } from '../services/injector/injectorService';
import * as HttpStatus from 'http-status-codes';
import { UserService } from '../services/user/user.service';
import { LoginFailError } from '../error';
import * as _ from 'lodash';
import { SERVICE_IDENTIFIER, USER_IDENTIFIER } from '../services/injector/injectorService.constants';

const router = express.Router();
const authService: AuthService = InjectorService.get<AuthService>(SERVICE_IDENTIFIER.AUTH_SERVICE);
const userService: UserService = InjectorService.get<UserService>(USER_IDENTIFIER.USER_SERVICE);

router.route('/')
  .post(safeHandler.bind(null, async (req, res) => {
    const { login, password } = req.body;
    const user = await userService.getUserByLogin(login);
    const userPassword = _.get(user, 'password');
    const isMatch = userPassword && await authService.comparePasswords(password, userPassword);

    if (!user || !isMatch) {
      throw new LoginFailError();
    }

    const token = await authService.generateToken({ userId: user.id, login: user.login });

    res.status(HttpStatus.OK).json({ token });
  }));

module.exports = router;
