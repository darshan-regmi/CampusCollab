import { Skill } from '../../types/skill';
import { StarIcon } from '@heroicons/react/24/solid';

interface SkillCardProps {
  skill: Skill;
  onClick?: (skill: Skill) => void;
  onBook?: (skill: Skill) => void;
}

export default function SkillCard({ skill, onClick, onBook }: SkillCardProps) {
  return (
    <div
      onClick={() => onClick?.(skill)}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer"
    >
      {skill.imageUrl && (
        <img
          src={skill.imageUrl}
          alt={skill.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{skill.title}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {skill.category}
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{skill.description}</p>
        <div className="mt-3 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${
                  i < skill.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-1 text-sm text-gray-600">
            ({skill.totalReviews})
          </span>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${skill.providerName}`}
              alt={skill.providerName}
              className="w-6 h-6 rounded-full"
            />
            <span className="ml-2 text-sm text-gray-600">{skill.providerName}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-900">
              ${skill.rate}/{skill.rateUnit}
            </span>
            {onBook && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onBook(skill);
                }}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
              >
                Book Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
