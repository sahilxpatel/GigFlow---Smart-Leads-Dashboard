import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env.js';
import type { AuthUser } from '../interfaces/user.js';

interface TokenPayload {
  user: AuthUser;
}

export function createToken(user: AuthUser): string {
  const signOptions: SignOptions = {
    expiresIn: env.jwtExpiresIn as NonNullable<SignOptions['expiresIn']>
  };

  return jwt.sign({ user }, env.jwtSecret, signOptions);
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, env.jwtSecret) as TokenPayload;
}
