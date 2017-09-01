/**
 * Width Converter
 * Copyright 2017 Yanbin Ma under MIT
 * https://github.com/myanbin
 */

const CODEPOINT_BASE = '\uff10'.codePointAt(0) - '0'.codePointAt(0);

const RESERVED_PUNCTUATION = '';

/* Reference: https://en.wikipedia.org/wiki/Halfwidth_and_fullwidth_forms */
const FULL_SYMBOLS = [
  0xff02, 0xff03, 0xff04, 0xff05, 0xff06, 0xff07, 0xff0a, 0xff0b,
  0xff0d, 0xff0e, 0xff0f, 0xff1c, 0xff1d, 0xff1e, 0xff20, 0xff3c,
  0xff3e, 0xff3f, 0xff40, 0xff5b, 0xff5c, 0xff5d,
];
const HALF_SYMBOLS = FULL_SYMBOLS.map(function (codePoint) {
  return codePoint - CODEPOINT_BASE;
});


function _mergeOptions (_options) {
  const defaultOptions = {
    digit: true,              // 将全角数字转换成半角
    alpha: true,              // 将全角字母转换成半角
    space: true,              // 将全角空格转换成半角
    symbol: true,             // 将全角的 #、$、%、& 等特殊字符转换成半角（不包括中文标点符号）
    punctucation: false,      // 将中文标点符号转换成对应英文标点符号（在中文环境中不推荐使用）
    smart_mode: true,         // 智能模式。可以识别出数值、网址等内容并进行精确转换
  };
  return Object.assign(defaultOptions, _options);
}


/**
 * Full width to Half width Tramsformer
 * @param {string} source Source text (full width)
 * @param {object} options Options
 */
function _full2half (source, options) {
  const sourceSize = source.length;
  const _options = _mergeOptions(options);
  let output = [];
  for (let index = 0; index < sourceSize; index++) {
    const codePoint = source.codePointAt(index);
    if (/* Digit Flag = */_options.digit
          && codePoint >= 0xff10 && codePoint <= 0xff19) {
      output[index] = String.fromCodePoint(codePoint - CODEPOINT_BASE);
    } else if (/* Alpha Flag = */_options.alpha
          && (codePoint >= 0xff21 && codePoint <= 0xff3a) || (codePoint >= 0xff41 && codePoint <= 0xff5a)) {
      output[index] = String.fromCodePoint(codePoint - CODEPOINT_BASE);
    } else if (/* Symbol Flag */_options.symbol
          && FULL_SYMBOLS.indexOf(codePoint) !== -1) {
      output[index] = String.fromCodePoint(codePoint - CODEPOINT_BASE);
    } else if (/* Punctucation Flag */_options.punctucation) {
      output[index] = source[index];
    } else if (/* Space Flag = */_options.space
          && codePoint === 0x3000/* Fullwidth Space */) {
      output[index] = String.fromCodePoint(0x0020);
    } else {
      output[index] = source[index];
    }
  }
  let destination = output.join('');
  if (/* Smart Mode = */_options.smart_mode) {
    if (/* Digit Flag = */_options.digit) {
      destination = destination.replace(/\d[\uff0c]\d/g, function (match) {
        return match.replace(/[\uff0c]/, ',');
      });
    }
    if (/* Symbol Flag */_options.symbol) {
      destination = destination.replace(/https?[\uff1a]/g, function (match) {
        return match.replace(/[\uff1a]/, ':');
      });
    }
  }
  return destination;
}


/**
 * Half width to Full width Tramsformer
 * @param {string} source Source text (half width)
 * @param {object} options Options
 */
function _half2full (source, options) {
  const sourceSize = source.length;
  const _options = _mergeOptions(options);
  let output = [];
  for (let index = 0; index < sourceSize; index++) {
    const codePoint = source.codePointAt(index);
    if (/* Digit Flag = */_options.digit
          && codePoint >= 0x0030 && codePoint <= 0x0039) {
      output[index] = String.fromCodePoint(codePoint + CODEPOINT_BASE);
    } else if (/* Alpha Flag = */_options.alpha
          && (codePoint >= 0x0041 && codePoint <= 0x005a) || (codePoint >= 0x0061 && codePoint <= 0x007a)) {
      output[index] = String.fromCodePoint(codePoint + CODEPOINT_BASE);
    } else if (/* Symbol Flag */_options.symbol
          && HALF_SYMBOLS.indexOf(codePoint) !== -1) {
      output[index] = String.fromCodePoint(codePoint + CODEPOINT_BASE);
    } else if (/* Punctucation Flag */_options.punctucation) {
      output[index] = source[index];
    } else if (/* Space Flag = */_options.space
          && codePoint === 0x0020/* Fullwidth Space */) {
      output[index] = String.fromCodePoint(0x3000);
    } else {
      output[index] = source[index];
    }
  }
  let destination = output.join('');
  if (/* Smart Mode = */_options.smartMode) {
    if (/* Digit Flag = */_options.digit) {
      destination = destination.replace(/\d[,]\d{3}/g, function (match) {
        return match.replace(/[,]/, String.fromCodePoint(0xff0c));
      });
    }
    if (/* Symbol Flag */_options.symbol) {
      destination = destination.replace(/https?[:]/g, function (match) {
        return match.replace(/[:]/, String.fromCodePoint(0xff1a));
      });
    }
  }
  return destination;
}


exports.half2full = _half2full;
exports.full2half = _full2half;