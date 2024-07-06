import { 
  resolve, 
  resolveValue,
  resolveCondition, 
  resolveMath 
} from './src/index.js';

console.log(resolve(`$1`, false)('hello world'));                                  // hello world
console.log(resolve('$1>8')(9))                                                    // true
console.log(resolveValue('name.last')({ name: { first: '...', last:'name' } }));   // name
console.log(resolveValue('$1/arr/array')('a');                                     // ["a", "arr", "array"]
console.log(resolve('$1>$1+1')(resolveValue('age')({ age: 23 })));                 // true
console.log(resolveCondition('(1==2)&&(1!=3||1==0)'));                             // true
console.log(resolveCondition('true'));                                             // true
console.log(resolveMath('1+2'));                                                   // 3
console.log(resolveMath('((1+2)*2)+((4/2)-1)'));                                   // 7