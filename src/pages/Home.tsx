import React from 'react';
import { BookOpen, Users, Calendar, Star } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Share Your Skills",
      description: "Teach what you know, learn what you don't"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Connect with Peers",
      description: "Build meaningful connections through learning"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Flexible Scheduling",
      description: "Learn at your own pace, on your own time"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Earn Recognition",
      description: "Get badges and rewards for your contributions"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Learn from Your Peers,<br />Share What You Know
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          The platform where college students exchange skills and grow together
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Start Teaching
          </button>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition">
            Start Learning
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="text-indigo-600 mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Featured Skills Section */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {['Web Development', 'Graphic Design', 'Public Speaking', 'Photography', 'Music Production', 'Data Science', 'Digital Marketing', 'Language Exchange'].map((skill, index) => (
            <div key={index} className="bg-gray-50 px-4 py-2 rounded-lg text-center hover:bg-indigo-50 cursor-pointer transition">
              <span className="text-gray-700">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <img
                src={`https://images.unsplash.com/photo-${index + 1}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80`}
                alt="Student"
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-gray-600 mb-4">
                "CampusCollab helped me discover my passion for teaching and connect with amazing peers!"
              </p>
              <p className="font-semibold text-gray-900">Student Name</p>
              <p className="text-gray-500 text-sm">Computer Science, Class of 2024</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;