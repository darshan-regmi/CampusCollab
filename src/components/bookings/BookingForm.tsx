import { useState } from 'react';
import { Skill } from '../../types/skill';
import { BookingRequest, TimeSlot } from '../../types/booking';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

interface BookingFormProps {
  skill: Skill;
  onSubmit: (booking: BookingRequest) => void;
  onCancel: () => void;
}

// Mock available time slots - replace with API call later
const generateTimeSlots = (date: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 9; // 9 AM
  const endHour = 17;  // 5 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    const startTime = `${date}T${hour.toString().padStart(2, '0')}:00:00`;
    const endTime = `${date}T${(hour + 1).toString().padStart(2, '0')}:00:00`;
    slots.push({
      startTime,
      endTime,
      isAvailable: Math.random() > 0.3, // Random availability for mock data
    });
  }
  
  return slots;
};

export default function BookingForm({ skill, onSubmit, onCancel }: BookingFormProps) {
  const [date, setDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [notes, setNotes] = useState('');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    setSelectedSlot(null);
    setTimeSlots(generateTimeSlots(newDate));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;

    const booking: BookingRequest = {
      skillId: skill.id,
      date,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      notes: notes.trim() || undefined,
    };

    onSubmit(booking);
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Book Session with {skill.providerName}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <div className="relative">
            <input
              type="date"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={date}
              onChange={(e) => handleDateChange(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
            <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Time Slots */}
        {date && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Time Slot
            </label>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  type="button"
                  className={`flex items-center justify-center px-4 py-2 rounded-lg border ${
                    !slot.isAvailable
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : selectedSlot === slot
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => slot.isAvailable && setSelectedSlot(slot)}
                  disabled={!slot.isAvailable}
                >
                  <ClockIcon className="h-4 w-4 mr-2" />
                  {formatTime(slot.startTime)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes (Optional)
          </label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any special requests or notes..."
          />
        </div>

        {/* Price Summary */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Rate</span>
            <span className="font-medium">${skill.rate}/{skill.rateUnit}</span>
          </div>
        </div>

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
            disabled={!date || !selectedSlot}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
          >
            Book Session
          </button>
        </div>
      </form>
    </div>
  );
}
