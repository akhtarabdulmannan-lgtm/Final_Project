/**
 * IBAN validation per ISO 13616.
 *
 * Two independent checks must both pass:
 *   1. Structure — known country code and the exact national length.
 *   2. Checksum — MOD-97-10 over the rearranged string must equal 1.
 *
 * The validator that shipped previously checked total length only, so every
 * malformed input was reported as valid.
 */

export interface IbanCountry {
  code: string;
  country: string;
  length: number;
  example: string;
}

export const ibanCountries: IbanCountry[] = [
  { code: 'GB', country: 'United Kingdom', length: 22, example: 'GB29 NWBK 6016 1331 9268 19' },
  { code: 'DE', country: 'Germany', length: 22, example: 'DE89 3704 0044 0532 0130 00' },
  { code: 'FR', country: 'France', length: 27, example: 'FR14 2004 1010 0505 0001 3M02 606' },
  { code: 'ES', country: 'Spain', length: 24, example: 'ES91 2100 0418 4502 0005 1332' },
  { code: 'IT', country: 'Italy', length: 27, example: 'IT60 X054 2811 1010 0000 0123 456' },
  { code: 'NL', country: 'Netherlands', length: 18, example: 'NL91 ABNA 0417 1643 00' },
  { code: 'CH', country: 'Switzerland', length: 21, example: 'CH93 0076 2011 6238 5295 7' },
  { code: 'AE', country: 'United Arab Emirates', length: 23, example: 'AE07 0331 2345 6789 0123 456' },
  { code: 'SA', country: 'Saudi Arabia', length: 24, example: 'SA03 8000 0000 6080 1016 7519' },
  { code: 'PK', country: 'Pakistan', length: 24, example: 'PK97 HABB 0000 1111 2222 3333' },
];

const MIN_IBAN_LENGTH = 15;
const MAX_IBAN_LENGTH = 34;

/** Strips spaces and upper-cases the input the way a bank form would. */
export function normaliseIban(value: string): string {
  return value.replace(/\s+/g, '').toUpperCase();
}

/** Converts letters to digits: A=10, B=11 … Z=35. */
function lettersToDigits(value: string): string {
  return value.replace(/[A-Z]/g, (char) => String(char.charCodeAt(0) - 55));
}

/**
 * True when the MOD-97-10 remainder is 1. Uses an incremental modulo so very
 * long IBANs never overflow a numeric parse.
 */
export function passesMod97(iban: string): boolean {
  const rearranged = `${iban.slice(4)}${iban.slice(0, 4)}`;
  const digits = lettersToDigits(rearranged);
  if (!/^\d+$/.test(digits)) return false;

  let remainder = 0;
  for (const digit of digits) {
    remainder = (remainder * 10 + Number(digit)) % 97;
  }
  return remainder === 1;
}

export interface IbanAnalysis {
  isValid: boolean;
  message?: string;
  country?: string;
  checkDigits?: string;
  bankCode?: string;
  accountNumber?: string;
}

/**
 * Validates an IBAN and, only if it is genuinely valid, extracts its parts.
 * Structural fields are never reported for an invalid IBAN, because showing
 * a "BIC" derived from nonsense is exactly what misled users before.
 */
export function analyseIban(rawInput: string): IbanAnalysis {
  const clean = normaliseIban(rawInput);

  if (!clean) {
    return { isValid: false, message: 'Enter an IBAN to validate.' };
  }

  if (clean.length < MIN_IBAN_LENGTH || clean.length > MAX_IBAN_LENGTH) {
    return {
      isValid: false,
      message: `Invalid IBAN length. An international IBAN is between ${MIN_IBAN_LENGTH} and ${MAX_IBAN_LENGTH} characters; this one has ${clean.length}.`,
    };
  }

  if (!/^[A-Z]{2}/.test(clean)) {
    return {
      isValid: false,
      message: 'The first two characters must be a country code made of letters.',
    };
  }

  if (!/^\d{2}/.test(clean.slice(2))) {
    return { isValid: false, message: 'Characters 3 and 4 must be the two check digits.' };
  }

  if (!/^[A-Z0-9]+$/.test(clean)) {
    return {
      isValid: false,
      message: 'An IBAN contains only letters A–Z and digits 0–9. Remove any other characters.',
    };
  }

  const countryCode = clean.slice(0, 2);
  const countryMatch = ibanCountries.find((c) => c.code === countryCode);

  if (!countryMatch) {
    return {
      isValid: false,
      message: `“${countryCode}” is not a country we can validate. We support ${ibanCountries
        .map((c) => c.code)
        .join(', ')}.`,
    };
  }

  if (clean.length !== countryMatch.length) {
    return {
      isValid: false,
      message: `A ${countryMatch.country} IBAN must be exactly ${countryMatch.length} characters; this one has ${clean.length}.`,
    };
  }

  if (!passesMod97(clean)) {
    return {
      isValid: false,
      message: 'The IBAN check digits do not match the account number — this IBAN is not valid.',
    };
  }

  return {
    isValid: true,
    country: countryMatch.country,
    checkDigits: clean.slice(2, 4),
    bankCode: clean.slice(4, 8),
    accountNumber: clean.slice(8),
    message: 'Valid IBAN — checksum and structure both verified.',
  };
}
