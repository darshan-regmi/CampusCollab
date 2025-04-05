import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { useAuth } from './useAuth';

export function useEmailVerification() {
  const { currentUser } = useAuth();
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkVerification = async (user: User) => {
      try {
        await user.reload();
        setIsVerified(user.emailVerified);
      } catch (error) {
        console.error('Error checking email verification:', error);
        setIsVerified(false);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      checkVerification(currentUser);
    } else {
      setIsVerified(false);
      setLoading(false);
    }
  }, [currentUser]);

  return { isVerified, loading };
}
