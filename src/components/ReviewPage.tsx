import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Send, ArrowLeft, CheckCircle, Trash2, MessageSquare } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: any;
}

export function ReviewPage({ onBack, isAdmin = false }: { onBack: () => void, isAdmin?: boolean }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/data?passcode=public");
        const data = await res.json();
        const fetchedReviews = data.reviews || [];
        setReviews(fetchedReviews.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      } catch (error) {
        console.error("Failed to load reviews");
      }
    };
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, comment })
      });
      if (!res.ok) {
        throw new Error('Server returned ' + res.status);
      }
      const newReview = await res.json();
      setReviews(prev => [newReview, ...prev]);
      setName('');
      setRating(5);
      setComment('');
      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 5000);
    } catch (error) {
      console.error(error);
      alert("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      const passcode = localStorage.getItem("op_pass");
      await fetch(`/api/data/reviews/${id}?passcode=${passcode}`, { method: "DELETE" });
      setReviews(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black min-h-screen text-white font-sans selection:bg-accent-yellow selection:text-black"
    >
      {/* Premium Header Aligned with Home Navigation */}
      <header className="sticky top-0 bg-black/80 backdrop-blur-xl z-50 border-b border-white/5 py-4 md:py-6 px-[5%] flex justify-between items-center overflow-hidden">
        <button onClick={onBack} className="flex items-center gap-3 font-bold uppercase text-[10px] tracking-[0.2em] hover:text-accent-yellow transition-colors group">
          <ArrowLeft className="w-4 h-4 text-accent-yellow group-hover:-translate-x-1 transition-transform" /> 
          <span className="hidden sm:inline">Headquarters</span>
          <span className="sm:hidden">Back</span>
        </button>

        <nav className="hidden lg:flex items-center gap-10">
          <button onClick={onBack} className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">SAGE AI</button>
          <button onClick={onBack} className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">Work</button>
          <button onClick={onBack} className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">Insights</button>
          <div className="bg-accent-yellow/10 px-4 py-1.5 rounded-full border border-accent-yellow/20">
            <span className="text-[10px] font-black uppercase tracking-widest text-accent-yellow">Reviews</span>
          </div>
        </nav>

        <div className="flex items-center gap-4">
           <div className="bg-accent-yellow text-black px-4 py-1.5 text-xs font-black tracking-tighter uppercase skew-x-[-10deg]">
            PARTNER ECHOES
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-[5%] py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Left Side: Submit Review */}
          <div className="space-y-10 lg:sticky lg:top-32">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-accent-yellow font-black uppercase text-[10px] tracking-[0.3em] block mb-4">Voice of the Partner</span>
              <h2 className="text-4xl md:text-6xl font-sans font-extrabold mb-6 leading-tight tracking-tight uppercase">
                SHARE YOUR<br />
                <span className="text-accent-yellow italic">JOURNEY.</span>
              </h2>
              <p className="text-base text-white/50 max-w-md font-medium leading-relaxed">
                Your feedback drives our obsession for perfection. Tell us how Outtreach transformed your brand journey.
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {showThankYou ? (
                <motion.div
                  key="thank-you"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-accent-yellow p-8 rounded-[2rem] text-center space-y-4 shadow-2xl relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <CheckCircle className="w-8 h-8 text-accent-yellow" />
                  </div>
                  <h3 className="text-2xl font-sans font-black uppercase text-black tracking-tighter">THANK YOU!</h3>
                  <p className="font-bold text-black/70 text-sm">Your spotlight has been captured in our wall of fame.</p>
                  <button 
                    onClick={() => setShowThankYou(false)}
                    className="mt-4 text-[10px] font-black uppercase tracking-widest border-b border-black/20 pb-1 hover:border-black transition-all text-black"
                  >
                    Write another review
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-white/[0.03] backdrop-blur-md p-8 rounded-[2rem] border border-white/5 space-y-6 shadow-2xl"
                >
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-black tracking-[0.2em] text-white/30">Contributor Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/[0.05] border border-white/10 p-4 rounded-xl focus:border-accent-yellow outline-none transition-all font-bold text-base text-white placeholder:text-white/10"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[9px] uppercase font-black tracking-[0.2em] text-white/30">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button 
                          key={s}
                          type="button"
                          onClick={() => setRating(s)}
                          className={`p-3 rounded-xl transition-all ${rating >= s ? 'bg-accent-yellow text-black scale-105' : 'bg-white/5 text-white/20 hover:bg-white/10'}`}
                        >
                          <Star className={`w-5 h-5 ${rating >= s ? 'fill-current' : ''}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-black tracking-[0.2em] text-white/30">Your Spotlight</label>
                    <textarea 
                      required
                      rows={3}
                      placeholder="How was the experience?"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full bg-white/[0.05] border border-white/10 p-4 rounded-xl focus:border-accent-yellow outline-none transition-all resize-none font-medium text-base leading-relaxed text-white placeholder:text-white/10"
                    />
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-accent-yellow text-black font-black py-4 rounded-xl text-base flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-xl shadow-accent-yellow/10 uppercase tracking-widest"
                  >
                    {isSubmitting ? 'SENDING...' : 'SUBMIT SPOTLIGHT'}
                    <Send className="w-4 h-4" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Side: Feed */}
          <div className="space-y-8">
            <div className="flex justify-between items-end border-b border-white/5 pb-6">
              <div>
                <h3 className="text-xl font-sans font-extrabold uppercase tracking-tight">Recent Echoes</h3>
                <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">Real impact from real partners</p>
              </div>
              <div className="text-[10px] font-black text-accent-yellow uppercase tracking-widest bg-accent-yellow/10 px-3 py-1 rounded-full">{reviews.length} TOTAL</div>
            </div>

            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
              {reviews.length === 0 ? (
                <div className="text-center py-24 border-2 border-dashed border-white/5 rounded-[2rem]">
                  <MessageSquare className="w-12 h-12 mx-auto text-white/5 mb-4" />
                  <p className="text-white/20 text-xs font-black uppercase tracking-widest">No spotlights yet. Ignite the wall.</p>
                </div>
              ) : (
                reviews.map((rev, idx) => (
                  <motion.div
                    key={rev.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl relative group hover:border-accent-yellow/30 transition-all hover:bg-white/[0.04]"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-sans font-black text-base uppercase tracking-tight mb-1">{rev.name}</div>
                        <div className="flex gap-0.5 text-accent-yellow">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-current' : 'text-white/5'}`} />
                          ))}
                        </div>
                      </div>
                      {isAdmin && (
                        <button 
                          onClick={() => handleDelete(rev.id)}
                          className="bg-red-500/10 text-red-500 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed font-medium italic">"{rev.comment}"</p>
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">
                        {rev.createdAt ? new Date(typeof rev.createdAt === 'string' ? rev.createdAt : typeof rev.createdAt === 'object' && 'toDate' in rev.createdAt ? rev.createdAt.toDate() : rev.createdAt).toLocaleDateString() : 'Just now'}
                      </div>
                      <div className="text-[8px] font-black text-accent-yellow/40 uppercase tracking-[0.2em] flex items-center gap-1.5">
                        <CheckCircle className="w-2.5 h-2.5" /> VERIFIED
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Decorative Atmosphere */}
      <div className="fixed top-0 right-0 w-1/2 h-1/2 bg-accent-yellow/5 blur-[150px] -z-10 rounded-full opacity-50"></div>
      <div className="fixed bottom-0 left-0 w-1/2 h-1/2 bg-white/5 blur-[150px] -z-10 rounded-full opacity-30"></div>

      {/* Large Decorative Text */}
      <div className="fixed bottom-0 right-0 p-8 opacity-[0.02] pointer-events-none select-none overflow-hidden h-32 md:h-64 flex items-end">
        <h4 className="text-[15vw] font-sans font-black leading-none whitespace-nowrap uppercase tracking-tighter">OUTTREACH</h4>
      </div>
    </motion.div>
  );
}
