import { deepEqual, advancedSplit } from './utils.js';

/**
 * Class for evaluating logical and comparison conditions.
 */
export default class CheckCondition {
  /**
   * Supported condition operators.
   * @constant {string[]}
   */
  static CONDITIONS = [
    '==',
    '!=',
    '>=',
    '<=',
    '>',
    '<'
  ];

  /**
   * Resolves the given condition string.
   *
   * @param {string} value - The condition string to resolve.
   * @returns {boolean} - The result of the condition evaluation.
   */
  static resolve(value) {
    value = value.trim();

    if (value.includes('(') && value.includes(')')) {
      return CheckCondition.resolveBrackets(value, CheckCondition.resolve);
    } else if (value.includes('||')) {
      return CheckCondition.resolveOr(value, CheckCondition.resolve);
    } else if (value.includes('&&')) {
      return CheckCondition.resolveAnd(value, CheckCondition.resolve);
    } else if (value.includes('==')) {
      return CheckCondition.resolveEqual(value);
    } else if (value.includes('!=')) {
      return CheckCondition.resolveNotEqual(value);
    } else if (value.includes('>=')) {
      return CheckCondition.resolveBiggerOrEqual(value);
    } else if (value.includes('<=')) {
      return CheckCondition.resolveSmallerOrEqual(value);
    } else if (value.includes('>')) {
      return CheckCondition.resolveBigger(value);
    } else if (value.includes('<')) {
      return CheckCondition.resolveSmaller(value);
    } else {
      return Boolean(value);
    }
  }

  /**
   * Resolves 'AND' conditions.
   *
   * @param {string} value - The condition string containing '&&'.
   * @param {Function} [cb=CheckCondition.resolve] - Callback function to resolve individual expressions.
   * @returns {boolean} - The result of the 'AND' condition evaluation.
   */
  static resolveAnd(value, cb = CheckCondition.resolve) {
    return value.split('&&').every(exp => cb(exp.trim()));
  }

  /**
   * Resolves 'OR' conditions.
   *
   * @param {string} value - The condition string containing '||'.
   * @param {Function} [cb=CheckCondition.resolve] - Callback function to resolve individual expressions.
   * @returns {boolean} - The result of the 'OR' condition evaluation.
   */
  static resolveOr(value, cb = CheckCondition.resolve) {
    return value.split('||').some(exp => cb(exp.trim()));
  }

  /**
   * Resolves conditions within brackets.
   *
   * @param {string} value - The condition string containing brackets.
   * @param {Function} [cb=CheckCondition.resolve] - Callback function to resolve individual expressions.
   * @returns {boolean|null} - The result of the bracketed condition evaluation, or null if brackets are unmatched.
   */
  static resolveBrackets(value, cb = CheckCondition.resolve) {
    if (!CheckCondition.isBracktesClosed(value)) return null;
    const splits = advancedSplit(value, { start: '(', end: ')' });
    for (const split of splits)
      value = value.replace(`(${split})`, cb(split.trim()));
    return cb(value);
  }

  /**
   * Resolves '==' conditions.
   *
   * @param {string} value - The condition string containing '=='.
   * @param {Function} [fn=(v) => v] - Callback function to process the values.
   * @returns {boolean} - The result of the '==' condition evaluation.
   */
  static resolveEqual(value, fn = (v) => v) {
    const [firstValue, secondValue] = value.split('==').map(v => v.trim());
    return deepEqual(fn(firstValue), fn(secondValue));
  }

  /**
   * Resolves '!=' conditions.
   *
   * @param {string} value - The condition string containing '!='.
   * @param {Function} [fn=(v) => v] - Callback function to process the values.
   * @returns {boolean} - The result of the '!=' condition evaluation.
   */
  static resolveNotEqual(value, fn = (v) => v) {
    const [firstValue, secondValue] = value.split('!=').map(v => v.trim());
    return !deepEqual(fn(firstValue), fn(secondValue));
  }

  /**
   * Resolves '>' conditions.
   *
   * @param {string} value - The condition string containing '>'.
   * @param {Function} [fn=(v) => v] - Callback function to process the values.
   * @returns {boolean} - The result of the '>' condition evaluation.
   */
  static resolveBigger(value, fn = (v) => v) {
    const [firstValue, secondValue] = value.split('>').map(v => v.trim());
    return fn(firstValue) > fn(secondValue);
  }

  /**
   * Resolves '<' conditions.
   *
   * @param {string} value - The condition string containing '<'.
   * @param {Function} [fn=(v) => v] - Callback function to process the values.
   * @returns {boolean} - The result of the '<' condition evaluation.
   */
  static resolveSmaller(value, fn = (v) => v) {
    const [firstValue, secondValue] = value.split('<').map(v => v.trim());
    return fn(firstValue) < fn(secondValue);
  }

  /**
   * Resolves '>=' conditions.
   *
   * @param {string} value - The condition string containing '>='.
   * @param {Function} [fn=(v) => v] - Callback function to process the values.
   * @returns {boolean} - The result of the '>=' condition evaluation.
   */
  static resolveBiggerOrEqual(value, fn = (v) => v) {
    const [firstValue, secondValue] = value.split('>=').map(v => v.trim());
    return fn(firstValue) >= fn(secondValue);
  }

  /**
   * Resolves '<=' conditions.
   *
   * @param {string} value - The condition string containing '<='.
   * @param {Function} [fn=(v) => v] - Callback function to process the values.
   * @returns {boolean} - The result of the '<=' condition evaluation.
   */
  static resolveSmallerOrEqual(value, fn = (v) => v) {
    const [firstValue, secondValue] = value.split('<=').map(v => v.trim());
    return fn(firstValue) <= fn(secondValue);
  }

  /**
   * Checks if the brackets in a condition string are properly closed.
   *
   * @param {string} value - The condition string to check.
   * @returns {boolean} - True if brackets are properly closed, otherwise false.
   */
  static isBracktesClosed(value) {
    const leftBracktes = value.match(/\(/gi);
    const rightBracktes = value.match(/\)/gi);
    return leftBracktes.length === rightBracktes.length;
  }
}