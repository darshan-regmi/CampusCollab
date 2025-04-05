import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useEmailVerification } from '../../hooks/useEmailVerification';

export function EmailVerification() {
  const { currentUser, resendVerification } = useAuth();
  const { isVerified, loading } = useEmailVerification();
  const [resendCooldown, setResendCooldown] = useState(false);

  const handleResendVerification = async () => {
    if (!currentUser || resendCooldown) return;

    try {
      await resendVerification();
      setResendCooldown(true);
      // Reset cooldown after 60 seconds
      setTimeout(() => setResendCooldown(false), 60000);
    } catch (error) {
      console.error('Error resending verification email:', error);
    }
  };

  if (loading || !currentUser || isVerified) {
    return null;
  }

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            Please verify your email address. Check your inbox for a verification link.
          </p>
          <button
            onClick={handleResendVerification}
            disabled={resendCooldown}
            className={`mt-2 text-sm font-medium ${
              resendCooldown
                ? 'text-yellow-400 cursor-not-allowed'
                : 'text-yellow-700 hover:text-yellow-600'
            }`}
          >
            {resendCooldown ? 'Resend available in 60s' : 'Resend verification email'}
          </button>
        </div>
      </div>
    </div>
  );
}
