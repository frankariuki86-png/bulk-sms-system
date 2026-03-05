/**
 * Rate limiting and cost control utilities
 * Prevents overspending and protects against provider limits
 */

class RateLimiter {
  constructor() {
    // Per-campaign limits
    this.campaignLimits = new Map();
    // Global limits
    this.globalLimit = {
      maxMessagesPerHour: parseInt(process.env.MAX_MESSAGES_PER_HOUR || '10000'),
      maxMessagesPerDay: parseInt(process.env.MAX_MESSAGES_PER_DAY || '50000'),
      messagesThisHour: 0,
      messagesThisDay: 0,
      hourStart: Date.now(),
      dayStart: Date.now(),
    };
    // Budget tracking
    this.budget = {
      monthlyBudget: parseFloat(process.env.MONTHLY_BUDGET_KES || '100000'), // Kenya Shillings
      spent: 0,
      monthStart: new Date().toISOString().slice(0, 7), // YYYY-MM
    };
  }

  /**
   * Check if message can be sent
   * @returns { canSend: boolean, reason?: string }
   */
  canSendMessage(campaignId, estimatedCost = 1) {
    // Check global hourly limit
    if (this.globalLimit.messagesThisHour >= this.globalLimit.maxMessagesPerHour) {
      return { canSend: false, reason: 'Hourly rate limit exceeded' };
    }

    // Check global daily limit
    if (this.globalLimit.messagesThisDay >= this.globalLimit.maxMessagesPerDay) {
      return { canSend: false, reason: 'Daily rate limit exceeded' };
    }

    // Check campaign-specific limit (100 messages per campaign per minute)
    const campaignKey = `${campaignId}_${Math.floor(Date.now() / 60000)}`;
    const campaignCount = this.campaignLimits.get(campaignKey) || 0;
    if (campaignCount >= 100) {
      return { canSend: false, reason: 'Campaign rate limit exceeded' };
    }

    // Check budget
    if (this.budget.spent + estimatedCost > this.budget.monthlyBudget) {
      return { canSend: false, reason: 'Monthly budget exceeded' };
    }

    return { canSend: true };
  }

  /**
   * Record that a message was sent
   */
  recordSent(campaignId, cost = 1) {
    // Update per-campaign limit
    const campaignKey = `${campaignId}_${Math.floor(Date.now() / 60000)}`;
    this.campaignLimits.set(campaignKey, (this.campaignLimits.get(campaignKey) || 0) + 1);

    // Update global limits
    this.globalLimit.messagesThisHour++;
    this.globalLimit.messagesThisDay++;

    // Update budget
    this.budget.spent += cost;

    // Reset hourly counter every hour
    if (Date.now() - this.globalLimit.hourStart > 3600000) {
      this.globalLimit.messagesThisHour = 0;
      this.globalLimit.hourStart = Date.now();
    }

    // Reset daily counter every day
    if (Date.now() - this.globalLimit.dayStart > 86400000) {
      this.globalLimit.messagesThisDay = 0;
      this.globalLimit.dayStart = Date.now();
    }

    // Reset monthly budget every month
    const currentMonth = new Date().toISOString().slice(0, 7);
    if (currentMonth !== this.budget.monthStart) {
      this.budget.spent = cost;
      this.budget.monthStart = currentMonth;
    }
  }

  /**
   * Get remaining budget
   */
  getRemainingBudget() {
    return this.budget.monthlyBudget - this.budget.spent;
  }

  /**
   * Get status for monitoring
   */
  getStatus() {
    return {
      hourly: {
        current: this.globalLimit.messagesThisHour,
        max: this.globalLimit.maxMessagesPerHour,
        remaining: this.globalLimit.maxMessagesPerHour - this.globalLimit.messagesThisHour,
      },
      daily: {
        current: this.globalLimit.messagesThisDay,
        max: this.globalLimit.maxMessagesPerDay,
        remaining: this.globalLimit.maxMessagesPerDay - this.globalLimit.messagesThisDay,
      },
      budget: {
        spent: this.budget.spent.toFixed(2),
        limit: this.budget.monthlyBudget.toFixed(2),
        remaining: this.getRemainingBudget().toFixed(2),
        month: this.budget.monthStart,
      },
    };
  }
}

/**
 * Provider-specific retry and throttle settings
 */
export const providerConfig = {
  'africas-talking': {
    // Africa's Talking rate limits: 100 msg/sec standard, 1000 msg/sec enterprise
    maxConcurrent: 10,
    delayBetweenBatches: 100, // ms
    retryDelays: [1000, 5000, 30000], // exponential backoff
    maxRetries: 3,
    timeout: 30000,
    // Cost per SMS (varies by network)
    cost: {
      default: 1.0, // KES
      safaricom: 1.0,
      airtel: 1.2,
    },
  },
};

/**
 * Idempotency tracking for dedup
 */
class IdempotencyTracker {
  constructor() {
    this.processed = new Map(); // idempotencyKey -> { campaignId, messageId }
    this.maxSize = 10000; // Prevent unbounded memory growth
  }

  /**
   * Check if message was already processed
   */
  isProcessed(idempotencyKey) {
    return this.processed.has(idempotencyKey);
  }

  /**
   * Mark message as processed
   */
  markProcessed(idempotencyKey, data) {
    this.processed.set(idempotencyKey, data);

    // Cleanup old entries if map grows too large
    if (this.processed.size > this.maxSize) {
      const firstKey = this.processed.keys().next().value;
      this.processed.delete(firstKey);
    }
  }

  /**
   * Get all processed messages
   */
  getAllProcessed() {
    return Array.from(this.processed.entries()).map(([key, data]) => ({
      idempotencyKey: key,
      ...data,
    }));
  }

  reset() {
    this.processed.clear();
  }
}

export const rateLimiter = new RateLimiter();
export const idempotencyTracker = new IdempotencyTracker();
