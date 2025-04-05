import { Request, Response, NextFunction } from 'express';
import { Skill } from '../models/Skill';
import { User } from '../models/User';
import { AppError } from '../middleware/errorHandler';

export const createSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== 'tutor') {
      throw new AppError('Only tutors can create skills', 403);
    }

    const skill = await Skill.create({
      ...req.body,
      tutor: req.userId,
    });

    // Add skill to user's skills array
    user.skills = [...(user.skills || []), skill._id];
    await user.save();

    res.status(201).json({
      status: 'success',
      data: { skill },
    });
  } catch (err) {
    next(err);
  }
};

export const getAllSkills = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      location,
      rating,
      page = 1,
      limit = 10,
    } = req.query;

    // Build query
    const query: any = {};

    if (search) {
      query.$text = { $search: search as string };
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (location) {
      query.location = location;
    }

    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    // Execute query with pagination
    const skip = (Number(page) - 1) * Number(limit);

    const [skills, total] = await Promise.all([
      Skill.find(query)
        .populate('tutor', 'displayName photoURL')
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 }),
      Skill.countDocuments(query),
    ]);

    res.json({
      status: 'success',
      data: {
        skills,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getSkillById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const skill = await Skill.findById(req.params.id).populate(
      'tutor',
      'displayName photoURL'
    );

    if (!skill) {
      throw new AppError('Skill not found', 404);
    }

    res.json({
      status: 'success',
      data: { skill },
    });
  } catch (err) {
    next(err);
  }
};

export const updateSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      throw new AppError('Skill not found', 404);
    }

    if (skill.tutor.toString() !== req.userId) {
      throw new AppError('Not authorized to update this skill', 403);
    }

    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('tutor', 'displayName photoURL');

    res.json({
      status: 'success',
      data: { skill: updatedSkill },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      throw new AppError('Skill not found', 404);
    }

    if (skill.tutor.toString() !== req.userId) {
      throw new AppError('Not authorized to delete this skill', 403);
    }

    await skill.remove();

    // Remove skill from user's skills array
    await User.findByIdAndUpdate(req.userId, {
      $pull: { skills: req.params.id },
    });

    res.json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
