var convert = require('../convert.js');

const texts = [
  `岷江流域水质改善明显，优良水体占比同比上升０．５％；劣Ｖ类水体占比同比下降４．５５％。`,
  `“刚毕业工资不高，政府补贴相当于减负了一大部分，这会鼓励毕业生留在一、二线城市。”她说。`,
  `形成《关于加快推进“多证合一”改革的实施意见》并经山西省政府会议研究通过`
];

texts.forEach(function (line) {
  let half = convert.full2half(line);
  console.log(half);
});