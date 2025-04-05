import { User } from 'firebase/auth';
import { createContext } from 'react';

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isEmailVerified: boolean;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  resendVerification: () => Promise<void>;
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
