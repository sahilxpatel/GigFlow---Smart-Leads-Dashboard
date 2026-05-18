import { describe, it, expect } from 'vitest';
import type { AuthUser } from '../interfaces/user.js';

// Set env before importing module that reads env at import time
process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/test';
process.env.JWT_SECRET = 'test-secret';
process.env.JWT_EXPIRES_IN = '1d';

const { createToken, verifyToken } = await import('../utils/token.js');

describe('token utils', () => {
  it('creates and verifies a token', () => {
    const user: AuthUser = { id: '123', name: 'Test', email: 't@test.com', role: 'sales' };
    const token = createToken(user);
    expect(typeof token).toBe('string');

    const payload = verifyToken(token);
    expect(payload.user.email).toBe('t@test.com');
    expect(payload.user.id).toBe('123');
  });
});
