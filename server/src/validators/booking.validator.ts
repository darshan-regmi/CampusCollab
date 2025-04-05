import { body, param, query } from 'express-validator';

export const createBookingValidator = [
  body('skillId')
    .isMongoId()
    .withMessage('Invalid skill ID'),
  body('date')
    .isISO8601()
    .withMessage('Invalid date format')
    .custom((value) => {
      const date = new Date(value);
      const now = new Date();
      return date > now;
    })
    .withMessage('Booking date must be in the future'),
  body('startTime')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Start time must be in HH:mm format'),
  body('endTime')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('End time must be in HH:mm format')
    .custom((endTime, { req }) => {
      return endTime > req.body.startTime;
    })
    .withMessage('End time must be after start time'),
];

export const getBookingsValidator = [
  query('role')
    .optional()
    .isIn(['student', 'tutor'])
    .withMessage('Role must be either student or tutor'),
];

export const updateBookingStatusValidator = [
  param('id')
    .isMongoId()
    .withMessage('Invalid booking ID'),
  body('status')
    .isIn(['confirmed', 'cancelled', 'completed'])
    .withMessage('Invalid status'),
];
