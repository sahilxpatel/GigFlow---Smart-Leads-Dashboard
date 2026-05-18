import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().trim().min(2, 'Name is required').max(120, 'Name is too long'),
  email: z.string().trim().email('Enter a valid email address').toLowerCase(),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Lost']),
  source: z.enum(['Website', 'Instagram', 'Referral'])
});

export type LeadInput = z.infer<typeof leadSchema>;
