import { onCall } from "firebase-functions/v2/https";
import { onDocumentCreated, onDocumentUpdated } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp } from "firebase-admin/app";
import type { Booking, Review, User } from "./types";

// Initialize Firebase Admin
initializeApp();

const db = getFirestore();

// User Functions
export const createUserProfile = onCall(async (request) => {
  try {
    const { displayName, role, skills, bio } = request.data;
    const uid = request.auth?.uid;

    if (!uid) {
      throw new Error("Unauthorized");
    }

    const user: User = {
      uid,
      email: request.auth?.token.email || "",
      displayName,
      role,
      skills: skills || [],
      bio: bio || "",
      rating: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.collection("users").doc(uid).set(user);
    return { success: true, user };
  } catch (error) {
    logger.error("Error creating user profile:", error);
    throw new Error("Failed to create user profile");
  }
});

// Booking Functions
export const createBooking = onCall(async (request) => {
  try {
    const { tutorId, subject, startTime, endTime, price, notes } = request.data;
    const studentId = request.auth?.uid;

    if (!studentId) {
      throw new Error("Unauthorized");
    }

    const booking: Booking = {
      id: "", // Will be set by Firestore
      studentId,
      tutorId,
      subject,
      startTime,
      endTime,
      status: "pending",
      price,
      notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await db.collection("bookings").add(booking);
    return { success: true, bookingId: docRef.id };
  } catch (error) {
    logger.error("Error creating booking:", error);
    throw new Error("Failed to create booking");
  }
});

// Review Functions
export const createReview = onCall(async (request) => {
  try {
    const { bookingId, targetId, rating, comment } = request.data;
    const reviewerId = request.auth?.uid;

    if (!reviewerId) {
      throw new Error("Unauthorized");
    }

    // Verify the booking exists and is completed
    const bookingDoc = await db.collection("bookings").doc(bookingId).get();
    if (!bookingDoc.exists) {
      throw new Error("Booking not found");
    }

    const booking = bookingDoc.data() as Booking;
    if (booking.status !== "completed") {
      throw new Error("Cannot review an incomplete booking");
    }

    const review: Review = {
      id: "", // Will be set by Firestore
      bookingId,
      reviewerId,
      targetId,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection("reviews").add(review);
    return { success: true, reviewId: docRef.id };
  } catch (error) {
    logger.error("Error creating review:", error);
    throw new Error("Failed to create review");
  }
});

// Triggers
export const onBookingUpdated = onDocumentUpdated("bookings/{bookingId}", async (event) => {
  const booking = event.data?.after.data() as Booking;
  const previousBooking = event.data?.before.data() as Booking;

  // If booking is completed, send notification to both parties
  if (booking.status === "completed" && previousBooking.status !== "completed") {
    try {
      const studentDoc = await db.collection("users").doc(booking.studentId).get();
      const tutorDoc = await db.collection("users").doc(booking.tutorId).get();

      if (studentDoc.exists && tutorDoc.exists) {
        const student = studentDoc.data() as User;
        const tutor = tutorDoc.data() as User;

        // Create notifications
        await Promise.all([
          db.collection("notifications").add({
            userId: student.uid,
            type: "booking_completed",
            message: `Your session with ${tutor.displayName} is completed. Please leave a review!`,
            createdAt: new Date().toISOString(),
            read: false,
          }),
          db.collection("notifications").add({
            userId: tutor.uid,
            type: "booking_completed",
            message: `Your session with ${student.displayName} is completed. Please leave a review!`,
            createdAt: new Date().toISOString(),
            read: false,
          }),
        ]);
      }
    } catch (error) {
      logger.error("Error sending booking completion notifications:", error);
    }
  }
});

// When a new review is created, update the user's average rating
export const onReviewCreated = onDocumentCreated("reviews/{reviewId}", async (event) => {
  const review = event.data?.data() as Review;

  try {
    // Get all reviews for the target user
    const reviews = await db
      .collection("reviews")
      .where("targetId", "==", review.targetId)
      .get();

    // Calculate average rating
    let totalRating = 0;
    reviews.forEach((doc) => {
      totalRating += (doc.data() as Review).rating;
    });
    const averageRating = totalRating / reviews.size;

    // Update user's rating
    await db.collection("users").doc(review.targetId).update({
      rating: averageRating,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    logger.error("Error updating user rating:", error);
  }
});
