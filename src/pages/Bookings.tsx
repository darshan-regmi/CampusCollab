import { useState } from 'react';
import { Booking, BookingStatus } from '../types/booking';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

// Mock bookings data - replace with API call later
const mockBookings: Booking[] = [
  {
    id: '1',
    skillId: '1',
    skillTitle: 'Web Development Tutoring',
    providerId: 'provider1',
    providerName: 'John Doe',
    studentId: 'student1',
    studentName: 'Alice Smith',
    date: '2025-04-10',
    startTime: '2025-04-10T10:00:00',
    endTime: '2025-04-10T11:00:00',
    status: 'confirmed',
    totalAmount: 25,
    createdAt: '2025-04-05T08:00:00',
    updatedAt: '2025-04-05T08:00:00',
  },
  // Add more mock bookings here
];

export default function Bookings() {
  const [filter, setFilter] = useState<BookingStatus | 'all'>('all');
  const [view, setView] = useState<'list' | 'calendar'>('list');

  const filteredBookings = mockBookings.filter(
    booking => filter === 'all' || booking.status === filter
  );

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">My Bookings</h1>
        
        {/* Filters and View Toggle */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-2">
            {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === status
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                view === 'list'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                view === 'calendar'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      {view === 'list' && (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {booking.skillTitle}
                  </h3>
                  <p className="text-gray-600">{booking.providerName}</p>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-6">
                <div className="flex items-center text-gray-600">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  {formatDate(booking.date)}
                </div>
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-gray-600">
                  Total Amount: <span className="font-medium">${booking.totalAmount}</span>
                </span>
                {booking.status === 'pending' && (
                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg">
                      Cancel
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg">
                      Reschedule
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No bookings found.</p>
            </div>
          )}
        </div>
      )}

      {/* Calendar View - Placeholder for now */}
      {view === 'calendar' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-center text-gray-500">
            Calendar view coming soon...
          </p>
        </div>
      )}
    </div>
  );
}
