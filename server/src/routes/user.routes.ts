import { Router } from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  toggleFavorite,
} from '../controllers/user.controller';
import { protect } from '../middleware/auth';
import { validate } from '../middleware/validate';
import {
  registerValidator,
  loginValidator,
  updateProfileValidator,
} from '../validators/user.validator';

const router = Router();

// Public routes
router.post('/register', validate(registerValidator), register);
router.post('/login', validate(loginValidator), login);

// Protected routes
router.use(protect);
router.get('/profile', getProfile);
router.patch('/profile', validate(updateProfileValidator), updateProfile);
router.post('/favorites/:skillId', toggleFavorite);

export default router;
