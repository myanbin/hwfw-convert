let assert = require('assert');
let convert = require('../convert.js')

describe('全半角转换', () => {

  let half2full, full2half;

  let options = {
    digit: true,
    alpha: true,
    space: true,
    symbol: true,
    punctucation: false,
    smart_mode: true,
  }
  
  before(function () {
    half2full = convert.half2full;
    full2half = convert.full2half;
  });

  describe('全角 => 半角', () => {
    it('默认参数下，中文标点符号（，。等）不会被转换为半角', () => {
      const full = '目前，ＧｉｔＬａｂ系统运行正常。';
      const half = '目前，GitLab系统运行正常。';
      assert.equal(full2half(full), half);
    });
    it('默认参数下，全角的空格会转换为半角', () => {
      const full = '今年Ｑ４季度，Ａｐｐｌｅ公司的ｉＰｈｏｎｅ　８　Ｐｌｕｓ大卖。';
      const half = '今年Q4季度，Apple公司的iPhone 8 Plus大卖。';
      assert.equal(full2half(full), half);
    });
    it('默认参数下，数字中的千位分隔符和小数点应该被转换为半角形式', () => {
      const full = '今年的ｉＰｈｏｎｅ卖９，９９９．９元。';
      const half = '今年的iPhone卖9,999.9元。';
      assert.equal(full2half(full), half);
    });
    it('默认参数下，特殊符号会被转换为对应的半角形式', () => {
      const full = '＃Ｊｅｋｙｌｌ＆Ｈｙｄｅ．　＞＞　＿１００％＿纯＠';
      const half = '#Jekyll&Hyde. >> _100%_纯@';
      assert.equal(full2half(full), half);
    });
    it('默认参数下，网址中的全角符号应当被转换为半角形式', () => {
      const full = '我的博客地址是ｈｔｔｐｓ：／／ｍｙａｎｂｉｎ．ｇｉｔｈｕｂ．ｉｏ';
      const half = '我的博客地址是https://myanbin.github.io';
      assert.equal(full2half(full), half);
    });
  });

  describe('半角 => 全角', () => {
    it('默认参数下，中文标点符号（，。等）不会被转换为半角', () => {
      const half = '目前，GitLab系统运行正常。';
      const full = '目前，ＧｉｔＬａｂ系统运行正常。';
      assert.equal(half2full(half), full);
    });
    it('默认参数下，半角的空格会转换为全角', () => {
      const half = '今年Q4季度，Apple公司的iPhone 8 Plus大卖。';
      const full = '今年Ｑ４季度，Ａｐｐｌｅ公司的ｉＰｈｏｎｅ　８　Ｐｌｕｓ大卖。';
      assert.equal(half2full(half), full);
    });
    it('默认参数下，数字中的千位分隔符和小数点应该被转换为半角形式', () => {
      const half = '今年的iPhone卖9,999.9元。';
      const full = '今年的ｉＰｈｏｎｅ卖９，９９９．９元。';
      assert.equal(half2full(half), full);
    });
    it('默认参数下，特殊符号会被转换为对应的半角形式', () => {
      const half = '#Jekyll&Hyde. >> _100%_纯@';
      const full = '＃Ｊｅｋｙｌｌ＆Ｈｙｄｅ．　＞＞　＿１００％＿纯＠';
      assert.equal(half2full(half), full);
    });
    it('默认参数下，网址中的全角符号应当被转换为半角形式', () => {
      const half = '我的博客地址是https://myanbin.github.io';
      const full = '我的博客地址是ｈｔｔｐｓ：／／ｍｙａｎｂｉｎ．ｇｉｔｈｕｂ．ｉｏ';
      assert.equal(half2full(half), full);
    });
  });
});