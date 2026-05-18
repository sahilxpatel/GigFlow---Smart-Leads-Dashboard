import { Schema, model } from 'mongoose';
import type { IUser } from '../interfaces/user.js';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      enum: ['admin', 'sales'],
      default: 'sales'
    }
  },
  {
    timestamps: true
  }
);

export const User = model<IUser>('User', userSchema);
