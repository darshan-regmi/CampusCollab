import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Skill, SkillCategory, SkillFilter } from '../types/skill';
import { BookingRequest } from '../types/booking';
import SkillCard from '../components/skills/SkillCard';
import BookingForm from '../components/bookings/BookingForm';
import Modal from '../components/common/Modal';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

// Temporary mock data - replace with API call later
const mockSkills: Skill[] = [
  {
    id: '1',
    title: 'Web Development Tutoring',
    description: 'Learn React, TypeScript, and modern web development practices with hands-on projects.',
    category: 'Technology',
    providerId: 'user1',
    providerName: 'John Doe',
    rate: 25,
    rateUnit: 'hour',
    availability: ['Mon', 'Wed', 'Fri'],
    rating: 4.8,
    totalReviews: 24,
    tags: ['React', 'TypeScript', 'Web Dev'],
  },
  // Add more mock skills here
];

const categories: SkillCategory[] = [
  'Academic',
  'Technology',
  'Arts',
  'Music',
  'Language',
  'Sports',
  'Professional',
  'Other',
];

export default function Skills() {
  const navigate = useNavigate();
  
  const [filter, setFilter] = useState<SkillFilter>({
    search: '',
    category: undefined,
    minRate: undefined,
    maxRate: undefined,
    rating: undefined,
  });

  const [showFilters, setShowFilters] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const filteredSkills = useMemo(() => {
    return mockSkills.filter((skill) => {
      const matchesSearch = skill.title.toLowerCase().includes(filter.search.toLowerCase()) ||
        skill.description.toLowerCase().includes(filter.search.toLowerCase()) ||
        skill.tags.some(tag => tag.toLowerCase().includes(filter.search.toLowerCase()));
      
      const matchesCategory = !filter.category || skill.category === filter.category;
      const matchesMinRate = !filter.minRate || skill.rate >= filter.minRate;
      const matchesMaxRate = !filter.maxRate || skill.rate <= filter.maxRate;
      const matchesRating = !filter.rating || skill.rating >= filter.rating;

      return matchesSearch && matchesCategory && matchesMinRate && matchesMaxRate && matchesRating;
    });
  }, [filter]);

  const handleSkillClick = (skill: Skill) => {
    navigate(`/skills/${skill.id}`);
  };

  const handleBookClick = (skill: Skill) => {
    setSelectedSkill(skill);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = (booking: BookingRequest) => {
    // TODO: Implement booking submission
    console.log('Booking submitted:', booking);
    setShowBookingModal(false);
    navigate('/bookings');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Discover Skills</h1>
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search skills..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <FunnelIcon className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full border rounded-md p-2"
                  value={filter.category || ''}
                  onChange={(e) => setFilter({
                    ...filter,
                    category: e.target.value as SkillCategory || undefined,
                  })}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Rate ($)
                </label>
                <input
                  type="number"
                  className="w-full border rounded-md p-2"
                  value={filter.minRate || ''}
                  onChange={(e) => setFilter({
                    ...filter,
                    minRate: e.target.value ? Number(e.target.value) : undefined,
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Rate ($)
                </label>
                <input
                  type="number"
                  className="w-full border rounded-md p-2"
                  value={filter.maxRate || ''}
                  onChange={(e) => setFilter({
                    ...filter,
                    maxRate: e.target.value ? Number(e.target.value) : undefined,
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Rating
                </label>
                <select
                  className="w-full border rounded-md p-2"
                  value={filter.rating || ''}
                  onChange={(e) => setFilter({
                    ...filter,
                    rating: e.target.value ? Number(e.target.value) : undefined,
                  })}
                >
                  <option value="">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            onClick={handleSkillClick}
            onBook={handleBookClick}
          />
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No skills found matching your criteria.
          </p>
        </div>
      )}

      {/* Booking Modal */}
      <Modal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      >
        {selectedSkill && (
          <BookingForm
            skill={selectedSkill}
            onSubmit={handleBookingSubmit}
            onCancel={() => setShowBookingModal(false)}
          />
        )}
      </Modal>
    </div>
  );
}
