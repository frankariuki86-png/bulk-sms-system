import axios from 'axios';
import { config } from '../config.js';

class AfricasTalkingService {
  constructor() {
    this.apiUrl = 'https://api.sandbox.africastalking.com/version1/messaging';
    this.apiKey = config.africasTalkingApiKey;
    this.username = config.africasTalkingUsername;
  }

  /**
   * Send single SMS
   * @param {string} phoneNumber - Recipient phone number
   * @param {string} message - SMS message content
   * @returns {Promise<object>} Response from API
   */
  async sendSMS(phoneNumber, message) {
    if (!this.apiKey || !this.username) {
      throw new Error('Africa\'s Talking credentials not configured');
    }

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

      return {
        success: true,
        messageId: response.data.SMSMessageData?.Recipients?.[0]?.messageId,
        status: response.data.SMSMessageData?.Recipients?.[0]?.status,
        statusCode: response.data.SMSMessageData?.Recipients?.[0]?.statusCode,
        cost: response.data.SMSMessageData?.Recipients?.[0]?.cost,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        statusCode: error.response?.status,
      };
    }
  }

  /**
   * Send batch SMS
   * @param {Array} messages - Array of {phoneNumber, message}
   * @returns {Promise<Array>} Results for each message
   */
  async sendBatch(messages) {
    const results = [];

    for (const msg of messages) {
      const result = await this.sendSMS(msg.phoneNumber, msg.message);
      results.push({
        ...result,
        phoneNumber: msg.phoneNumber,
      });

      // Rate limiting - Africa's Talking recommends delays between requests
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return results;
  }

  /**
   * Check message delivery status
   * @param {string} messageId - Message ID from sending
   * @returns {Promise<object>} Status information
   */
  async checkStatus(messageId) {
    try {
      const response = await axios.get(
        `${this.apiUrl}/messages`,
        {
          params: {
            username: this.username,
            messageId: messageId,
          },
          headers: {
            'apiKey': this.apiKey,
          },
        }
      );

      return response.data;
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}

export { AfricasTalkingService };
