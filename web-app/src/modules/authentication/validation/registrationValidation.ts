import { validateMobileNumber, validatePan, validateAadhaar } from '@shared/utils'

export interface RegistrationFormState {
  fullName: string
  email: string
  gender: string
  dob: string
  fatherSpouseName: string
  pan: string
  aadhaar: string
  mobile: string
  addressLine1: string
  addressLine2: string
  city: string
  pincode: string
  state: string
  password: string
  confirmPassword: string
  agreeTerms: boolean
}

export type RegistrationFormErrors = Partial<
  Record<keyof RegistrationFormState | 'form', string>
>

export const INITIAL_REGISTRATION_VALUES: RegistrationFormState = {
  fullName: '',
  email: '',
  gender: '',
  dob: '',
  fatherSpouseName: '',
  pan: '',
  aadhaar: '',
  mobile: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  pincode: '',
  state: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false,
}

export const formatDOB = (val: string): string => {
  const digits = val.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}-${digits.slice(2)}`
  return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4)}`
}

export const isValidDateString = (dob: string): boolean => {
  const match = dob.match(/^(\d{2})-(\d{2})-(\d{4})$/)
  if (!match) return false

  const day = parseInt(match[1], 10)
  const month = parseInt(match[2], 10)
  const year = parseInt(match[3], 10)

  if (month < 1 || month > 12) return false
  if (day < 1 || day > 31) return false
  if (year < 1900 || year > new Date().getFullYear()) return false

  const date = new Date(year, month - 1, day)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return false
  }

  // Not in the future
  return date.getTime() <= Date.now()
}

export const isSequentialPasscode = (str: string): boolean => {
  if (str.length < 3) return false
  const chars = str.split('')
  const isFullAsc = chars.every((ch, i) => i === 0 || Number(ch) - Number(chars[i - 1]) === 1)
  const isFullDesc = chars.every((ch, i) => i === 0 || Number(ch) - Number(chars[i - 1]) === -1)
  if (isFullAsc || isFullDesc) return true

  if (str.length >= 4) {
    const indices = Array.from({ length: str.length - 3 }, (_, idx) => idx)
    return indices.some((start) => {
      const sub = str.slice(start, start + 4).split('')
      const subAsc = sub.every((c, j) => j === 0 || Number(c) - Number(sub[j - 1]) === 1)
      const subDesc = sub.every((c, j) => j === 0 || Number(c) - Number(sub[j - 1]) === -1)
      return subAsc || subDesc
    })
  }
  return false
}

export const isRepeatingPatternPasscode = (str: string): boolean => {
  if (/^(\d{2,3})\1+$/.test(str)) return true
  if (/^(\d)\1(\d)\2(\d)\3$/.test(str) || /^(\d)\1(\d)\2$/.test(str)) return true
  return false
}

export const validateField = (
  name: keyof RegistrationFormState,
  values: RegistrationFormState
): string | undefined => {
  const val = values[name]

  switch (name) {
    case 'fullName': {
      const trimmed = String(val ?? '').trim()
      if (!trimmed) return 'Full Name is required'
      if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
        return 'Full Name should only contain letters'
      }
      if (trimmed.length < 2) return 'Full Name must be at least 2 characters'
      return undefined
    }

    case 'email': {
      const trimmed = String(val ?? '').trim()
      if (!trimmed) return 'Email is required'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        return 'Please enter a valid email address'
      }
      return undefined
    }

    case 'gender': {
      const str = String(val ?? '').trim()
      if (!str) return 'Please select your gender'
      return undefined
    }

    case 'dob': {
      const str = String(val ?? '').trim()
      if (!str) return 'Date of Birth is required'
      if (!isValidDateString(str)) {
        return 'Enter a valid date in DD-MM-YYYY format'
      }
      return undefined
    }

    case 'fatherSpouseName': {
      const trimmed = String(val ?? '').trim()
      if (trimmed) {
        if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
          return 'Name should only contain letters'
        }
        if (trimmed.length < 2) {
          return 'Please enter a valid name'
        }
      }
      return undefined
    }

    case 'pan': {
      return validatePan(String(val ?? '')) || undefined
    }

    case 'aadhaar': {
      return validateAadhaar(String(val ?? '')) || undefined
    }

    case 'mobile': {
      const str = String(val ?? '').replace(/\D/g, '')
      return validateMobileNumber(str) || undefined
    }

    case 'addressLine1': {
      const trimmed = String(val ?? '').trim()
      if (!trimmed) return 'Address Line 1 is required'
      if (trimmed.length < 3) {
        return 'Please enter a valid address'
      }
      return undefined
    }

    case 'city': {
      const trimmed = String(val ?? '').trim()
      if (!trimmed) return 'City is required'
      if (!/^[a-zA-Z0-9\s.,'()/-]{2,}$/.test(trimmed)) {
        return 'Please enter a valid city'
      }
      return undefined
    }

    case 'pincode': {
      const str = String(val ?? '').replace(/\D/g, '')
      if (!str) return 'PIN Code is required'
      if (str.length !== 6) {
        return 'PIN Code must be exactly 6 digits'
      }
      return undefined
    }

    case 'state': {
      const str = String(val ?? '').trim()
      if (!str) return 'Please select your State / UT'
      return undefined
    }

    case 'password': {
      const str = String(val ?? '').replace(/\D/g, '')
      if (!str) return 'Passcode is required'
      if (str.length < 4 || str.length > 6) {
        return 'Passcode must be 4 to 6 digits'
      }

      // Rule 1: Mobile number consecutive 6-digit match rejection
      const cleanMobile = String(values.mobile ?? '').replace(/\D/g, '')
      const mobile10 = cleanMobile.slice(-10)
      if (cleanMobile.length >= 6 && (cleanMobile.includes(str) || (mobile10.length >= 6 && mobile10.includes(str)))) {
        return 'Passcode cannot be part of your mobile number.'
      }

      // Rule 2: Repeated digits rejection
      if (/^(\d)\1+$/.test(str) || /(\d)\1{2,}/.test(str)) {
        return 'Passcode cannot contain the same digit repeatedly.'
      }

      // Rule 3: Sequential numbers rejection
      if (isSequentialPasscode(str)) {
        return 'Passcode cannot be a sequential number.'
      }

      // Rule 4: Repeating patterns rejection
      if (isRepeatingPatternPasscode(str)) {
        return 'Choose a less predictable passcode.'
      }

      return undefined
    }

    case 'confirmPassword': {
      const str = String(val ?? '').replace(/\D/g, '')
      if (!str) return 'Confirm Passcode is required'
      if (str !== values.password) return 'Passcodes do not match'
      return undefined
    }

    case 'agreeTerms': {
      if (!values.agreeTerms) return 'You must agree to the Terms of Service'
      return undefined
    }

    default:
      return undefined
  }
}

const MANDATORY_FIELDS: Array<keyof RegistrationFormState> = [
  'fullName',
  'email',
  'gender',
  'dob',
  'pan',
  'aadhaar',
  'mobile',
  'addressLine1',
  'city',
  'pincode',
  'state',
  'password',
  'confirmPassword',
  'agreeTerms',
]

export const checkIsFormValid = (values: RegistrationFormState): boolean => {
  const mandatoryValid = MANDATORY_FIELDS.every(
    (field) => validateField(field, values) === undefined
  )

  const optionalValid =
    !values.fatherSpouseName ||
    validateField('fatherSpouseName', values) === undefined

  return mandatoryValid && optionalValid
}
