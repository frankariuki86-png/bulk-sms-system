import 'dotenv/config';
import pino from 'pino';
import { SMSQueueWorker } from './queue/worker.js';
import { config } from './config.js';

const logger = pino();

async function main() {
  try {
    logger.info('Starting SMS Queue Worker');
    logger.info(`Configuration: ${JSON.stringify({
      batchSize: config.batchSize,
      maxRetries: config.maxRetries,
      nodeEnv: config.nodeEnv,
    })}`);

    const worker = new SMSQueueWorker();
    await worker.start();

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      logger.info('SIGTERM received, shutting down gracefully');
      await worker.stop();
      process.exit(0);
    });

    process.on('SIGINT', async () => {
      logger.info('SIGINT received, shutting down gracefully');
      await worker.stop();
      process.exit(0);
    });
  } catch (error) {
    logger.error('Fatal error:', error);
    process.exit(1);
  }
}

main();
