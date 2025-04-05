import { Router } from 'express';
import {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
} from '../controllers/skill.controller';
import { protect } from '../middleware/auth';
import { validate } from '../middleware/validate';
import {
  createSkillValidator,
  updateSkillValidator,
} from '../validators/skill.validator';

const router = Router();

// Public routes
router.get('/', getAllSkills);
router.get('/:id', getSkillById);

// Protected routes
router.use(protect);
router.post('/', validate(createSkillValidator), createSkill);
router.patch('/:id', validate(updateSkillValidator), updateSkill);
router.delete('/:id', deleteSkill);

export default router;
