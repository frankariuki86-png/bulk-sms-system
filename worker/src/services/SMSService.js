import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

/**
 * SMS Service - Abstracts SMS operations
 * Can support multiple providers
 */
class SMSService {
  constructor(provider = 'africas-talking') {
    this.provider = provider;
    this.initializeProvider();
  }

  initializeProvider() {
    if (this.provider === 'africas-talking') {
      this.apiUrl = 'https://api.sandbox.africastalking.com/version1/messaging';
      this.apiKey = process.env.AFRICAS_TALKING_API_KEY;
      this.username = process.env.AFRICAS_TALKING_USERNAME;
    }
  }

  /**
   * Send SMS to single number
   */
  async sendSMS(phoneNumber, message) {
    if (this.provider === 'africas-talking') {
      return this.sendViaAfricasTalking(phoneNumber, message);
    }
    throw new Error(`Provider ${this.provider} not supported`);
  }

  /**
   * Send via Africa's Talking
   */
  async sendViaAfricasTalking(phoneNumber, message) {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          username: this.username,
          to: phoneNumber,
          message: message,
        },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'apiKey': this.apiKey,
          },
        }
      );

      const recipient = response.data.SMSMessageData?.Recipients?.[0];

      if (recipient?.statusCode === 100) {
        return {
          success: true,
          messageId: recipient.messageId,
          status: 'sent',
        };
      } else {
        return {
          success: false,
          error: recipient?.status || 'Unknown error',
          statusCode: recipient?.statusCode,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Send bulk SMS
   */
  async sendBulk(messages) {
    const results = [];
    for (const msg of messages) {
      const result = await this.sendSMS(msg.phoneNumber, msg.message);
      results.push({ ...result, phoneNumber: msg.phoneNumber });
    }
    return results;
  }
}

export { SMSService };
