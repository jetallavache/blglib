import { body } from 'express-validator';

export const login_valid = [
    body('email')
      .isEmail()
      .withMessage('Неверный формат почты')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 5 })
      .withMessage('Пароль должен содержать минимум 5 символов'),
  ];