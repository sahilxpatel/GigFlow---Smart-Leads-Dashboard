import type { HydratedDocument, Types } from 'mongoose';

export type UserRole = 'admin' | 'sales';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type IUserDocument = HydratedDocument<IUser> & { _id: Types.ObjectId };
