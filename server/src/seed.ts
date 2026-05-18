import { Types } from 'mongoose';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';
import { User } from './models/User.js';
import { Lead } from './models/Lead.js';
import { buildSeedLeads, hashSeedPasswords, seedUsers } from './seed/seedData.js';

async function seedDatabase(): Promise<void> {
  await connectDatabase();

  await User.deleteMany({ email: { $in: seedUsers.map((user) => user.email) } });
  await Lead.deleteMany({});

  const passwords = await hashSeedPasswords();
  const passwordMap = new Map(passwords.map((entry) => [entry.email, entry.hashedPassword]));
  const users = await User.insertMany(
    seedUsers.map((user) => ({
      name: user.name,
      email: user.email,
      password: passwordMap.get(user.email) ?? '',
      role: user.role
    }))
  );

  const adminUser = users.find((user) => user.role === 'admin') ?? users[0];
  const demoLeads = buildSeedLeads();

  await Lead.insertMany(
    demoLeads.map((lead, index) => ({
      ...lead,
      createdBy: new Types.ObjectId(((users[index % users.length] ?? adminUser) as (typeof users)[number])._id)
    }))
  );

  console.log(`Seeded ${users.length} users and ${demoLeads.length} leads.`);
  console.log(`Admin: ${adminUser?.email ?? 'n/a'}`);
}

void seedDatabase()
  .then(() => {
    console.log(`Database seeded successfully for ${env.mongodbUri}`);
    process.exit(0);
  })
  .catch((error: unknown) => {
    console.error('Seeding failed', error);
    process.exit(1);
  });
