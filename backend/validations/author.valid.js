import { body } from 'express-validator';

export const author_valid = [
    body('first_name')
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage('Поле не может быть пустым'),
    body('family_name')
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage('Поле не может быть пустым'),
  ];
  