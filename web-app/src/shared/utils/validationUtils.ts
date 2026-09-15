import { REGEX } from '../constants/common.constants'

export const isValidPan = (value: string): boolean => REGEX.pan.test(value.trim().toUpperCase())
export const isValidGstin = (value: string): boolean => REGEX.gstin.test(value.trim().toUpperCase())
export const isValidPincode = (value: string): boolean => REGEX.pincode.test(value.trim())

/**
 * Validates Email addresses (RFC 5322 compatible standard check)
 */
export const isValidEmail = (email: string): boolean => {
  const trimmed = email.trim()
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed)
}

export const validateEmail = (email: string): string | null => {
  const trimmed = email.trim()
  if (!trimmed) {
    return 'Email address is required'
  }
  if (!isValidEmail(trimmed)) {
    return 'Please enter a valid email address (e.g. name@domain.com)'
  }
  return null
}

/**
 * Validates 11-character Indian IFSC code:
 * - First 4 characters: Alphabetic (Bank code)
 * - 5th character: Always '0'
 * - Last 6 characters: Alphanumeric (Branch code)
 */
export const isValidIfsc = (ifsc: string): boolean => {
  const trimmed = ifsc.trim().toUpperCase()
  return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(trimmed)
}

export const validateIfsc = (ifsc: string): string | null => {
  const trimmed = ifsc.trim().toUpperCase()
  if (!trimmed) {
    return 'IFSC code is required'
  }
  if (trimmed.length !== 11) {
    return 'IFSC code must be exactly 11 characters'
  }
  if (!isValidIfsc(trimmed)) {
    return 'Invalid IFSC code format (e.g. HDFC0001234 — 4 letters, 0, 6 characters)'
  }
  return null
}

/**
 * Validates Bank Account Numbers: 9 to 18 numeric digits
 */
export const isValidBankAccNumber = (acc: string): boolean => {
  const digits = acc.replace(/\D/g, '').trim()
  return digits.length >= 9 && digits.length <= 18
}

/**
 * Validates HSN / SAC code (2 to 8 alphanumeric characters)
 */
export const isValidHsnSac = (code: string): boolean => {
  const trimmed = code.trim()
  return /^[0-9A-Za-z]{2,8}$/.test(trimmed)
}

/**
 * Validates PAN Number (5 letters, 4 numbers, 1 letter)
 */
export const validatePan = (pan: string): string | null => {
  const trimmed = pan.trim().toUpperCase()
  if (!trimmed) {
    return 'PAN number is required'
  }
  if (trimmed.length !== 10) {
    return 'PAN must be exactly 10 characters'
  }
  if (!isValidPan(trimmed)) {
    return 'Invalid PAN format (e.g. ABCDE1234F — 5 letters, 4 digits, 1 letter)'
  }
  return null
}

/**
 * Validates 6-digit Indian PIN Code
 */
export const validatePincode = (pincode: string): string | null => {
  const trimmed = pincode.trim()
  if (!trimmed) {
    return 'PIN code is required'
  }
  if (trimmed.length !== 6) {
    return 'PIN code must be exactly 6 digits'
  }
  if (!isValidPincode(trimmed)) {
    return 'Invalid PIN code (must start with 1-9 and contain 6 digits)'
  }
  return null
}

/**
 * Validates Signatory Date of Birth:
 * - Must be a valid date
 * - Signatory must be at least 18 years old
 * - Cannot be in the future
 */
export const validateDobSignatory = (dob: string): string | null => {
  if (!dob) {
    return 'Date of birth is required'
  }
  const dateObj = new Date(dob)
  if (isNaN(dateObj.getTime())) {
    return 'Please select a valid date of birth'
  }
  const today = new Date()
  if (dateObj > today) {
    return 'Date of birth cannot be in the future'
  }

  // Calculate age
  let age = today.getFullYear() - dateObj.getFullYear()
  const monthDiff = today.getMonth() - dateObj.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateObj.getDate())) {
    age--
  }

  if (age < 18) {
    return 'Authorised signatory must be at least 18 years of age'
  }
  if (age > 100) {
    return 'Please enter a valid date of birth'
  }

  return null
}

/**
 * Validates Commencement Date:
 * - Must be a valid date
 * - Cannot be more than 30 days in the future
 */
export const validateCommencementDate = (date: string): string | null => {
  if (!date) {
    return 'Date of commencement is required'
  }
  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) {
    return 'Please select a valid date'
  }
  const maxFuture = new Date()
  maxFuture.setDate(maxFuture.getDate() + 30)
  if (dateObj > maxFuture) {
    return 'Commencement date cannot be more than 30 days in the future'
  }
  return null
}
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

  // 1. All same digits (e.g. 9999999999, 8888888888, 7777777777)
  if (/^(\d)\1{9}$/.test(digits)) {
    return 'Please enter a valid mobile number, not repeated digits'
  }

  // 2. Minimum distinct digits check (must have at least 4 distinct digits)
  const uniqueDigits = new Set(digits.split('')).size
  if (uniqueDigits < 4) {
    return 'Please enter a valid, original mobile number'
  }

  // 3. Repeated 2-digit patterns (e.g. 9898989898, 9191919191, 9090909090)
  if (/^(\d{2})\1{4}$/.test(digits)) {
    return 'Patterned numbers like 9898989898 are not allowed'
  }

  // 4. Repeated 3-digit patterns (e.g. 9879879879)
  if (/^(\d{3})\1{2}\d$/.test(digits) || /^(\d{3})\1{2}$/.test(digits.slice(0, 9))) {
    return 'Patterned numbers are not allowed'
  }

  // 5. Sequential ascending/descending numbers (e.g. 9876543210, 6789012345, 1234567890)
  const isSequentialAsc = '0123456789012345'.includes(digits)
  const isSequentialDesc = '9876543210987654'.includes(digits)
  if (isSequentialAsc || isSequentialDesc) {
    return 'Sequential numbers like 9876543210 are not allowed'
  }

  // 6. Check for 5+ consecutive repeated digits in a row (e.g. 9999912345)
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

/** PAN embedded in a GSTIN, characters 3-12. */
export const panFromGstin = (gstin: string): string | null =>
  isValidGstin(gstin) ? gstin.slice(2, 12) : null

export const isNonEmpty = (value: string | null | undefined): boolean => Boolean(value && value.trim().length > 0)

