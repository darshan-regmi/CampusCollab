import { useState, useEffect, ReactNode, useCallback } from 'react';
import { AuthContext } from './auth';
import {
  signUp,
  signIn,
  logOut,
  resetPassword,
  resendVerificationEmail,
} from '../config/firebase';
import { auth } from '../config/firebase';
import {
  User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';

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

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const checkEmailVerification = useCallback(async (user: User) => {
    if (user) {
      await user.reload(); // Refresh user data
      setIsEmailVerified(user.emailVerified);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await checkEmailVerification(user);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [checkEmailVerification]);

  async function signup(email: string, password: string, displayName: string) {
    const { user } = await signUp(email, password, displayName);
    setCurrentUser(user);
  }

  async function login(email: string, password: string) {
    const { user } = await signIn(email, password);
    await checkEmailVerification(user);
  }

  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    setCurrentUser(user);
    setIsEmailVerified(true); // Google accounts are always verified
  }

  async function logout() {
    await logOut();
    setCurrentUser(null);
    setIsEmailVerified(false);
  }

  async function sendPasswordReset(email: string) {
    await resetPassword(email);
  }

  async function resendVerification() {
    if (!currentUser) throw new Error('No user logged in');
    await resendVerificationEmail(currentUser);
  }

  async function updateUserProfile(displayName: string, photoURL?: string) {
    if (!currentUser) throw new Error('No user logged in');
    await updateProfile(currentUser, { displayName, photoURL: photoURL || null });
    setCurrentUser({ ...currentUser, displayName, photoURL: photoURL || null });
  }

  const value = {
    currentUser,
    loading,
    isEmailVerified,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword: sendPasswordReset,
    resendVerification,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
