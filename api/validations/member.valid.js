import { body } from 'express-validator';

export const member_valid = [
    body('name')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Поле не может быть пустым'),
    body('phone')
        .trim()
        .isMobilePhone()
        .escape()
        .withMessage('Не правильный номер'),
];