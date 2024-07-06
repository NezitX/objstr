import { 
  resolve, 
  resolveObjValue,
  resolveCondition, 
  resolveMath 
} from './src/index.js';

console.log(resolve(`$1`, false)('hello world'));                                  // hello world
console.log(resolve('$1>8')(9))                                                    // true
console.log(resolveObjValue('name.last')({ name: { first: '...', last:'name' } }));   // name
console.log(resolveObjValue('name.1')({ name: ['...', 'name'] }));   // name
console.log(resolve('$1>$1+1')(resolveObjValue('age')({ age: 23 })));                 // true
console.log(resolveCondition('(1==2)&&(1!=3||1==0)'));                             // true
console.log(resolveCondition('true'));                                             // true
console.log(resolveMath('1+2'));                                                   // 3
console.log(resolveMath('((1+2)*2)+((4/2)-1)'));                                   // 7