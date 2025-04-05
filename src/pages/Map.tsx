import { Link } from 'react-router-dom';
import {
  Home,
  Briefcase,
  Calendar,
  Search,
  Bell,
  UserCircle,
  MessageSquare,
  Heart,
  GraduationCap,
  Users,
  Presentation
} from 'lucide-react';

interface SiteSection {
  title: string;
  path: string;
  icon: JSX.Element;
  description: string;
  features: string[];
}

const siteSections: SiteSection[] = [
  {
    title: 'Home',
    path: '/',
    icon: <Home className="h-6 w-6" />,
    description: 'Welcome to CampusCollab - Your platform for peer-to-peer learning',
    features: [
      'Featured tutors and top-rated sessions',
      'Quick access to popular skills',
      'Recent activity feed',
      'Upcoming sessions overview'
    ]
  },
  {
    title: 'Start Learning',
    path: '/learn',
    icon: <GraduationCap className="h-6 w-6" />,
    description: 'Begin your learning journey with expert peer tutors',
    features: [
      'Find tutors by subject',
      'Book one-on-one sessions',
      'Join group study sessions',
      'Access learning resources',
      'Track your progress'
    ]
  },
  {
    title: 'Start Teaching',
    path: '/teach',
    icon: <Presentation className="h-6 w-6" />,
    description: 'Share your knowledge and earn while teaching peers',
    features: [
      'Create your tutor profile',
      'Set your availability',
      'Manage teaching sessions',
      'Track earnings',
      'Receive student feedback'
    ]
  },
  {
    title: 'Collaborate',
    path: '/collaborate',
    icon: <Users className="h-6 w-6" />,
    description: 'Work together on projects and learn from each other',
    features: [
      'Find project partners',
      'Create project groups',
      'Share project resources',
      'Track project progress',
      'Schedule team meetings'
    ]
  },
  {
    title: 'Skills',
    path: '/skills',
    icon: <Briefcase className="h-6 w-6" />,
    description: 'Browse and search for skills you want to learn or teach',
    features: [
      'Browse skills by category',
      'Search for specific skills',
      'View tutors by skill',
      'Skill ratings and reviews',
      'Add skills to your profile'
    ]
  },
  {
    title: 'Bookings',
    path: '/bookings',
    icon: <Calendar className="h-6 w-6" />,
    description: 'Manage your learning sessions and tutoring appointments',
    features: [
      'Schedule new sessions',
      'View upcoming bookings',
      'Past session history',
      'Cancel or reschedule sessions',
      'Session reminders'
    ]
  },
  {
    title: 'Search',
    path: '/search',
    icon: <Search className="h-6 w-6" />,
    description: 'Find tutors, skills, and learning opportunities',
    features: [
      'Advanced search filters',
      'Search by skill or subject',
      'Filter by availability',
      'Sort by rating or price',
      'Location-based search'
    ]
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <MessageSquare className="h-6 w-6" />,
    description: 'Connect and communicate with tutors and students',
    features: [
      'Real-time messaging',
      'Chat history',
      'File sharing',
      'Session scheduling',
      'Message notifications'
    ]
  },
  {
    title: 'Notifications',
    path: '/notifications',
    icon: <Bell className="h-6 w-6" />,
    description: 'Stay updated with your learning journey',
    features: [
      'Booking confirmations',
      'Session reminders',
      'New messages',
      'Review notifications',
      'System updates'
    ]
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <UserCircle className="h-6 w-6" />,
    description: 'Manage your personal profile and settings',
    features: [
      'Edit profile information',
      'Manage skills and expertise',
      'View ratings and reviews',
      'Update availability',
      'Account settings'
    ]
  },
  {
    title: 'Favorites',
    path: '/favorites',
    icon: <Heart className="h-6 w-6" />,
    description: 'Access your saved tutors and skills',
    features: [
      'Saved tutors list',
      'Bookmarked skills',
      'Quick booking access',
      'Compare tutors',
      'Recent interactions'
    ]
  }
];

const Map = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Site Map</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {siteSections.map((section) => (
          <Link
            key={section.path}
            to={section.path}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 bg-indigo-100 rounded-lg">
                {section.icon}
              </div>
              <h2 className="ml-3 text-xl font-semibold text-gray-900">
                {section.title}
              </h2>
            </div>
            
            <p className="text-gray-600 mb-4">
              {section.description}
            </p>
            
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Features:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {section.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Map;
