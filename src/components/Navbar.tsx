import { Link } from 'react-router-dom';
import { Sparkles, Search, Bell, UserCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">CampusCollab</span>
            </Link>
          </div>
          
          <div className="hidden sm:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium">Home</Link>
            <div className="relative group">
              <button className="text-gray-600 hover:text-gray-900 font-medium flex items-center">
                Learn & Teach
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                <div className="py-1">
                  <Link to="/learn" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Start Learning</Link>
                  <Link to="/teach" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Start Teaching</Link>
                  <Link to="/skills" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Browse Skills</Link>
                </div>
              </div>
            </div>
            <Link to="/collaborate" className="text-gray-600 hover:text-gray-900 font-medium">Collaborate</Link>
            <Link to="/bookings" className="text-gray-600 hover:text-gray-900 font-medium">Bookings</Link>
            <Link to="/map" className="text-gray-600 hover:text-gray-900 font-medium">Map</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/search" className="text-gray-600 hover:text-gray-900">
              <Search className="h-6 w-6" />
            </Link>
            <Link to="/notifications" className="text-gray-600 hover:text-gray-900">
              <Bell className="h-6 w-6" />
            </Link>
            <Link to="/profile" className="text-gray-600 hover:text-gray-900">
              <UserCircle className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;