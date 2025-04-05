import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function FavoriteButton({
  isFavorite,
  onClick,
  size = 'md',
  showText = false,
}: FavoriteButtonProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-2 ${
        isFavorite
          ? 'text-red-500 hover:text-red-600'
          : 'text-gray-400 hover:text-red-500'
      }`}
    >
      {isFavorite ? (
        <HeartSolid className={sizeClasses[size]} />
      ) : (
        <HeartOutline className={sizeClasses[size]} />
      )}
      {showText && (
        <span className="text-sm font-medium">
          {isFavorite ? 'Saved' : 'Save'}
        </span>
      )}
    </button>
  );
}
