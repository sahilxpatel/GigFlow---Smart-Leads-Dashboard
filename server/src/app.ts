import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import { authRoutes } from './routes/authRoutes.js';
import { dashboardRoutes } from './routes/dashboardRoutes.js';
import { leadRoutes } from './routes/leadRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

export const app = express();

const corsOrigins = env.corsOrigin.split(',').map((origin) => origin.trim()).filter(Boolean);

app.use(helmet());
app.use(cors({ origin: corsOrigins.length > 1 ? corsOrigins : corsOrigins[0] ?? env.corsOrigin, credentials: true }));
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'OK' });
});

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/leads', leadRoutes);
app.use(notFoundHandler);
app.use(errorHandler);
