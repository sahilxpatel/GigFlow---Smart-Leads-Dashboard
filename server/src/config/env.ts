import dotenv from 'dotenv';

dotenv.config();

type RequiredEnvKey = 'MONGODB_URI' | 'JWT_SECRET';

function getRequiredEnv(key: RequiredEnvKey): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export const env = {
  port: Number(process.env.PORT ?? 5000),
  mongodbUri: getRequiredEnv('MONGODB_URI'),
  jwtSecret: getRequiredEnv('JWT_SECRET'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173'
};
