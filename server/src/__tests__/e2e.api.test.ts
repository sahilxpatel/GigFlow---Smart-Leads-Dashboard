import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import type { Application } from 'express';

// Set minimal env before importing app/utils that read env
process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/test';
process.env.JWT_SECRET = 'test-e2e-secret';
process.env.JWT_EXPIRES_IN = '1d';

const { app } = await import('../app.js');

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { dbName: 'test' });
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
});

describe('E2E API flow', () => {
  it('registers, logs in, creates a lead, and lists leads', async () => {
    const agent = request(app as Application);

    // Register
    const registerRes = await agent.post('/api/auth/register').send({
      name: 'E2E User',
      email: 'e2e@example.com',
      password: 'Password123',
      role: 'admin'
    });

    expect(registerRes.status).toBe(201);
    expect(registerRes.body).toHaveProperty('data');
    const token = registerRes.body.data.token;
    expect(typeof token).toBe('string');

    // Login
    const loginRes = await agent.post('/api/auth/login').send({ email: 'e2e@example.com', password: 'Password123' });
    expect(loginRes.status).toBe(200);
    expect(loginRes.body.data).toHaveProperty('token');

    const authToken = loginRes.body.data.token;

    // Create lead
    const leadRes = await agent
      .post('/api/leads')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'Lead E2E', email: 'lead@example.com', status: 'New', source: 'Website' });

    expect(leadRes.status).toBe(201);
    expect(leadRes.body.data).toHaveProperty('id');

    // List leads
    const listRes = await agent.get('/api/leads').set('Authorization', `Bearer ${authToken}`);
    expect(listRes.status).toBe(200);
    expect(Array.isArray(listRes.body.data)).toBe(true);
    expect(listRes.body.data.length).toBeGreaterThanOrEqual(1);

    const found = listRes.body.data.find((lead: { email: string }) => lead.email === 'lead@example.com');
    expect(found).toBeDefined();
  });
});
