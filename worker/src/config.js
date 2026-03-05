// Configuration for the worker

export const config = {
  // Supabase
  supabaseUrl: process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY,

  // SMS Gateway - Africa's Talking
  africasTalkingApiKey: process.env.AFRICAS_TALKING_API_KEY,
  africasTalkingUsername: process.env.AFRICAS_TALKING_USERNAME,

  // Worker Configuration
  batchSize: parseInt(process.env.BATCH_SIZE) || 50,
  batchDelayMs: parseInt(process.env.BATCH_DELAY_MS) || 1000,
  maxRetries: parseInt(process.env.MAX_RETRIES) || 3,
  retryDelayMs: parseInt(process.env.RETRY_DELAY_MS) || 5000,
  pollIntervalMs: parseInt(process.env.POLL_INTERVAL_MS) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  logLevel: process.env.WORKER_LOG_LEVEL || 'info',

  // Validation
  validate() {
    const required = ['supabaseUrl', 'supabaseKey'];
    const missing = required.filter(key => !this[key]);

    if (missing.length > 0) {
      throw new Error(`Missing required config: ${missing.join(', ')}`);
    }

    // Africa's Talking is optional - we can support multiple providers
    if (!this.africasTalkingApiKey || !this.africasTalkingUsername) {
      console.warn('Africa\'s Talking credentials not configured. SMS sending will not work.');
    }
  },
};

config.validate();
