import bcrypt from 'bcryptjs';
import type { UserRole } from '../interfaces/user.js';
import type { LeadSource, LeadStatus } from '../interfaces/lead.js';

export interface SeedUserInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface SeedLeadInput {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
}

export const seedUsers: SeedUserInput[] = [
  {
    name: 'Admin User',
    email: 'admin@smartleads.dev',
    password: 'Admin1234',
    role: 'admin'
  },
  {
    name: 'Sales User',
    email: 'sales@smartleads.dev',
    password: 'Sales1234',
    role: 'sales'
  }
];

const leadNames = [
  'Rahul Sharma',
  'Priya Patel',
  'Arjun Mehta',
  'Neha Iyer',
  'Karan Singh',
  'Sneha Verma',
  'Aman Gupta',
  'Pooja Nair',
  'Rohit Kapoor',
  'Isha Malhotra',
  'Vikram Das',
  'Ananya Roy',
  'Sahil Khan',
  'Meera Joshi',
  'Nikhil Bansal',
  'Tanya Chawla',
  'Aditya Rao',
  'Komal Jain',
  'Harsh Vardhan',
  'Ritika Sen'
] as const;

const leadStatuses: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Lost'];
const leadSources: LeadSource[] = ['Website', 'Instagram', 'Referral'];

export function buildSeedLeads(): SeedLeadInput[] {
  return leadNames.map((name, index) => {
    const emailPrefix = name.toLowerCase().replaceAll(' ', '.');
    const status = leadStatuses[index % leadStatuses.length] ?? 'New';
    const source = leadSources[index % leadSources.length] ?? 'Website';

    return {
      name,
      email: `${emailPrefix}${index + 1}@example.com`,
      status,
      source
    };
  });
}

export async function hashSeedPasswords(): Promise<Array<{ email: string; hashedPassword: string }>> {
  return Promise.all(
    seedUsers.map(async (user) => ({
      email: user.email,
      hashedPassword: await bcrypt.hash(user.password, 12)
    }))
  );
}
