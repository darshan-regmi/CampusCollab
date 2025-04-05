import { body } from 'express-validator';

export const createSkillValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title must be less than 100 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required'),
  body('price')
    .isNumeric()
    .withMessage('Price must be a number')
    .custom((value) => value >= 0)
    .withMessage('Price cannot be negative'),
  body('duration')
    .isNumeric()
    .withMessage('Duration must be a number')
    .custom((value) => value >= 15)
    .withMessage('Duration must be at least 15 minutes'),
  body('location')
    .isIn(['online', 'in-person', 'hybrid'])
    .withMessage('Location must be online, in-person, or hybrid'),
  body('availability')
    .isArray()
    .withMessage('Availability must be an array')
    .notEmpty()
    .withMessage('At least one availability slot is required'),
  body('availability.*.day')
    .isIn(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'])
    .withMessage('Invalid day'),
  body('availability.*.startTime')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Start time must be in HH:mm format'),
  body('availability.*.endTime')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('End time must be in HH:mm format')
    .custom((endTime, { req }) => {
      const startTime = req.body.availability.find(
        (slot: any) => slot.endTime === endTime
      ).startTime;
      return startTime < endTime;
    })
    .withMessage('End time must be after start time'),
];

export const updateSkillValidator = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 100 })
    .withMessage('Title must be less than 100 characters'),
  body('description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Description cannot be empty'),
  body('category')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Category cannot be empty'),
  body('price')
    .optional()
    .isNumeric()
    .withMessage('Price must be a number')
    .custom((value) => value >= 0)
    .withMessage('Price cannot be negative'),
  body('duration')
    .optional()
    .isNumeric()
    .withMessage('Duration must be a number')
    .custom((value) => value >= 15)
    .withMessage('Duration must be at least 15 minutes'),
  body('location')
    .optional()
    .isIn(['online', 'in-person', 'hybrid'])
    .withMessage('Location must be online, in-person, or hybrid'),
  body('availability')
    .optional()
    .isArray()
    .withMessage('Availability must be an array')
    .notEmpty()
    .withMessage('At least one availability slot is required'),
];
