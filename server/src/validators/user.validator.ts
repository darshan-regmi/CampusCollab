import { body } from 'express-validator';

export const registerValidator = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('displayName')
    .trim()
    .notEmpty()
    .withMessage('Display name is required'),
  body('role')
    .optional()
    .isIn(['student', 'tutor'])
    .withMessage('Role must be either student or tutor'),
];

export const loginValidator = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

export const updateProfileValidator = [
  body('displayName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Display name cannot be empty'),
  body('photoURL')
    .optional()
    .isURL()
    .withMessage('Photo URL must be a valid URL'),
];
