import { body } from 'express-validator';

export const author_valid = [
    body('firstName')
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage('Поле не может быть пустым'),
    body('familyName')
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage('Поле не может быть пустым'),
  ];
  