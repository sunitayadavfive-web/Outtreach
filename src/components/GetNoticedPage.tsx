import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle2, Flame, Bot, Send } from "lucide-react";

export interface GetNoticedPageProps {
  onBack: () => void;
  prefilledGoal?: string;
}

export const GetNoticedPage: React.FC<GetNoticedPageProps> = ({ onBack, prefilledGoal = "" }) => {
  const [submitted, setSubmitted] = useState(false);
  const [goals, setGoals] = useState(prefilledGoal);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setGoals(prefilledGoal);
  }, [prefilledGoal]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.get('fullName'),
          email: formData.get('email'),
          brand: formData.get('brand'),
          goals: formData.get('goals')
        })
      });
      if (!res.ok) {
        throw new Error('Server returned ' + res.status);
      }
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to send request", err);
      alert("Failed to connect to the server. Please check your internet or try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-text-black text-white px-[5%] py-12"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-accent-yellow font-bold uppercase tracking-widest text-sm mb-12 hover:translate-x-[-4px] transition-transform"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </button>

      <div className="max-w-4xl mx-auto">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.2 }}
           className="bg-accent-yellow/10 border-l-4 border-accent-yellow p-4 mb-6 inline-block"
        >
          <p className="text-sm font-bold text-white flex items-center gap-2">
            <Flame className="w-4 h-4 text-accent-yellow" />
            Congratulations on choosing to grow. You're in the right place.
          </p>
        </motion.div>
        <h2 className="text-4xl md:text-8xl leading-tight text-accent-yellow mb-4 md:mb-8">
          LET'S GET YOU<br />NOTICED.
        </h2>
        <p className="text-lg md:text-xl opacity-80 mb-10 md:mb-16 leading-relaxed">
          Tell us about your brand. We'll build a growth strategy that silence the noise and puts you in the spotlight.
        </p>

        {submitted ? (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="bg-white/5 border border-accent-yellow/30 p-8 md:p-12 text-center rounded-xl relative overflow-hidden"
          >
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring", bounce: 0.5 }}
              className="w-16 md:w-20 h-16 md:h-20 bg-accent-yellow rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-[0_0_30px_rgba(255,235,0,0.3)] relative"
            >
              <CheckCircle2 className="w-8 md:w-10 h-8 md:h-10 text-black" />
            </motion.div>
            
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl mb-4 text-accent-yellow font-display"
            >
              DATA RECEIVED.
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 md:mt-8 mb-8 md:mb-12 flex justify-center"
            >
              <div className="bg-black/50 px-4 md:px-6 py-3 md:py-4 rounded-xl border border-white/10 shadow-lg flex items-center gap-3 md:gap-4 max-w-md text-left">
                <div className="w-8 md:w-10 h-8 md:h-10 bg-white/10 rounded flex items-center justify-center shrink-0">
                  <Bot className="text-accent-yellow w-5 md:w-6 h-5 md:h-6" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-1 text-white">SAGE AI</p>
                  <p className="text-xs md:text-sm font-medium text-white italic">"Perfect. Our expert will reach out to you shortly."</p>
                </div>
              </div>
            </motion.div>

            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={onBack}
              className="bg-accent-yellow text-black font-bold py-3 md:py-4 px-6 md:px-8 uppercase text-xs md:text-sm hover:translate-y-[-2px] transition-transform rounded-sm"
            >
              Back to Spotlight
            </motion.button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-1 md:space-y-2">
              <label className="block text-[10px] md:text-xs uppercase font-bold tracking-widest opacity-60">Full Name</label>
              <input 
                required
                name="fullName"
                type="text" 
                placeholder="John Doe" 
                className="w-full bg-white/5 border border-white/10 p-4 md:p-5 focus:border-accent-yellow outline-none transition-colors text-sm"
              />
            </div>
            <div className="space-y-1 md:space-y-2">
              <label className="block text-[10px] md:text-xs uppercase font-bold tracking-widest opacity-60">Email Address</label>
              <input 
                required
                name="email"
                type="email" 
                placeholder="john@brand.com" 
                className="w-full bg-white/5 border border-white/10 p-4 md:p-5 focus:border-accent-yellow outline-none transition-colors text-sm"
              />
            </div>
            <div className="space-y-1 md:space-y-2 md:col-span-2">
              <label className="block text-[10px] md:text-xs uppercase font-bold tracking-widest opacity-60">Your Brand / Website</label>
              <input 
                required
                name="brand"
                type="text" 
                placeholder="https://yourbrand.com" 
                className="w-full bg-white/5 border border-white/10 p-4 md:p-5 focus:border-accent-yellow outline-none transition-colors text-sm"
              />
            </div>
            <div className="space-y-1 md:space-y-2 md:col-span-2">
              <label className="block text-[10px] md:text-xs uppercase font-bold tracking-widest opacity-60">What are your growth goals?</label>
              <textarea 
                required
                name="goals"
                rows={5}
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="Tell us what you want to achieve..." 
                className="w-full bg-white/5 border border-white/10 p-4 md:p-5 focus:border-accent-yellow outline-none transition-colors resize-none text-sm"
              ></textarea>
            </div>
            <div className="md:col-span-2 pt-4">
              <button 
                type="submit"
                disabled={loading}
                className={`w-full bg-accent-yellow text-black font-bold py-4 md:py-6 px-8 md:px-12 text-lg md:text-xl hover:scale-[1.02] transition-transform rounded-sm flex items-center justify-center gap-3 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Processing...' : 'Send Request'} <Send className="w-5 h-5" />
              </button>
              <p className="mt-8 text-center text-[11px] md:text-sm opacity-40 italic font-mono">
                Or reach out directly via WhatsApp: <a href="https://wa.me/918303984556" className="text-accent-yellow hover:underline">(+91) 83039 84556</a>
              </p>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default GetNoticedPage;
