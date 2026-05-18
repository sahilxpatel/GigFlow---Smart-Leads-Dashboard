import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import { authRoutes } from './routes/authRoutes.js';
import { dashboardRoutes } from './routes/dashboardRoutes.js';
import { leadRoutes } from './routes/leadRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

export const app = express();

const corsOrigins = env.corsOrigin
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean);

const corsExactOrigins = new Set(corsOrigins.filter((origin) => !origin.includes('*')));
const corsOriginPatterns = corsOrigins
  .filter((origin) => origin.includes('*'))
  .map((origin) => {
    const escaped = origin.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`^${escaped.replace(/\*/g, '.*')}$`);
  });

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      const normalizedOrigin = origin.replace(/\/$/, '');

      const isExactMatch = corsExactOrigins.has(normalizedOrigin);
      const isPatternMatch = corsOriginPatterns.some((pattern) => pattern.test(normalizedOrigin));

      if (isExactMatch || isPatternMatch) {
        callback(null, true);
        return;
      }

      callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true
  })
);
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'OK' });
});

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/leads', leadRoutes);
app.use(notFoundHandler);
app.use(errorHandler);
