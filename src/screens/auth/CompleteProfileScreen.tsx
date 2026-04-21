import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { Users, ShieldCheck, CheckCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { auth, db } from '../../lib/firebase';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

export const CompleteProfileScreen: React.FC = () => {
  const [role, setRole] = useState<'civilian' | 'government'>('civilian');
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleComplete = async () => {
    if (!auth.currentUser) return;

    if (role === 'government' && inviteCode !== 'SAHARA2025') {
      setError('Invalid government invite code');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const user = auth.currentUser;
      const profile = {
        uid: user.uid,
        name: user.displayName || 'Unnamed User',
        email: user.email,
        role: role,
        state: 'Maharashtra', // Default for demo
        district: 'Mumbai',    // Default for demo
        phone: user.phoneNumber || '',
        createdAt: new Date()
      };

      await setDoc(doc(db, 'users', user.uid), profile);
      
      if (role === 'government') {
        navigate('/gov/home');
      } else {
        navigate('/civilian/home');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save profile');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col px-6 py-12">
      <div className="mb-10 text-center">
        <h1 className="font-display text-3xl font-extrabold text-text mb-2">Welcome to Sahara</h1>
        <p className="text-text-secondary font-medium">Please select your role to continue</p>
      </div>

      <div className="space-y-6 flex-1 max-w-md mx-auto w-full">
        {error && (
          <div className="bg-danger/10 border border-danger/20 p-4 rounded-xl flex items-start gap-3">
            <AlertCircle className="text-danger flex-shrink-0 mt-0.5" size={18} />
            <p className="text-danger text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Role Selection */}
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => { setRole('civilian'); setError(null); }}
            className={clsx(
              "p-6 rounded-[32px] border-2 text-left transition-all relative overflow-hidden group",
              role === 'civilian' ? "border-primary bg-primary/5 shadow-lg shadow-primary/5" : "border-border bg-white"
            )}
          >
            <div className="flex items-center gap-4 mb-2">
              <div className={clsx(
                "p-3 rounded-2xl",
                role === 'civilian' ? "bg-primary text-white" : "bg-bg text-text-secondary"
              )}>
                <Users size={24} />
              </div>
              <h3 className="text-xl font-black text-text">Civilian</h3>
            </div>
            <p className="text-sm font-medium text-text-secondary leading-snug">Receive alerts, find help, and report damage.</p>
            {role === 'civilian' && (
              <div className="absolute right-4 top-4 text-primary">
                <CheckCircle size={24} />
              </div>
            )}
          </button>

          <button
            onClick={() => { setRole('government'); setError(null); }}
            className={clsx(
              "p-6 rounded-[32px] border-2 text-left transition-all relative overflow-hidden group",
              role === 'government' ? "border-primary bg-primary/5 shadow-lg shadow-primary/5" : "border-border bg-white"
            )}
          >
            <div className="flex items-center gap-4 mb-2">
              <div className={clsx(
                "p-3 rounded-2xl",
                role === 'government' ? "bg-primary text-white" : "bg-bg text-text-secondary"
              )}>
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-black text-text">Official</h3>
            </div>
            <p className="text-sm font-medium text-text-secondary leading-snug">Manage alerts, dispatch help, and analyze damage.</p>
            {role === 'government' && (
              <div className="absolute right-4 top-4 text-primary">
                <CheckCircle size={24} />
              </div>
            )}
          </button>
        </div>

        {/* Invite Code for Gov */}
        {role === 'government' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2 pt-2"
          >
            <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] ml-1">Government Invite Code</label>
            <input
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              placeholder="Enter code (SAHARA2025)"
              className="w-full h-14 bg-white border-2 border-border rounded-2xl px-6 font-bold text-text outline-none focus:border-primary transition-all uppercase tracking-widest placeholder:tracking-normal placeholder:font-medium"
            />
          </motion.div>
        )}

        <button
          onClick={handleComplete}
          disabled={loading}
          className="w-full h-14 bg-primary text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/20 mt-8 active:scale-[0.98] transition-all disabled:opacity-70"
        >
          {loading ? <Loader2 className="animate-spin" size={24} /> : (
            <>
              Finish Setup <ArrowRight size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
