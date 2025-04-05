import { Router } from 'express';
import {
  createReview,
  getSkillReviews,
  toggleVote,
} from '../controllers/review.controller';
import { protect } from '../middleware/auth';
import { validate } from '../middleware/validate';
import {
  createReviewValidator,
  toggleVoteValidator,
} from '../validators/review.validator';

const router = Router();

// Public routes
router.get('/skill/:skillId', getSkillReviews);

// Protected routes
router.use(protect);
router.post('/', validate(createReviewValidator), createReview);
router.post('/:id/vote', validate(toggleVoteValidator), toggleVote);

export default router;
