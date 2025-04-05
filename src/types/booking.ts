export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface TimeSlot {
  startTime: string; // ISO string
  endTime: string;   // ISO string
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  skillId: string;
  skillTitle: string;
  providerId: string;
  providerName: string;
  studentId: string;
  studentName: string;
  date: string;        // ISO string
  startTime: string;   // ISO string
  endTime: string;     // ISO string
  status: BookingStatus;
  totalAmount: number;
  notes?: string;
  createdAt: string;   // ISO string
  updatedAt: string;   // ISO string
}

export interface BookingRequest {
  skillId: string;
  date: string;
  startTime: string;
  endTime: string;
  notes?: string;
}
