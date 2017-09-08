var convert = require('../convert.js');

const texts = [
  `ｈｅ－"ｌ“ｌ”ｏ，ｗ《ｏ 　ｒｌ》ｄ。１２：２１`,
];
const options = {
  digit: true,              // 将全角数字转换成半角
  alpha: true,              // 将全角字母转换成半角
  space: true,              // 将全角空格转换成半角
  symbol: true,             // 将全角的 #、$、%、& 等特殊字符转换成半角（不包括中文标点符号）
  punctuation: false,      // 将中文标点符号转换成对应英文标点符号（在中文环境中不推荐使用）
  smart_mode: true,         // 智能模式。可以识别出数值、网址等内容并进行精确转换
};

texts.forEach(function (line) {
  let half = convert.full2half(line, options);
  console.log(line, "=>", half);
  console.log(half, "=>", convert.half2full(half, options));
});