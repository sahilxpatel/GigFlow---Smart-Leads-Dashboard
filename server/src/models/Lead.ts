import { Schema, model, Types } from 'mongoose';
import type { ILead } from '../interfaces/lead.js';

const leadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Lost'],
      default: 'New',
      index: true
    },
    source: {
      type: String,
      enum: ['Website', 'Instagram', 'Referral'],
      default: 'Website',
      index: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      immutable: true
    }
  },
  {
    timestamps: true
  }
);

leadSchema.index({ name: 'text', email: 'text' });

export const Lead = model<ILead>('Lead', leadSchema);
