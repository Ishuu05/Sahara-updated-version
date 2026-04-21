import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { Loader2 } from 'lucide-react';

export const GoogleLoginButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if profile exists
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const profile = docSnap.data();
        if (profile.role === 'government') {
          navigate('/gov/home');
        } else {
          navigate('/civilian/home');
        }
      } else {
        // New user - need to complete profile/role selection
        navigate('/register/complete-profile');
      }
    } catch (error) {
      console.error("Google Auth Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={loading}
      className="w-full h-14 bg-white border border-border rounded-2xl flex items-center justify-center gap-3 font-bold text-text hover:bg-gray-50 transition-all active:scale-[0.98] disabled:opacity-70 mt-4"
    >
      {loading ? (
        <Loader2 className="animate-spin text-primary" size={24} />
      ) : (
        <>
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google" 
            className="w-6 h-6"
            referrerPolicy="no-referrer"
          />
          Continue with Google
        </>
      )}
    </button>
  );
};
