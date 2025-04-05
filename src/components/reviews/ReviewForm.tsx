import { useState } from 'react';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { ReviewSubmission } from '../../types/review';

interface ReviewFormProps {
  skillId: string;
  onSubmit: (review: ReviewSubmission) => void;
  onCancel: () => void;
}

export default function ReviewForm({ skillId, onSubmit, onCancel }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    if (!comment.trim()) {
      setError('Please write a review');
      return;
    }

    const review: ReviewSubmission = {
      skillId,
      rating,
      comment: comment.trim(),
    };

    onSubmit(review);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Write a Review</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating Stars */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="p-1 hover:scale-110 transition-transform"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => {
                  setRating(star);
                  setError('');
                }}
              >
                {(hoverRating || rating) >= star ? (
                  <StarSolid className="h-8 w-8 text-yellow-400" />
                ) : (
                  <StarOutline className="h-8 w-8 text-gray-300" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Review Text */}
        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your Review
          </label>
          <textarea
            id="comment"
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Share your experience with this skill..."
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              setError('');
            }}
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
}
