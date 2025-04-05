import { Request, Response, NextFunction } from 'express';
import { Booking } from '../models/Booking';
import { Skill } from '../models/Skill';
import { AppError } from '../middleware/errorHandler';

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { skillId, date, startTime, endTime } = req.body;

    // Find the skill
    const skill = await Skill.findById(skillId);
    if (!skill) {
      throw new AppError('Skill not found', 404);
    }

    // Check if tutor is trying to book their own skill
    if (skill.tutor.toString() === req.userId) {
      throw new AppError('Cannot book your own skill', 400);
    }

    // Validate availability
    const bookingDate = new Date(date);
    const day = bookingDate.toLocaleLowerCase();
    const availabilitySlot = skill.availability.find(
      slot => slot.day === day && 
      startTime >= slot.startTime && 
      endTime <= slot.endTime
    );

    if (!availabilitySlot) {
      throw new AppError('Selected time slot is not available', 400);
    }

    // Check for existing bookings in the same time slot
    const existingBooking = await Booking.findOne({
      skill: skillId,
      date,
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime }
        }
      ]
    });

    if (existingBooking) {
      throw new AppError('Time slot is already booked', 400);
    }

    // Calculate total price based on duration and skill price
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const durationInMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);
    const totalPrice = (skill.price * durationInMinutes) / skill.duration;

    // Create booking
    const booking = await Booking.create({
      skill: skillId,
      student: req.userId,
      tutor: skill.tutor,
      date,
      startTime,
      endTime,
      totalPrice,
    });

    res.status(201).json({
      status: 'success',
      data: { booking },
    });
  } catch (err) {
    next(err);
  }
};

export const getBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.query;
    const query: any = {};

    if (role === 'student') {
      query.student = req.userId;
    } else if (role === 'tutor') {
      query.tutor = req.userId;
    } else {
      query.$or = [{ student: req.userId }, { tutor: req.userId }];
    }

    const bookings = await Booking.find(query)
      .populate({
        path: 'skill',
        select: 'title price duration',
        populate: {
          path: 'tutor',
          select: 'displayName photoURL',
        },
      })
      .populate('student', 'displayName photoURL')
      .sort({ date: 1, startTime: 1 });

    res.json({
      status: 'success',
      data: { bookings },
    });
  } catch (err) {
    next(err);
  }
};

export const getBookingById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate({
        path: 'skill',
        select: 'title price duration',
        populate: {
          path: 'tutor',
          select: 'displayName photoURL',
        },
      })
      .populate('student', 'displayName photoURL');

    if (!booking) {
      throw new AppError('Booking not found', 404);
    }

    // Check if user is authorized to view this booking
    if (
      booking.student.toString() !== req.userId &&
      booking.tutor.toString() !== req.userId
    ) {
      throw new AppError('Not authorized to view this booking', 403);
    }

    res.json({
      status: 'success',
      data: { booking },
    });
  } catch (err) {
    next(err);
  }
};

export const updateBookingStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      throw new AppError('Booking not found', 404);
    }

    // Only tutor can update booking status
    if (booking.tutor.toString() !== req.userId) {
      throw new AppError('Not authorized to update this booking', 403);
    }

    // Validate status transition
    const validTransitions: { [key: string]: string[] } = {
      pending: ['confirmed', 'cancelled'],
      confirmed: ['completed', 'cancelled'],
      cancelled: [],
      completed: [],
    };

    if (!validTransitions[booking.status].includes(status)) {
      throw new AppError(`Cannot transition from ${booking.status} to ${status}`, 400);
    }

    booking.status = status;
    await booking.save();

    res.json({
      status: 'success',
      data: { booking },
    });
  } catch (err) {
    next(err);
  }
};
