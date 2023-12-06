import { body } from 'express-validator';

export const meeting_valid = [
    body('book', 'Book must be specified')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Поле не может быть пустым'),
    body('place')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Поле не может быть пустым'), 
    body('date')
        .optional({ values: 'falsy' })
        .isISO8601()
        .toDate()
        .withMessage('Не верный формат даты'),
  ];