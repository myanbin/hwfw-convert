# hwfw-convert

A simple converter between half width and full width character.


## Install

```sh
npm install --save
```


## Usage

```js
const convert = require('../convert.js');

const text = `岷江流域水质改善明显，优良水体占比同比上升０．５％。`;
const half = convert.full2half(full, options);
// Result: 岷江流域水质改善明显，优良水体占比同比上升0.5%。
const full = convert.half2full(half, options);
// Result: 岷江流域水质改善明显，优良水体占比同比上升０．５％。
```


## Options

```js
const options = {
  digit: true,              // 将全角数字转换成半角
  alpha: true,              // 将全角字母转换成半角
  space: true,              // 将全角空格转换成半角
  symbol: true,             // 将全角的 #、$、%、& 等特殊字符转换成半角（不包括中文标点符号）
  punctucation: false,      // 将中文标点符号转换成对应英文标点符号（在中文环境中不推荐使用）
  smart_mode: true,         // 智能模式。可以识别出数值、网址等内容并进行精确转换
};
```


## Issue

https://github.com/myanbin/hwfw-convert/issues

## License

[MIT](https://github.com/myanbin/hwfw-convert/blob/master/LICENSE.md)