import { parseValue } from './utils.js';
import CheckCondition from './checkCondition.js';
import StringMath from './stringMath.js';

export function resolve(value, resolveConditions = true, resolveMaths = true) {
  return (...args) => {
    value = args.reduce((acc, cur, i) => acc.replace(new RegExp(`\\$${i + 1}`, 'g'), cur), value);
    if (resolveMaths && (StringMath.OPERATORS).some(oper => value?.indexOf(oper) > -1)) 
      value = resolveMath(value);
    if (resolveConditions && (CheckCondition.CONDITIONS).some(cond => value?.indexOf(cond) > -1))  
      value = resolveCondition(value);
    return value;
  };
};

export function resolveObjValue(str) {
  return (obj) => str.trim().split('.').reduce((o, k) => o?.[k], obj);
};

export function resolveCondition(value) {
  return CheckCondition.resolve(value);
};

export function resolveMath(value) {
  return StringMath.resolve(value);
};