import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { AppError } from '../utils/appError.js';
import { createToken } from '../utils/token.js';
import type { AuthUser } from '../interfaces/user.js';
import type { LoginInput, RegisterInput } from '../validators/authValidators.js';

function toAuthUser(user: { _id: { toString(): string }; name: string; email: string; role: 'admin' | 'sales' }): AuthUser {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role
  };
}

export async function registerUser(input: RegisterInput) {
  const existingUser = await User.findOne({ email: input.email });

  if (existingUser) {
    throw new AppError('An account with that email already exists', 409);
  }

  const hashedPassword = await bcrypt.hash(input.password, 12);
  const user = await User.create({
    name: input.name,
    email: input.email,
    password: hashedPassword,
    role: input.role
  });

  const authUser = toAuthUser(user);
  const token = createToken(authUser);

  return { user: authUser, token };
}

export async function loginUser(input: LoginInput) {
  const user = await User.findOne({ email: input.email }).select('+password');

  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const passwordMatch = await bcrypt.compare(input.password, user.password);

  if (!passwordMatch) {
    throw new AppError('Invalid credentials', 401);
  }

  const authUser = toAuthUser(user);
  const token = createToken(authUser);

  return { user: authUser, token };
}

export async function getCurrentUser(userId: string) {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return toAuthUser(user);
}
