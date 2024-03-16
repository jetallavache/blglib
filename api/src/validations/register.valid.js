import { body } from 'express-validator';

export const register_valid = [
    body('email')
      .isEmail()
      .withMessage('Неверный формат почты')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 5 })
      .withMessage('Пароль должен содержать минимум 5 символов'),
    body('fullName')
      .isLength({ min: 1 })
      .withMessage('Поле не может быть пусты'),
    body('avatarUrl')
      .optional()
      .isURL()
      .withMessage('Неверная ссылка на аватарку'),
  ];
  