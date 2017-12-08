/**
 * validate a China phone number
 */
const PATTERN_PHONE_NUMBER = /^[\d]{11}$/;

/**
 * @param {string} input
 * @return {boolean}
 */
export default function validate(input) {
  if (input.length !== 11) return false;
  return PATTERN_PHONE_NUMBER.test(input);
}
