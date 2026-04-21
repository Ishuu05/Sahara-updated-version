import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { 
  User, Mail, Lock, Phone, Map, Briefcase, 
  ChevronRight, ChevronLeft, Loader2, AlertCircle, ShieldCheck 
} from 'lucide-react';
import { auth, db } from '../../lib/firebase';
import { clsx } from 'clsx';
import { GoogleLoginButton } from '../../components/auth/GoogleLoginButton';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", 
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", 
  "Lakshadweep", "Puducherry"
];

export const RegisterScreen: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    state: 'Maharashtra',
    district: '',
    role: 'civilian' as 'civilian' | 'government',
    inviteCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(2);
      return;
    }
    
    setLoading(true);
    setError(null);

    // Validate Gov Invite Code
    if (formData.role === 'government' && formData.inviteCode !== 'SAHARA2025') {
      setError('Invalid government official invite code');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        state: formData.state,
        district: formData.district,
        createdAt: new Date().toISOString()
      });
      
      if (formData.role === 'government') {
        navigate('/gov/home');
      } else {
        navigate('/civilian/home');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col px-6 py-12">
      <div className="flex items-center gap-4 mb-8">
        {step > 1 && (
          <button onClick={() => setStep(1)} className="p-2 -ml-2 text-text">
            <ChevronLeft size={24} />
          </button>
        )}
        <h1 className="font-display text-3xl font-extrabold text-text">
          {step === 1 ? "Join Sahara" : "Almost Done"}
        </h1>
      </div>

      <div className="flex gap-2 mb-8">
        <div className={clsx("h-1.5 flex-1 rounded-full", step >= 1 ? "bg-primary" : "bg-gray-200")} />
        <div className={clsx("h-1.5 flex-1 rounded-full", step >= 2 ? "bg-primary" : "bg-gray-200")} />
      </div>

      <form onSubmit={handleRegister} className="space-y-6 flex-1 max-w-md mx-auto w-full">
        {error && (
          <div className="bg-danger/10 border border-danger/20 p-4 rounded-xl flex items-start gap-3 animate-shake">
            <AlertCircle className="text-danger flex-shrink-0 mt-0.5" size={18} />
            <p className="text-danger text-sm font-medium">{error}</p>
          </div>
        )}

        {step === 1 ? (
          <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">FULL NAME</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Official ID Name"
                  className="w-full h-14 bg-white border border-border rounded-2xl pl-12 pr-4 font-medium outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">EMAIL ADDRESS</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full h-14 bg-white border border-border rounded-2xl pl-12 pr-4 font-medium outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">PHONE NUMBER</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 1234567890"
                  className="w-full h-14 bg-white border border-border rounded-2xl pl-12 pr-4 font-medium outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">PASSWORD</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Min 6 characters"
                  className="w-full h-14 bg-white border border-border rounded-2xl pl-12 pr-4 font-medium outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">STATE / U.T.</label>
              <div className="relative">
                <Map className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full h-14 bg-white border border-border rounded-2xl pl-12 pr-4 font-medium outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none"
                  required
                >
                  {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">DISTRICT / CITY</label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  placeholder="e.g. Mumbai North"
                  className="w-full h-14 bg-white border border-border rounded-2xl pl-12 pr-4 font-medium outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1 mb-3 block">ACCOUNT ROLE</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'civilian' })}
                  className={clsx(
                    "h-20 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all",
                    formData.role === 'civilian' 
                      ? "border-primary bg-primary/5 text-primary" 
                      : "border-border bg-white text-text-secondary"
                  )}
                >
                  <User size={24} />
                  <span className="font-bold text-xs uppercase">Civilian</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'government' })}
                  className={clsx(
                    "h-20 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all",
                    formData.role === 'government' 
                      ? "border-primary bg-primary/5 text-primary" 
                      : "border-border bg-white text-text-secondary"
                  )}
                >
                  <ShieldCheck size={24} />
                  <span className="font-bold text-xs uppercase">Official</span>
                </button>
              </div>
            </div>

            {formData.role === 'government' && (
              <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">GOV INVITE CODE</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={formData.inviteCode}
                    onChange={(e) => setFormData({ ...formData, inviteCode: e.target.value })}
                    placeholder="Enter code provided by HQ"
                    className="w-full h-14 bg-white border border-border rounded-2xl pl-12 pr-4 font-medium outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  />
                </div>
                <p className="text-[10px] text-text-secondary italic ml-1">Demo Code: SAHARA2025</p>
              </div>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 bg-primary text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 mt-4"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <>
              {step === 1 ? "Next Step" : "Complete Registration"}
              <ChevronRight size={20} />
            </>
          )}
        </button>

        {step === 1 && (
          <>
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
              <div className="relative flex justify-center text-xs uppercase font-black tracking-widest leading-none">
                <span className="bg-bg px-4 text-text-secondary">Or continue with</span>
              </div>
            </div>
            <GoogleLoginButton />
          </>
        )}
      </form>

      <div className="mt-10 mb-8 text-center">
        <p className="text-text-secondary font-medium">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-bold">Sign In</Link>
        </p>
      </div>
    </div>
  );
};
