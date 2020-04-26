import * as express from 'express';
import { safeHandler } from "../../decorators/safeHandler";
import { AuthService } from '../../services/authService';
import { InjectorService } from '../../services/injectorService';
import * as HttpStatus from 'http-status-codes';
import { SERVICE_IDENTIFIER } from '../../services/services.constants';
import { UserModel } from '../users/user.model';

const router = express.Router();
const authService: AuthService = InjectorService.get<AuthService>(SERVICE_IDENTIFIER.AUTH_SERVICE);

router.route('/')
  .post(safeHandler.bind(null, async (req, res) => {
    const { login, password } = req.body;
    const user = await UserModel.findByCredentials(login, password);
    const token = await authService.generateToken({ userId: user.id, login: user.login });

    res.status(HttpStatus.OK).json({ token });
  }));

module.exports = router;
