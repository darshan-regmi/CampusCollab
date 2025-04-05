import { Router } from 'express';
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
} from '../controllers/booking.controller';
import { protect } from '../middleware/auth';
import { validate } from '../middleware/validate';
import {
  createBookingValidator,
  getBookingsValidator,
  updateBookingStatusValidator,
} from '../validators/booking.validator';

const router = Router();

// All booking routes are protected
router.use(protect);

router.post('/', validate(createBookingValidator), createBooking);
router.get('/', validate(getBookingsValidator), getBookings);
router.get('/:id', getBookingById);
router.patch('/:id/status', validate(updateBookingStatusValidator), updateBookingStatus);

export default router;
