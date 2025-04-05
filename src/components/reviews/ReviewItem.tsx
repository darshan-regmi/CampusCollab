import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/outline';
import { Review } from '../../types/review';

interface ReviewItemProps {
  review: Review;
  onHelpfulVote: (reviewId: string, helpful: boolean) => void;
}

export default function ReviewItem({ review, onHelpfulVote }: ReviewItemProps) {
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (helpful: boolean) => {
    if (!hasVoted) {
      setHasVoted(true);
      onHelpfulVote(review.id, helpful);
    }
  };

  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium text-gray-900">
            {review.userName}
          </h3>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${
                  i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(review.date).toLocaleDateString()}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{review.comment}</p>
      
      {/* Helpful Votes */}
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <button
          onClick={() => handleVote(true)}
          disabled={hasVoted}
          className={`flex items-center gap-1 ${
            hasVoted ? 'cursor-not-allowed opacity-50' : 'hover:text-gray-900'
          }`}
        >
          <HandThumbUpIcon className="h-4 w-4" />
          <span>Helpful ({review.helpful})</span>
        </button>
        
        <button
          onClick={() => handleVote(false)}
          disabled={hasVoted}
          className={`flex items-center gap-1 ${
            hasVoted ? 'cursor-not-allowed opacity-50' : 'hover:text-gray-900'
          }`}
        >
          <HandThumbDownIcon className="h-4 w-4" />
          <span>Not Helpful ({review.notHelpful})</span>
        </button>
      </div>
    </div>
  );
}
