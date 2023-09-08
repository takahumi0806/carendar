const { check } = require('express-validator');

module.exports = [
  check('time').not().isEmpty().withMessage('時間を入力して下さい'),
  check('content').not().isEmpty().withMessage('スケジュールを入力して下さい'),
  check('content').isLength({ max:140 }).withMessage('コンテンツは140字以内にしてください'),
];
