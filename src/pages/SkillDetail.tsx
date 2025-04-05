import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { CalendarIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline';
import { Skill } from '../types/skill';
import { BookingRequest } from '../types/booking';
import { Review, ReviewSubmission } from '../types/review';
import BookingForm from '../components/bookings/BookingForm';
import ReviewForm from '../components/reviews/ReviewForm';
import ReviewItem from '../components/reviews/ReviewItem';
import FavoriteButton from '../components/common/FavoriteButton';
import Modal from '../components/common/Modal';

// Mock data - replace with API call later
const mockSkill: Skill = {
  id: '1',
  title: 'Web Development Tutoring',
  description: 'Learn modern web development from an experienced developer. Covering React, TypeScript, Node.js, and modern web development practices. Perfect for beginners and intermediate developers looking to level up their skills.',
  category: 'Technology',
  providerId: 'user1',
  providerName: 'John Doe',
  rate: 25,
  rateUnit: 'hour',
  availability: ['Mon', 'Wed', 'Fri'],
  rating: 4.8,
  totalReviews: 24,
  tags: ['React', 'TypeScript', 'Web Development', 'Frontend', 'JavaScript'],
  imageUrl: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop',
};

// Mock reviews - replace with API call later
const mockReviews: Review[] = [
  {
    id: '1',
    skillId: '1',
    userId: 'user2',
    userName: 'Sarah Johnson',
    rating: 5,
    comment: 'Excellent teacher! Very patient and knowledgeable. Helped me understand React concepts clearly.',
    date: '2025-03-28',
    helpful: 12,
    notHelpful: 1,
  },
  {
    id: '2',
    skillId: '1',
    userId: 'user3',
    userName: 'Mike Chen',
    rating: 4,
    comment: 'Great session, very informative. Would recommend for beginners.',
    date: '2025-03-25',
    helpful: 8,
    notHelpful: 0,
  },
];

export default function SkillDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // TODO: Replace with actual API call using the id parameter
  const skill = id ? { ...mockSkill, id } : mockSkill;
  const reviews = mockReviews;

  const handleBookingSubmit = (booking: BookingRequest) => {
    console.log('Booking submitted:', booking);
    setShowBookingModal(false);
    navigate('/bookings');
  };

  const handleReviewSubmit = (review: ReviewSubmission) => {
    console.log('Review submitted:', review);
    // TODO: Implement API call to submit review
    setShowReviewModal(false);
    // Optimistically update the UI
    const newReview: Review = {
      id: Date.now().toString(),
      skillId: id || '',
      userId: 'current-user',
      userName: 'Current User',
      rating: review.rating,
      comment: review.comment,
      date: new Date().toISOString(),
      helpful: 0,
      notHelpful: 0,
    };
    reviews.unshift(newReview);
  };

  const handleHelpfulVote = (reviewId: string, helpful: boolean) => {
    // TODO: Implement API call to update helpful votes
    console.log('Vote submitted:', { reviewId, helpful });
  };

  const toggleFavorite = () => {
    // TODO: Implement API call to toggle favorite
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Image */}
          {skill.imageUrl && (
            <div className="rounded-lg overflow-hidden mb-6">
              <img
                src={skill.imageUrl}
                alt={skill.title}
                className="w-full h-[400px] object-cover"
              />
            </div>
          )}

          {/* Title and Basic Info */}
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {skill.title}
              </h1>
              <FavoriteButton
                isFavorite={isFavorite}
                onClick={toggleFavorite}
                size="lg"
                showText
              />
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                {skill.category}
              </span>
              <div className="flex items-center">
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <span className="ml-1 font-medium">{skill.rating}</span>
                <span className="ml-1 text-gray-500">
                  ({skill.totalReviews} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="prose max-w-none mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              About This Skill
            </h2>
            <p className="text-gray-600 whitespace-pre-line">
              {skill.description}
            </p>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Topics Covered
            </h2>
            <div className="flex flex-wrap gap-2">
              {skill.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                >
                  <TagIcon className="inline h-4 w-4 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Student Reviews
              </h2>
              <button
                onClick={() => setShowReviewModal(true)}
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                Write a Review
              </button>
            </div>
            <div className="space-y-4">
              {reviews.map((review) => (
                <ReviewItem
                  key={review.id}
                  review={review}
                  onHelpfulVote={handleHelpfulVote}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border p-6 sticky top-4">
            {/* Price */}
            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ${skill.rate}
              </span>
              <span className="text-gray-600">/{skill.rateUnit}</span>
            </div>

            {/* Provider Info */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${skill.providerName}`}
                  alt={skill.providerName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-gray-900">
                    {skill.providerName}
                  </h3>
                  <p className="text-sm text-gray-500">Skill Provider</p>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Availability</h3>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <CalendarIcon className="h-5 w-5" />
                <span>{skill.availability.join(', ')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <ClockIcon className="h-5 w-5" />
                <span>1 hour sessions</span>
              </div>
            </div>

            {/* Book Button */}
            <button
              onClick={() => setShowBookingModal(true)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      >
        <BookingForm
          skill={skill}
          onSubmit={handleBookingSubmit}
          onCancel={() => setShowBookingModal(false)}
        />
      </Modal>

      {/* Review Modal */}
      <Modal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
      >
        <ReviewForm
          skillId={skill.id}
          onSubmit={handleReviewSubmit}
          onCancel={() => setShowReviewModal(false)}
        />
      </Modal>
    </div>
  );
}
