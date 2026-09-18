/**
 * Validates genuine Indian 10-digit mobile numbers:
 * - Must be exactly 10 digits
 * - Must start with 6, 7, 8, or 9
 * - Rejects repeated digits (9999999999, 8888888888, etc.)
 * - Rejects patterned numbers (9898989898, etc.)
 * - Rejects sequential numbers (9876543210, etc.)
 * - Requires at least 4 unique digits
 */
export const validateMobileNumber = (mobile: string): string | null => {
  const digits = mobile.replace(/\D/g, '').trim()

  if (!digits) {
    return 'Please enter your 10-digit mobile number'
  }

  if (digits.length !== 10) {
    return 'Mobile number must be exactly 10 digits'
  }

  if (!/^[6-9]/.test(digits)) {
    return 'Mobile number must start with 6, 7, 8, or 9'
  }

  // 1. All same digits
  if (/^(\d)\1{9}$/.test(digits)) {
    return 'Please enter a valid mobile number, not repeated digits'
  }

  // 2. Minimum distinct digits check
  const uniqueDigits = new Set(digits.split('')).size
  if (uniqueDigits < 4) {
    return 'Please enter a valid, original mobile number'
  }

  // 3. Repeated 2-digit patterns
  if (/^(\d{2})\1{4}$/.test(digits)) {
    return 'Patterned numbers like 9898989898 are not allowed'
  }

  // 4. Repeated 3-digit patterns
  if (/^(\d{3})\1{2}\d$/.test(digits) || /^(\d{3})\1{2}$/.test(digits.slice(0, 9))) {
    return 'Patterned numbers are not allowed'
  }

  // 5. Sequential ascending/descending numbers
  const isSequentialAsc = '0123456789012345'.includes(digits)
  const isSequentialDesc = '9876543210987654'.includes(digits)
  if (isSequentialAsc || isSequentialDesc) {
    return 'Sequential numbers like 9876543210 are not allowed'
  }

  // 6. Check for 5+ consecutive repeated digits
  if (/(\d)\1{4,}/.test(digits)) {
    return 'Please enter a valid, genuine mobile number'
  }

  // 7. Known dummy/testing numbers list
  const DUMMY_NUMBERS = new Set([
    '9876543210',
    '9876543211',
    '9876543212',
    '9123456789',
    '9012345678',
    '9000000000',
    '8000000000',
    '7000000000',
    '6000000000',
    '9999900000',
    '8888800000',
  ])

  if (DUMMY_NUMBERS.has(digits)) {
    return 'Please enter a valid, original mobile number'
  }

  return null
}

export const isValidMobile = (value: string): boolean => validateMobileNumber(value) === null
