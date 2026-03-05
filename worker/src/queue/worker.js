import pino from 'pino';
import { supabase } from '../lib/supabase.js';
import { AfricasTalkingService } from '../services/AfricasTalkingService.js';
import { config } from '../config.js';

const logger = pino();

/**
 * SMSQueueWorker - Processes pending SMS from queue
 * and sends them via Africa's Talking API
 */
export class SMSQueueWorker {
  constructor() {
    this.isRunning = false;
    this.smsService = new AfricasTalkingService();
    this.pollIntervalMs = config.pollIntervalMs;
  }

  /**
   * Start the worker
   */
  async start() {
    this.isRunning = true;
    logger.info('SMS Queue Worker started');

    // Main processing loop
    while (this.isRunning) {
      try {
        await this.processPendingMessages();
      } catch (error) {
        logger.error('Error in main loop:', error);
      }

      // Wait before next poll
      await new Promise(resolve => setTimeout(resolve, this.pollIntervalMs));
    }
  }

  /**
   * Stop the worker gracefully
   */
  async stop() {
    logger.info('Stopping SMS Queue Worker');
    this.isRunning = false;
  }

  /**
   * Process pending SMS in batches
   */
  async processPendingMessages() {
    try {
      // Fetch pending messages
      const { data: messages, error } = await supabase
        .from('sms_queue')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: true })
        .limit(config.batchSize);

      if (error) {
        logger.error('Error fetching pending messages:', error);
        return;
      }

      if (!messages || messages.length === 0) {
        logger.debug('No pending messages');
        return;
      }

      logger.info(`Processing ${messages.length} pending messages`);

      // Process messages
      for (const message of messages) {
        await this.processMessage(message);

        // Delay between messages to respect rate limits
        await new Promise(resolve => setTimeout(resolve, config.batchDelayMs));
      }

      logger.info('Batch processing completed');
    } catch (error) {
      logger.error('Error processing pending messages:', error);
    }
  }

  /**
   * Process a single message
   */
  async processMessage(message) {
    try {
      logger.debug(`Processing message ${message.id} to ${message.phone_number}`);

      // Send SMS via Africa's Talking
      const result = await this.smsService.sendSMS(
        message.phone_number,
        message.message
      );

      if (result.success) {
        // Mark as sent
        await this.updateMessageStatus(message.id, 'sent', {
          provider_message_id: result.messageId,
        });

        logger.debug(`Message ${message.id} sent successfully`);
      } else {
        // Mark as failed
        await this.updateMessageStatus(message.id, 'failed', {
          error_message: result.error,
          retry_count: message.retry_count + 1,
        });

        logger.warn(`Message ${message.id} failed: ${result.error}`);
      }
    } catch (error) {
      logger.error(`Error processing message ${message.id}:`, error);

      await this.updateMessageStatus(message.id, 'failed', {
        error_message: error.message,
        retry_count: message.retry_count + 1,
      });
    }
  }

  /**
   * Update message status
   */
  async updateMessageStatus(messageId, status, additionalData = {}) {
    try {
      const updateData = {
        status,
        last_retry_at: new Date().toISOString(),
        ...additionalData,
      };

      if (status === 'sent') {
        updateData.sent_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('sms_queue')
        .update(updateData)
        .eq('id', messageId);

      if (error) {
        logger.error(`Error updating message ${messageId}:`, error);
      }
    } catch (error) {
      logger.error('Error in updateMessageStatus:', error);
    }
  }

  /**
   * Process failed messages for retry
   */
  async processFailedMessages() {
    try {
      // Fetch failed messages that haven't exceeded max retries
      const { data: messages, error } = await supabase
        .from('sms_queue')
        .select('*')
        .eq('status', 'failed')
        .lt('retry_count', config.maxRetries)
        .order('last_retry_at', { ascending: true })
        .limit(config.batchSize);

      if (error) {
        logger.error('Error fetching failed messages:', error);
        return;
      }

      if (!messages || messages.length === 0) {
        return;
      }

      logger.info(`Retrying ${messages.length} failed messages`);

      for (const message of messages) {
        // Reset status to pending for retry
        await supabase
          .from('sms_queue')
          .update({ status: 'pending' })
          .eq('id', message.id);

        // Process immediately
        await this.processMessage(message);
      }
    } catch (error) {
      logger.error('Error processing failed messages:', error);
    }
  }
}
