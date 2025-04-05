import { Router } from 'express';
import userRoutes from './user.routes';
import skillRoutes from './skill.routes';
import bookingRoutes from './booking.routes';
import reviewRoutes from './review.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/skills', skillRoutes);
router.use('/bookings', bookingRoutes);
router.use('/reviews', reviewRoutes);

export default router;
