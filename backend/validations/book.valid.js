import { body } from 'express-validator';

export const book_valid = [
  body('title')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Поле не может быть пустым'),
  body('author')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Поле не может быть пустым'),
  ];
  