import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { config } from '../common/config';
import { injectable } from 'inversify';

const SALT_LENGTH = 8;
const TOKEN_EXPIRATION = '1d';

export interface TokenPayload {
  userId: string;
  login: string;
}

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
