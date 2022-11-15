const { check } = require('express-validator');
module.exports = [
  check('title').not().isEmpty().withMessage('タイトルを入力して下さい'),
  check('content').not().isEmpty().withMessage('コンテンツを入力して下さい'),
  check('content').isLength({ max:140 }).withMessage('コンテンツは140字以内にしてください'),
];