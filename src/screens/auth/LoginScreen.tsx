import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Eye, EyeOff, Lock, Mail, HeartHandshake, Loader2, AlertCircle } from 'lucide-react';
import { auth, db } from '../../lib/firebase';
import { GoogleLoginButton } from '../../components/auth/GoogleLoginButton';

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
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
        navigate('/civilian/home'); // Fallback
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login');
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email to reset password');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent!');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col px-6 py-12">
      <div className="flex flex-col items-center mb-10">
        <div className="bg-primary p-4 rounded-2xl mb-4 shadow-lg shadow-primary/20">
          <HeartHandshake size={48} className="text-white" />
        </div>
        <h1 className="font-display text-4xl font-extrabold text-text mb-1">Sahara</h1>
        <p className="text-text-secondary font-medium">Please sign in to continue</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6 flex-1 max-w-md mx-auto w-full">
        {error && (
          <div className="bg-danger/10 border border-danger/20 p-4 rounded-xl flex items-start gap-3 animate-shake">
            <AlertCircle className="text-danger flex-shrink-0 mt-0.5" size={18} />
            <p className="text-danger text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-bold text-text-secondary ml-1">EMAIL ADDRESS</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. name@example.com"
              className="w-full h-14 bg-white border border-border rounded-2xl pl-12 pr-4 font-medium focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label className="text-sm font-bold text-text-secondary">PASSWORD</label>
            <button 
              type="button" 
              onClick={handleForgotPassword}
              className="text-sm font-bold text-primary"
            >
              FORGOT?
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              className="w-full h-14 bg-white border border-border rounded-2xl pl-12 pr-12 font-medium focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 bg-primary text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 mt-4"
        >
          {loading ? <Loader2 className="animate-spin" size={24} /> : "Login Now"}
        </button>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
          <div className="relative flex justify-center text-xs uppercase font-black tracking-widest leading-none">
            <span className="bg-bg px-4 text-text-secondary">Or continue with</span>
          </div>
        </div>

        <GoogleLoginButton />
      </form>

      <div className="mt-10 text-center">
        <p className="text-text-secondary font-medium">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-bold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};
