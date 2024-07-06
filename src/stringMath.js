import CheckCondition from './checkCondition.js';

/**
 * Class for performing basic mathematical operations on strings.
 */
export default class StringMath {
  /**
   * Supported mathematical operators.
   * @constant {string[]}
   */
  static OPERATORS = ['+', '-', '/', '*', '^'];

  /**
   * Resolves the given mathematical expression string.
   *
   * @param {string} value - The expression string to resolve.
   * @returns {number|string} - The result of the mathematical operation or the original string if no operation is performed.
   */
  static resolve(value) {
    value = value.trim();

    if (value.includes('(') && value.includes(')')) {
      return CheckCondition.resolveBrackets(value, StringMath.resolve);
    } else if (value.includes('+')) {
      return StringMath.resolveSum(value);
    } else if (value.includes('-')) {
      return StringMath.resolveSub(value);
    } else if (value.includes('/')) {
      return StringMath.resolveDivi(value);
    } else if (value.includes('*')) {
      return StringMath.resolveMulti(value);
    } else if (value.includes('^')) {
      return StringMath.resolveExpo(value);
    } else {
      return value;
    }
  }

  /**
   * Resolves a sum operation.
   *
   * @param {string} value - The expression string containing '+'.
   * @returns {number} - The result of the sum.
   */
  static resolveSum(value) {
    const [firstValue, secondValue] = value.trim().split('+');
    return Math.fround(Number(firstValue) + Number(secondValue));
  }

  /**
   * Resolves a subtraction operation.
   *
   * @param {string} value - The expression string containing '-'.
   * @returns {number} - The result of the subtraction.
   */
  static resolveSub(value) {
    const [firstValue, secondValue] = value.trim().split('-');
    return Math.fround(Number(firstValue) - Number(secondValue));
  }

  /**
   * Resolves a division operation.
   *
   * @param {string} value - The expression string containing '/'.
   * @returns {number} - The result of the division.
   */
  static resolveDivi(value) {
    const [firstValue, secondValue] = value.trim().split('/');
    return Math.fround(Number(firstValue) / Number(secondValue));
  }

  /**
   * Resolves a multiplication operation.
   *
   * @param {string} value - The expression string containing '*'.
   * @returns {number} - The result of the multiplication.
   */
  static resolveMulti(value) {
    const [firstValue, secondValue] = value.trim().split('*');
    return Math.fround(Number(firstValue) * Number(secondValue));
  }

  /**
   * Resolves an exponentiation operation.
   *
   * @param {string} value - The expression string containing '^'.
   * @returns {number} - The result of the exponentiation.
   */
  static resolveExpo(value) {
    const [firstValue, secondValue] = value.trim().split('^');
    return Math.pow(Number(firstValue), Number(secondValue));
  }
}