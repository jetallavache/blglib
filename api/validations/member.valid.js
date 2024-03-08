import { body } from 'express-validator';

export const member_valid = [
    body('name')
        .trim()
        .isLength({ min: 1})
        .escape()
        .withMessage('Поле не может быть пустым'),
    body('name')
        .trim()
        .isLength({ max: 100 })
        .escape()
        .withMessage('Поле не может иметь более 100 символов'),
    body('phone')
        .trim()
        .isMobilePhone()
        .escape()
        .withMessage('Неправильный номер'),
    body('message')
        .trim()
        .isLength({ max: 200 })
        .withMessage('Поле не может иметь более 200 символов'),
];