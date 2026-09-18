import { REGEX } from '../constants/common.constants'

export const isValidGstin = (value: string): boolean =>
  REGEX.gstin.test(value.trim().toUpperCase())

/**
 * Conditionally joins CSS class names
 */
export const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ')
}

/**
 * Returns initials for a given user name (e.g. "John Doe" -> "JD")
 */
export const initialsOf = (name: string): string => {
  if (!name) return ''
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/**
 * Formats bytes to human-readable size string
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

/**
 * Formats Aadhaar into standard 4-4-4 spacing (e.g. 1234 5678 9012)
 */
export const formatAadhaar = (val: string): string => {
  const digits = val.replace(/\D/g, '').slice(0, 12)
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
}

/**
 * Formats PAN to uppercase alphanumeric max 10 chars
 */
export const formatPan = (val: string): string => {
  return val.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10)
}

/**
 * Formats Indian 10-digit mobile number
 */
export const formatMobile = (val: string): string => {
  return val.replace(/\D/g, '').slice(0, 10)
}

/**
 * Formats IFSC code to uppercase 11 chars
 */
export const formatIfsc = (val: string): string => {
  return val.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 11)
}

/** PAN embedded in a GSTIN, characters 3-12. */
export const panFromGstin = (gstin: string): string | null =>
  isValidGstin(gstin) ? gstin.slice(2, 12) : null
