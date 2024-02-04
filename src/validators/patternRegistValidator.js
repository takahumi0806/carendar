const { check } = require('express-validator');

module.exports = [
  check('startDate').not().isEmpty().withMessage('スタートする日付が入力されていません'),
  check('patternStart1').
    custom((value, { req }) => {
      if (req.body.patternStart1 && req.body.patternHoliday1==undefined || req.body.patternStart1=="" && req.body.patternHoliday1=="休") {
        return true;
      }
    }).withMessage('時間か休みを入力してください'),
];