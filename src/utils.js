/**
 * Parses a given string and returns the appropriate value.
 * If the value contains '/' or ':', it splits and parses them recursively.
 *
 * @param {string} str - The string to parse.
 * @returns {*} - The parsed value.
 */
export function parseValue(str) {
  const value = parseData(str);
  const valueType = typeOf(value);
  if (valueType === 'string') {
    if (value.includes('/')) return value.split('/').map(v => parseValue(v));
    if (value.includes(':')) {
      const [key, v] = value.split(':');
      return { [key]: parseValue(v) };
    };
  };

  return value;
}

/**
 * Parses a string and returns the appropriate data type.
 * Handles numbers, bigints, null, undefined, booleans, and JSON.
 *
 * @param {string} str - The string to parse.
 * @returns {*} - The parsed value.
 */
export function parseData(str) {
  if (str === "") return str;
  if (!isNaN(Number(str)) && Number.isSafeInteger(Number(str))) return Number(str);
  if ((!isNaN(Number(str)) && !Number.isSafeInteger(str)) || isBigInt(str)) return BigInt(str.replace("n", ""));
  if (str === "null") return null;
  if (str === "undefined") return undefined;
  if (str === "true" || str === "false") return str === "true";

  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
}

/**
 * Checks if a string represents a BigInt.
 *
 * @param {string} string - The string to check.
 * @returns {boolean} - True if the string is a BigInt, otherwise false.
 */
function isBigInt(string) {
  return string.match(/^-?\d+n$/) !== null;
}

/**
 * Deeply compares two values for equality.
 *
 * @param {*} v1 - The first value to compare.
 * @param {*} v2 - The second value to compare.
 * @returns {boolean} - True if the values are deeply equal, otherwise false.
 */
export function deepEqual(v1, v2) {
  if (v1 === v2) return true;
  if (v1 === null || v2 === null || typeof v1 !== 'object' || typeof v2 !== 'object') return false;

  const keys1 = Object.keys(v1);
  const keys2 = Object.keys(v2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!v2.hasOwnProperty(key)) return false;
    if (!deepEqual(v1[key], v2[key])) return false;
  }

  return true;
}

/**
 * Splits a string into parts based on specified start and end characters, considering nested structures.
 *
 * @param {string} text - The text to split.
 * @param {Object} obj - An object containing start and end characters.
 * @param {string} obj.start - The starting character for splitting.
 * @param {string} obj.end - The ending character for splitting.
 * @returns {string[]} - An array of split strings.
 */
export function advancedSplit(text, { start, end }) {
  const result = [];
  const src = text.split('');
  let depth = 0;
  let current = '';

  for (let i = 0; i < src.length; i++) {
    let char = src[i];
    if (char === start) {
      if (depth > 0) current += char;
      depth++;
      continue;
    } else if (char === end) {
      depth--;
      if (depth === 0) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
      continue;
    }

    if (depth > 0) current += char;
  }

  if (current.length > 0) result.push(current);
  return result;
}