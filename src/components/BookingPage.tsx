import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle2, Flame, Bot } from "lucide-react";

export interface BookingPageProps {
  onBack: () => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({ onBack }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    try {
      const payload = {
        name: formData.get('name'),
        businessName: formData.get('businessName'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        brandDescription: formData.get('brandDescription'),
        problem: formData.get('problem')
      };

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        throw new Error('Server returned ' + res.status);
      }
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to book call", err);
      // Let's actually notify the user
      alert("Failed to connect to the server. Please check your internet or try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white text-black"
    >
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-black/5 py-4 px-[5%] flex justify-between items-center">
        <button onClick={onBack} className="flex items-center gap-2 font-bold uppercase text-sm hover:translate-x-[-4px] transition-transform">
          <ArrowLeft className="w-4 h-4" /> Exit Booking
        </button>
        <div className="bg-accent-yellow px-4 py-1 text-xl font-display font-bold">OUTTREACH</div>
      </header>

      <div className="pt-32 pb-24 px-[5%] max-w-2xl mx-auto">
        {!submitted ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="mb-12">
              <span className="font-mono text-xs text-muted-gray uppercase tracking-widest block mb-4">1:1 Strategy Session</span>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-accent-yellow/10 border-l-4 border-accent-yellow p-4 mb-6 inline-block"
              >
                <p className="text-sm font-bold text-black flex items-center gap-2">
                  <Flame className="w-4 h-4 text-accent-yellow" />
                  Congratulations on choosing to grow. You're in the right place.
                </p>
              </motion.div>
              <h1 className="text-2xl md:text-5xl mb-4 md:mb-6 leading-tight">Let's map out your growth trajectory.</h1>
              <p className="text-sm md:text-base text-muted-gray leading-relaxed">
                Fill the details below to secure your spot. We listen first, expand later.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <div className="space-y-1 md:space-y-2">
                  <label className="block text-[8px] md:text-[10px] uppercase font-bold tracking-widest opacity-40">Your Name</label>
                  <input required name="name" type="text" className="w-full bg-neutral-50 border border-black/10 p-3 md:p-4 focus:border-accent-yellow outline-none transition-colors text-sm md:text-base" />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <label className="block text-[8px] md:text-[10px] uppercase font-bold tracking-widest opacity-40">Business Name</label>
                  <input required name="businessName" type="text" className="w-full bg-neutral-50 border border-black/10 p-3 md:p-4 focus:border-accent-yellow outline-none transition-colors text-sm md:text-base" />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <label className="block text-[8px] md:text-[10px] uppercase font-bold tracking-widest opacity-40">Phone Number</label>
                  <input required name="phone" type="tel" className="w-full bg-neutral-50 border border-black/10 p-3 md:p-4 focus:border-accent-yellow outline-none transition-colors text-sm md:text-base" />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <label className="block text-[8px] md:text-[10px] uppercase font-bold tracking-widest opacity-40">Email Address</label>
                  <input required name="email" type="email" className="w-full bg-neutral-50 border border-black/10 p-3 md:p-4 focus:border-accent-yellow outline-none transition-colors text-sm md:text-base" />
                </div>
              </div>

              <div className="space-y-1 md:space-y-2">
                <label className="block text-[8px] md:text-[10px] uppercase font-bold tracking-widest opacity-40">Describe Your Brand</label>
                <textarea required name="brandDescription" rows={3} className="w-full bg-neutral-50 border border-black/10 p-3 md:p-4 focus:border-accent-yellow outline-none transition-colors resize-none text-sm md:text-base" />
              </div>

              <div className="space-y-1 md:space-y-2">
                <label className="block text-[8px] md:text-[10px] uppercase font-bold tracking-widest opacity-40">What problem are you facing?</label>
                <textarea required name="problem" rows={4} className="w-full bg-neutral-50 border border-black/10 p-3 md:p-4 focus:border-accent-yellow outline-none transition-colors resize-none text-sm md:text-base" />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className={`w-full bg-black text-white font-bold py-4 md:py-6 text-lg md:text-xl rounded-sm hover:scale-[1.01] transition-all flex items-center justify-center gap-3 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Processing...' : 'Confirm Call Booking'} <CheckCircle2 className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="text-center py-20 relative"
          >
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring", bounce: 0.5 }}
              className="w-24 h-24 bg-accent-yellow rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(255,235,0,0.4)] relative"
            >
              <CheckCircle2 className="w-12 h-12 text-black" />
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl mb-4 font-display"
            >
              MISSION INITIATED.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 mb-12 flex justify-center"
            >
              <div className="bg-neutral-50 px-6 py-4 rounded-xl border border-black/5 shadow-lg flex items-center gap-4 max-w-sm text-left">
                <div className="w-10 h-10 bg-black rounded flex items-center justify-center shrink-0">
                  <Bot className="text-accent-yellow w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold opacity-40 mb-1">SAGE AI</p>
                  <p className="text-sm font-medium">"Brilliant choice! Our expert will reach out to you shortly."</p>
                </div>
              </div>
            </motion.div>

            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={onBack}
              className="bg-black text-white px-12 py-5 font-bold uppercase tracking-widest text-sm hover:translate-y-[-2px] transition-transform shadow-xl"
            >
              Back to Headquarters
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default BookingPage;
