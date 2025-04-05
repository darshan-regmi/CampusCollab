import { Request, Response, NextFunction } from 'express';
import { Review } from '../models/Review';
import { Booking } from '../models/Booking';
import { AppError } from '../middleware/errorHandler';

export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookingId, rating, comment } = req.body;

    // Check if booking exists and is completed
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      throw new AppError('Booking not found', 404);
    }

    if (booking.status !== 'completed') {
      throw new AppError('Can only review completed bookings', 400);
    }

    // Check if user is the student who booked
    if (booking.student.toString() !== req.userId) {
      throw new AppError('Only the student can review the booking', 403);
    }

    // Check if review already exists
    const existingReview = await Review.findOne({ booking: bookingId });
    if (existingReview) {
      throw new AppError('Review already exists for this booking', 400);
    }

    // Create review
    const review = await Review.create({
      skill: booking.skill,
      booking: bookingId,
      student: req.userId,
      rating,
      comment,
    });

    res.status(201).json({
      status: 'success',
      data: { review },
    });
  } catch (err) {
    next(err);
  }
};

export const getSkillReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { skillId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const [reviews, total] = await Promise.all([
      Review.find({ skill: skillId })
        .populate('student', 'displayName photoURL')
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 }),
      Review.countDocuments({ skill: skillId }),
    ]);

    res.json({
      status: 'success',
      data: {
        reviews,
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

export const toggleVote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { voteType } = req.body;

    const review = await Review.findById(id);
    if (!review) {
      throw new AppError('Review not found', 404);
    }

    // Remove user from both vote arrays
    review.upvotes = review.upvotes.filter(
      userId => userId.toString() !== req.userId
    );
    review.downvotes = review.downvotes.filter(
      userId => userId.toString() !== req.userId
    );

    // Add user to the selected vote array
    if (voteType === 'up') {
      review.upvotes.push(req.userId);
    } else if (voteType === 'down') {
      review.downvotes.push(req.userId);
    }

    await review.save();

    res.json({
      status: 'success',
      data: {
        upvotes: review.upvotes.length,
        downvotes: review.downvotes.length,
      },
    });
  } catch (err) {
    next(err);
  }
};
