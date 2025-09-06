import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { 
  signInWithPhoneNumber, 
  RecaptchaVerifier, 
  ConfirmationResult,
  onAuthStateChanged,
  User
} from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithPhone: (phoneNumber: string) => Promise<ConfirmationResult>;
  confirmOtp: (confirmationResult: ConfirmationResult, otp: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Initialize reCAPTCHA
    const setupRecaptcha = () => {
      if (!recaptchaVerifier) {
        const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: () => {
            // reCAPTCHA solved
          },
        });
        setRecaptchaVerifier(verifier);
      }
    };

    setupRecaptcha();
  }, [recaptchaVerifier]);

  const signInWithPhone = async (phoneNumber: string): Promise<ConfirmationResult> => {
    if (!recaptchaVerifier) {
      throw new Error('reCAPTCHA not initialized');
    }
    
    const confirmationResult = await signInWithPhoneNumber(
      auth, 
      phoneNumber, 
      recaptchaVerifier
    );
    return confirmationResult;
  };

  const confirmOtp = async (confirmationResult: ConfirmationResult, otp: string): Promise<void> => {
    await confirmationResult.confirm(otp);
  };

  const signOut = async (): Promise<void> => {
    await auth.signOut();
  };

  const value = {
    user,
    loading,
    signInWithPhone,
    confirmOtp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <div id="recaptcha-container"></div>
    </AuthContext.Provider>
  );
};
