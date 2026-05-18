import { app } from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';

async function startServer(): Promise<void> {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
}

void startServer().catch((error: unknown) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
