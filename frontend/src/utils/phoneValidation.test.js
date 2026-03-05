import { describe, it, expect } from 'vitest';
import {
  normalizePhoneNumber,
  isValidPhoneNumber,
  validatePhoneBatch,
  formatPhoneForDisplay,
} from '../phoneValidation';

describe('phoneValidation', () => {
  describe('normalizePhoneNumber', () => {
    it('should normalize Kenya number with leading 0', () => {
      const result = normalizePhoneNumber('0712345678');
      expect(result.isValid).toBe(true);
      expect(result.phone).toBe('+254712345678');
    });

    it('should normalize Kenya number with 254 prefix', () => {
      const result = normalizePhoneNumber('254712345678');
      expect(result.isValid).toBe(true);
      expect(result.phone).toBe('+254712345678');
    });

    it('should accept already normalized number', () => {
      const result = normalizePhoneNumber('+254712345678');
      expect(result.isValid).toBe(true);
      expect(result.phone).toBe('+254712345678');
    });

    it('should remove whitespace and separators', () => {
      const result = normalizePhoneNumber('0712 345 678');
      expect(result.isValid).toBe(true);
      expect(result.phone).toBe('+254712345678');
    });

    it('should reject invalid format', () => {
      const result = normalizePhoneNumber('123');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should reject wrong digit count for Kenya', () => {
      const result = normalizePhoneNumber('071234567'); // 8 digits
      expect(result.isValid).toBe(false);
    });

    it('should handle empty input', () => {
      const result = normalizePhoneNumber('');
      expect(result.isValid).toBe(false);
    });
  });

  describe('isValidPhoneNumber', () => {
    it('should return true for valid numbers', () => {
      expect(isValidPhoneNumber('0712345678')).toBe(true);
      expect(isValidPhoneNumber('+254712345678')).toBe(true);
    });

    it('should return false for invalid numbers', () => {
      expect(isValidPhoneNumber('123')).toBe(false);
    });
  });

  describe('validatePhoneBatch', () => {
    it('should separate valid and invalid numbers', () => {
      const phones = ['0712345678', 'invalid', '+254712345679'];
      const result = validatePhoneBatch(phones);
      expect(result.valid).toHaveLength(2);
      expect(result.invalid).toHaveLength(1);
    });

    it('should include index for tracking', () => {
      const phones = ['0712345678', 'invalid'];
      const result = validatePhoneBatch(phones);
      expect(result.valid[0].index).toBe(0);
      expect(result.invalid[0].index).toBe(1);
    });
  });

  describe('formatPhoneForDisplay', () => {
    it('should format Kenya number for display', () => {
      const formatted = formatPhoneForDisplay('+254712345678');
      expect(formatted).toBe('+254 712 345 678');
    });

    it('should return non-Kenya number as-is', () => {
      const phone = '+11234567890';
      expect(formatPhoneForDisplay(phone)).toBe(phone);
    });
  });
});
