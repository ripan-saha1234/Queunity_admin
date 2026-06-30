/**
 * Random ID & number helpers for temporary client-side IDs.
 *
 * Use these only until the backend generates and returns official IDs.
 * In production, prefer the ID from the API response after create.
 *
 * ─── How to use ─────────────────────────────────────────────────────────────
 *
 * 1) generateRandomId(prefix)
 *    String ID with a prefix. Good for: school_id, offense_id, charity_id, etc.
 *
 *    import { generateRandomId } from '../utils/randomId';
 *    const school_id = generateRandomId('SC');   // e.g. "SC-48291736"
 *
 *    Where to wire later:
 *    - src/api/school.js → buildSchoolPayload() → school_id field
 *    - offence / charity create payloads when those APIs are integrated
 *
 * 2) generateRandomNumber(min, max)
 *    Numeric ID. Good for: case_number, order numbers, sequence fields.
 *
 *    import { generateRandomNumber } from '../utils/randomId';
 *    const case_number = generateRandomNumber(1000, 99999);  // e.g. 48291
 *
 *    Where to wire later:
 *    - any API field that expects a number instead of a string id
 *
 * 3) generateCaseIdentifiers()
 *    Paired case_id + case_number (number part is shared). Used on add case submit.
 *
 *    import { generateCaseIdentifiers } from '../utils/randomId';
 *    const { case_id, case_number } = generateCaseIdentifiers();
 *    // case_id: "CASE-48291", case_number: 48291
 *
 *    Currently integrated in:
 *    - src/context/CaseFormContext.jsx → buildPayload()
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** @returns {string} e.g. "CASE-48291736" */
export function generateRandomId(prefix = 'ID') {
  const suffix = `${Date.now()}${Math.floor(Math.random() * 1000)}`.slice(-8);
  return `${prefix}-${suffix}`;
}

/** @returns {number} integer between min and max (inclusive) */
export function generateRandomNumber(min = 1000, max = 99999) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a matching case_id string and case_number for add_case payload.
 * @returns {{ case_id: string, case_number: number }}
 */
export function generateCaseIdentifiers() {
  const case_number = generateRandomNumber(1000, 99999);
  return {
    case_id: `CASE-${case_number}`,
    case_number,
  };
}
