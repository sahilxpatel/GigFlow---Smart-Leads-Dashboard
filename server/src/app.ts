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

// Log configured CORS origins for debugging in deployed logs
console.info('CORS configured origins:', corsOrigins);
console.info('CORS exact origins:', Array.from(corsExactOrigins));
console.info('CORS origin patterns:', corsOriginPatterns.map((r) => r.source));

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

        // Log the incoming origin and match decision for debugging
        console.debug('CORS check origin=', normalizedOrigin, 'exact=', isExactMatch, 'pattern=', isPatternMatch);

        if (isExactMatch || isPatternMatch) {
          callback(null, true);
          return;
        }

        // Do not throw an error here — return false to let CORS middleware
        // respond without CORS headers (the browser will block the request)
        // and avoid turning this into a 500 internal server error in our JSON API.
        callback(null, false);
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
