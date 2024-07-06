<p align="center">
  <img width="500" src="https://raw.githubusercontent.com/NezitX/resolvex/main/assets/logo.png" alt="resolvex">
</p>

<div align="center">
  <b>A simple package to interact with object using string easily.
</b>
</div>

---

<br/>

<div align="center">

[![NPM downloads][download-image]][download-url] &nbsp; &nbsp;
[![NPM version][npm-image]][npm-url] &nbsp; &nbsp;
![License](https://img.shields.io/npm/l/resolvex) &nbsp; &nbsp;

[npm-image]: https://img.shields.io/npm/v/resolvex.svg?color=42cfff

[npm-url]: https://npmjs.org/package/resolvex

[download-image]: https://img.shields.io/npm/dt/resolvex.svg?color=3182b0

[download-url]: https://npmjs.org/package/resolvex

  </div>

<br />

---

## Installation
Install the package using `npm`:
```bash
npm install --save-dev resolvex
```

## Usage
```javascript
import { 
  resolve, 
  resolveObjValue,
  resolveCondition, 
  resolveMath 
} from 'resolvex';

console.log(resolve(`$1`, false)('hello world'));                          // hello world
console.log(resolve('$1>8')(9));                                           // true

console.log(
  resolveObjValue('name.last')({ name: { first: '...', last:'name' } })   // name
);
console.log(resolveObjValue('name.1')({ name: ['...', 'name'] }));        // name
console.log(resolve('$1>$1+1')(resolveObjValue('age')({ age: 23 })));     // true

console.log(resolveCondition('(1==2)&&(1!=3||1==0)'));                    // true
console.log(resolveCondition('true'));                                    // true

console.log(resolveMath('1+2'));                                          // 3
console.log(resolveMath('((1+2)*2)+((4/2)-1)'));                          // 7
```

## Functions
```typescript
resolve(value: string, resolveConditions: boolean, resolveMaths: boolean): Function
```
- `value` the target value for resolve it.
- `resolveConditions` enable/disable resolve any condition in value. default `true`
- `resolveMaths` enable/disable resolve any math in value. default `true`
- that function compine ``, `` together.

<br/>

```typescript
resolveObjValue(value: string): Function
```
- `value` the target value for resolve it.

<br/>

```typescript
resolveCondition(value: string): Boolean
```
- `value` the target value for resolve it.

<br/>

```typescript
resolveMath(value: string): Number
```
- `value` the target value for resolve it.

## Friendly Note
This package is for personal use but i hope this package help someone if needed something like this. 

## Bugs & Feedbacks
any report for bugs or feedbacks you can create [issue here](https://github.com/NezitX/resolvex/issues).

## Contributing
All [Contributing](https://github.com/NezitX/resolvex/pulls) are welcome `:)`

## License
This package is under `MIT` license.