import { parsePhoneNumberWithError } from 'libphonenumber-js'

// Utility function to extract country code
export default function (phoneNumber: string) {
  try {
    const parsedNumber = parsePhoneNumberWithError(phoneNumber[0] === '+' ? phoneNumber : `+${phoneNumber}`)
    return {
      countryCode: phoneNumber[0] === '+' ? `+${parsedNumber.countryCallingCode}` : parsedNumber.countryCallingCode,
      countrySymbol: parsedNumber.country, // Returns ISO 2-letter code (e.g., 'SA', 'EG')
    }
    // Get country code with '+' prefix
  }
  catch (error) {
    console.error('Error parsing phone number:', error)
    return null
  }
}
