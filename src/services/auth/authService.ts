import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { config } from '../../config/config';
import { injectable } from 'inversify';
import { SALT_LENGTH, TOKEN_EXPIRATION } from './authService.constants';
import { TokenPayload } from './authService.interface';

@injectable()
export class AuthService {
  decodeToken(token: string): Promise<TokenPayload> {
    return jwt.verify(token, config.JWT_SECRET_KEY);
  }

  generateToken(payload: TokenPayload): Promise<string> {
    return jwt.sign(payload, config.JWT_SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_LENGTH);
  }

  comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
