import { useState } from 'react';
import { Search } from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

interface Tutor {
  uid: string;
  displayName: string;
  skills: string[];
  rating: number;
  hourlyRate: number;
  subjects: string[];
  availability: string[];
}

const Learn = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(false);

  const searchTutors = async (term: string) => {
    setLoading(true);
    try {
      const tutorsRef = collection(db, 'users');
      const q = query(
        tutorsRef,
        where('role', '==', 'tutor'),
        where('subjects', 'array-contains', term.toLowerCase())
      );
      const querySnapshot = await getDocs(q);
      const tutorsList: Tutor[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Tutor;
        tutorsList.push({ ...data, uid: doc.id });
      });
      setTutors(tutorsList);
    } catch (error) {
      console.error('Error searching tutors:', error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Start Learning Today</h1>
        <p className="text-lg text-gray-600">Find the perfect tutor and begin your learning journey</p>
      </div>

      {/* Search Section */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by subject, skill, or topic..."
            className="w-full px-4 py-3 pl-12 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchTutors(searchTerm)}
          />
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Featured Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Popular Subjects</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Mathematics', 'Computer Science', 'Physics', 'English'].map((subject) => (
            <button
              key={subject}
              onClick={() => searchTutors(subject)}
              className="p-4 text-left bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <h3 className="font-medium text-gray-900">{subject}</h3>
              <p className="text-sm text-gray-500">Find tutors</p>
            </button>
          ))}
        </div>
      </div>

      {/* Tutor Results */}
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <div key={tutor.uid} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{tutor.displayName}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-sm text-gray-600">{tutor.rating.toFixed(1)}</span>
                  </div>
                </div>
                <span className="text-indigo-600 font-medium">${tutor.hourlyRate}/hr</span>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">Subjects:</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tutor.subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => window.location.href = `/tutors/${tutor.uid}`}
                className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                View Profile & Book
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Learn;
