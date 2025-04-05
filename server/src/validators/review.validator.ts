import { body, param } from 'express-validator';

export const createReviewValidator = [
  body('bookingId')
    .isMongoId()
    .withMessage('Invalid booking ID'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .trim()
    .notEmpty()
    .withMessage('Comment is required')
    .isLength({ min: 10 })
    .withMessage('Comment must be at least 10 characters long'),
];

export const toggleVoteValidator = [
  param('id')
    .isMongoId()
    .withMessage('Invalid review ID'),
  body('voteType')
    .isIn(['up', 'down'])
    .withMessage('Vote type must be either up or down'),
];
