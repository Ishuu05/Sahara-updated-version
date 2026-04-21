import React, { useState, useRef } from 'react';
import { Camera, Upload, CheckCircle, AlertTriangle, Loader2, Info, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeInfrastructure } from '../../services/geminiService';
import { submitInfrastructureReport } from '../../services/firestoreService';
import { useLocation } from '../../hooks/useLocation';
import { StatusBadge } from '../../components/common/StatusBadge';
import { clsx } from 'clsx';

export const ImageUploaderScreen: React.FC = () => {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [formData, setFormData] = useState({
    type: 'Bridge',
    age: '',
    materials: 'Concrete',
    description: ''
  });
  
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  const runAnalysis = async () => {
    if (!image) return;
    setLoading(true);
    try {
      // Simulation for demo purposes
      const simulatedResult = {
        severity: "High",
        estimated_usable_months: 6,
        immediate_risks: ["Structural cracks in support beam", "Severe corrosion at Joints", "Unstable footing"],
        recommended_action: "Urgent Repair",
        confidence_score: 92,
        reasoning: "The image shows deep primary stress cracks in the concrete column and visible steel rebar rust. Immediate load reduction recommended."
      };
      
      await new Promise(r => setTimeout(r, 2000));
      setAnalysis(simulatedResult);
      setStep(3);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await submitInfrastructureReport({
        ...formData,
        ...analysis,
        lat: location.lat,
        lng: location.lng,
        imageUrl: image,
        status: 'pending'
      });
      setStep(4);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg pb-24">
      {/* Header */}
      <header className="bg-surface px-6 pt-12 pb-6 border-b border-border sticky top-0 z-[1001]">
        <h1 className="font-display text-2xl font-black text-text">Infrastructure Audit</h1>
        <p className="text-text-secondary text-sm font-medium mt-1">AI-powered damage assessment</p>
      </header>

      <main className="p-6">
        <AnimatePresence mode="wait">
          {/* STEP 1: CAPTURE */}
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-8 py-8"
            >
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-square bg-surface border-4 border-dashed border-border rounded-[48px] flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-all active:scale-[0.98] shadow-sm relative overflow-hidden"
              >
                <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                  <Camera size={48} />
                </div>
                <div className="text-center">
                  <p className="font-black text-xl text-text">Take Audit Photo</p>
                  <p className="text-sm font-bold text-text-secondary mt-1">Capture structural details clearly</p>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                />
              </button>

              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex gap-4">
                <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center flex-shrink-0">
                  <Info size={20} />
                </div>
                <p className="text-sm font-medium text-text-secondary leading-relaxed">
                  Your report will be automatically geolocated and sent to the PWD & NDRF command centers for priority review.
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 2: DETAILS */}
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="aspect-video bg-surface rounded-[32px] overflow-hidden shadow-md border border-border relative">
                 <img src={image!} alt="Audit" className="w-full h-full object-cover" />
                 <button onClick={() => setStep(1)} className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-xl text-danger font-bold text-xs uppercase tracking-widest">Retake</button>
              </div>

              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest ml-1">Type</label>
                    <select 
                      value={formData.type}
                      onChange={e => setFormData({ ...formData, type: e.target.value })}
                      className="w-full h-14 bg-white border border-border rounded-2xl px-4 font-bold text-sm"
                    >
                      <option>Bridge</option>
                      <option>Building</option>
                      <option>Dam</option>
                      <option>Road</option>
                      <option>Pole/Line</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest ml-1">Est. Age (Yrs)</label>
                    <input 
                      type="number"
                      value={formData.age}
                      onChange={e => setFormData({ ...formData, age: e.target.value })}
                      placeholder="e.g. 25"
                      className="w-full h-14 bg-white border border-border rounded-2xl px-4 font-bold text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest ml-1">Primary Material</label>
                   <div className="grid grid-cols-3 gap-2">
                      {['Concrete', 'Steel', 'Brick'].map(m => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setFormData({ ...formData, materials: m })}
                          className={clsx(
                            "h-12 rounded-xl text-[10px] font-black uppercase border transition-all",
                            formData.materials === m ? "bg-primary text-white border-primary" : "bg-white text-text-secondary border-border"
                          )}
                        >
                          {m}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest ml-1">Observed Issues</label>
                  <textarea 
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe visible cracks, rust, or leaning..."
                    className="w-full h-32 bg-white border border-border rounded-3xl p-4 font-medium text-sm outline-none"
                  />
                </div>

                <button
                  onClick={runAnalysis}
                  disabled={loading}
                  className="w-full h-14 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-all"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : "Run AI Analysis"}
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: ANALYSIS RESULT */}
          {step === 3 && analysis && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="relative bg-surface rounded-[40px] p-6 shadow-xl border border-border overflow-hidden">
                 <div className={clsx(
                   "absolute top-0 left-0 right-0 h-2",
                   analysis.severity === 'Critical' || analysis.severity === 'High' ? "bg-danger" : "bg-warning"
                 )}></div>
                 
                 <div className="flex justify-between items-start mb-6">
                    <div>
                       <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">Audit Severity</p>
                       <StatusBadge status={analysis.severity} label={analysis.severity + " Risk"} />
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">AI Confidence</p>
                       <p className="font-black text-lg text-primary">{analysis.confidence_score}%</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div>
                       <h3 className="text-sm font-black text-text uppercase tracking-widest mb-3 flex items-center gap-2">
                         <AlertTriangle size={16} className="text-warning" /> Primary Risks Detected
                       </h3>
                       <div className="space-y-2">
                          {analysis.immediate_risks.map((risk: string, i: number) => (
                             <div key={i} className="flex gap-3 bg-bg p-3 rounded-2xl border border-border">
                                <div className="w-1.5 h-1.5 bg-danger rounded-full mt-1.5 flex-shrink-0"></div>
                                <p className="text-[13px] font-bold text-text-secondary leading-snug">{risk}</p>
                             </div>
                          ))}
                       </div>
                    </div>

                    <div className="p-5 bg-white border-2 border-primary/20 rounded-3xl">
                       <h3 className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 italic">Official Recommendation</h3>
                       <p className="text-base font-black text-text leading-tight mb-2 underline">{analysis.recommended_action}</p>
                       <p className="text-xs font-medium text-text-secondary italic">"{analysis.reasoning}"</p>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                 <button onClick={() => setStep(2)} className="h-14 rounded-2xl border-2 border-border font-bold text-text-secondary">Edit Details</button>
                 <button 
                  onClick={handleSubmit} 
                  disabled={loading}
                  className="h-14 rounded-2xl bg-primary text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 border-2 border-primary"
                 >
                    {loading ? <Loader2 size={20} className="animate-spin" /> : "Submit Report"}
                 </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-32 h-32 bg-safe/10 text-safe rounded-full flex items-center justify-center mb-8 animate-bounce">
                 <ShieldCheck size={80} />
              </div>
              <h2 className="font-display text-4xl font-extrabold text-text mb-4">Report Logged</h2>
              <p className="text-lg text-text-secondary font-medium px-8 leading-relaxed">
                Thank you for your vigilance. Local authorities have been notified for immediate inspection.
              </p>
              <div className="w-full max-w-xs mt-12 space-y-4">
                 <button 
                  onClick={() => setStep(1)} 
                  className="w-full h-14 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2"
                 >
                   Conduct New Audit
                 </button>
                 <button 
                  onClick={() => window.location.href = '/civilian/home'} 
                  className="w-full h-14 bg-surface text-text-secondary border border-border rounded-2xl font-bold"
                 >
                   Return Home
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
