/**
 * Centralized logging and monitoring for worker and backend
 * Supports console, file, and external services
 */

const LOG_LEVEL = process.env.WORKER_LOG_LEVEL || 'info';
const LOG_LEVELS = { error: 0, warn: 1, info: 2, debug: 3 };
const CURRENT_LEVEL = LOG_LEVELS[LOG_LEVEL] || LOG_LEVELS.info;

class Logger {
  constructor(context = '') {
    this.context = context;
    this.startTime = Date.now();
  }

  _shouldLog(level) {
    return LOG_LEVELS[level] <= CURRENT_LEVEL;
  }

  _format(level, message, data) {
    const timestamp = new Date().toISOString();
    const elapsed = Date.now() - this.startTime;
    const contextStr = this.context ? ` [${this.context}]` : '';
    const baseMsg = `[${timestamp}] ${level.toUpperCase()}${contextStr}: ${message}`;

    if (data) {
      return `${baseMsg} ${JSON.stringify(data)}`;
    }
    return baseMsg;
  }

  error(message, data) {
    if (this._shouldLog('error')) {
      const formatted = this._format('error', message, data);
      console.error(formatted);
      this.sendMetric('error', { message, context: this.context, ...data });
    }
  }

  warn(message, data) {
    if (this._shouldLog('warn')) {
      const formatted = this._format('warn', message, data);
      console.warn(formatted);
    }
  }

  info(message, data) {
    if (this._shouldLog('info')) {
      const formatted = this._format('info', message, data);
      console.log(formatted);
    }
  }

  debug(message, data) {
    if (this._shouldLog('debug')) {
      const formatted = this._format('debug', message, data);
      console.debug(formatted);
    }
  }

  /**
   * Log structured data for monitoring/analytics
   */
  metric(name, value, tags = {}) {
    this.sendMetric(name, { value, ...tags });
  }

  /**
   * Send metric to monitoring service (optional)
   * Can be extended to support Prometheus, DataDog, CloudWatch, etc.
   */
  sendMetric(name, data) {
    // TODO: Integrate with monitoring service
    // For now, just log at debug level
    if (this._shouldLog('debug')) {
      console.debug(`METRIC: ${name}`, data);
    }
  }

  /**
   * Time an operation and log duration
   */
  async timed(operation, fn) {
    const start = Date.now();
    try {
      const result = await fn();
      const duration = Date.now() - start;
      this.info(`${operation} completed`, { duration_ms: duration });
      this.metric(operation, duration, { status: 'success' });
      return result;
    } catch (error) {
      const duration = Date.now() - start;
      this.error(`${operation} failed`, { duration_ms: duration, error: error.message });
      this.metric(operation, duration, { status: 'error' });
      throw error;
    }
  }
}

export const logger = new Logger('sms-worker');

export function createLogger(context) {
  return new Logger(context);
}

/**
 * Monitoring metrics for alerts
 */
export const metrics = {
  queueSize: 0,
  messagesProcessed: 0,
  messagesFailed: 0,
  avgDeliveryTime: 0,
  errors: [],

  recordSuccess(deliveryTime) {
    this.messagesProcessed++;
    this.avgDeliveryTime = (this.avgDeliveryTime + deliveryTime) / 2;
  },

  recordError(error) {
    this.messagesFailed++;
    this.errors.push({ timestamp: Date.now(), message: error.message });
    // Keep only last 100 errors
    if (this.errors.length > 100) {
      this.errors.shift();
    }
  },

  getStatus() {
    return {
      queueSize: this.queueSize,
      processed: this.messagesProcessed,
      failed: this.messagesFailed,
      avgDeliveryTime: this.avgDeliveryTime.toFixed(2),
      errorRate: this.messagesFailed / (this.messagesProcessed + this.messagesFailed) || 0,
      recentErrors: this.errors.slice(-10),
    };
  },

  reset() {
    this.queueSize = 0;
    this.messagesProcessed = 0;
    this.messagesFailed = 0;
    this.avgDeliveryTime = 0;
    this.errors = [];
  },
};
