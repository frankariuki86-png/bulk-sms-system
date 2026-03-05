/**
 * Phone number validation and normalization utilities
 * Supports E.164 format and Kenya-specific numbers
 */

// Kenya country code
const KENYA_COUNTRY_CODE = '+254';
const KENYA_COUNTRY_CODE_ALT = '254'; // without +
const KENYA_AREA_PREFIX = '0'; // local prefix

/**
 * Normalize phone number to E.164 format
 * @param {string} phone - Raw phone number
 * @returns {Object} { isValid: boolean, phone: string, error?: string }
 */
export function normalizePhoneNumber(phone) {
  if (!phone || typeof phone !== 'string') {
    return { isValid: false, phone: '', error: 'Phone number is required' };
  }

  // Remove whitespace and common separators
  let normalized = phone.trim().replace(/[\s\-().]/g, '');

  // Handle Kenya numbers with leading 0
  if (normalized.startsWith(KENYA_AREA_PREFIX) && normalized.length === 10) {
    // Convert 0712345678 → +254712345678
    normalized = KENYA_COUNTRY_CODE + normalized.substring(1);
  }
  // Handle Kenya numbers without +
  else if (normalized.startsWith(KENYA_COUNTRY_CODE_ALT) && !normalized.startsWith('+')) {
    // Convert 254712345678 → +254712345678
    normalized = '+' + normalized;
  }
  // Handle Kenya numbers with +254
  else if (!normalized.startsWith('+')) {
    // Assume Kenya if no country code
    if (normalized.length === 9) {
      normalized = KENYA_COUNTRY_CODE + normalized;
    } else {
      return { isValid: false, phone, error: 'Invalid phone format' };
    }
  }

  // Validate E.164 format: +1 (1-3 digits) (4-14 digits) = 15 digits max
  if (!/^\+\d{1,3}\d{4,14}$/.test(normalized)) {
    return { isValid: false, phone, error: 'Must be valid international format' };
  }

  // Kenya-specific validation: +254 followed by 9 digits
  if (normalized.startsWith(KENYA_COUNTRY_CODE)) {
    if (!/^\+254[0-9]{9}$/.test(normalized)) {
      return { isValid: false, phone, error: 'Kenya number must have 9 digits after +254' };
    }
  }

  return { isValid: true, phone: normalized, error: null };
}

/**
 * Validate phone number (without normalization)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
export function isValidPhoneNumber(phone) {
  const result = normalizePhoneNumber(phone);
  return result.isValid;
}

/**
 * Batch validate and normalize phone numbers
 * @param {string[]} phones - Array of phone numbers
 * @returns {Object} { valid: Object[], invalid: Object[] }
 */
export function validatePhoneBatch(phones) {
  const valid = [];
  const invalid = [];

  phones.forEach((phone, index) => {
    const result = normalizePhoneNumber(phone);
    if (result.isValid) {
      valid.push({ index, original: phone, normalized: result.phone });
    } else {
      invalid.push({ index, original: phone, error: result.error });
    }
  });

  return { valid, invalid };
}

/**
 * Format phone for display (Kenya numbers)
 * @param {string} phone - Phone in E.164 format
 * @returns {string} Formatted phone
 */
export function formatPhoneForDisplay(phone) {
  if (!phone || !phone.startsWith(KENYA_COUNTRY_CODE)) return phone;
  // +254712345678 → +254 712 345 678
  return phone.replace(/(\+254)(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
}
