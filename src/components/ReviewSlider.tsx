import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquarePlus } from 'lucide-react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
}

export function ReviewSlider({ onWriteReview }: { onWriteReview: () => void }) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      setReviews(fetched);
    });
    return () => unsubscribe();
  }, []);

  if (reviews.length === 0) {
    return (
      <div className="w-full relative py-12">
        <div className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory hide-scrollbar opacity-30 select-none pointer-events-none">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="min-w-[300px] md:min-w-[450px] bg-white/5 backdrop-blur-xl border border-white/5 p-10 rounded-[2.5rem] snap-center h-72 flex flex-col justify-end">
              <div className="h-4 w-24 bg-white/10 rounded-full mb-4" />
              <div className="h-6 w-full bg-white/5 rounded-lg mb-2" />
              <div className="h-6 w-2/3 bg-white/5 rounded-lg" />
            </div>
          ))}
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-center bg-black/60 backdrop-blur-2xl p-10 md:p-16 rounded-[3rem] border border-accent-yellow/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="w-20 h-20 bg-accent-yellow/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-accent-yellow/20">
              <Star className="w-10 h-10 text-accent-yellow fill-accent-yellow" />
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-black mb-4 uppercase tracking-tighter leading-none">BE THE FIRST TO IGNITE<br />THE WALL OF FAME.</h3>
            <p className="text-white/60 mb-10 max-w-xs mx-auto text-sm font-medium">Your experience could be the spark that starts it all. Help us define the standard.</p>
            <button 
              onClick={onWriteReview}
              className="bg-accent-yellow text-black font-black px-10 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto uppercase text-xs tracking-widest shadow-xl shadow-accent-yellow/10"
            >
              Write Your Review <MessageSquarePlus className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative group">
      <div className="flex overflow-x-auto gap-4 md:gap-8 pb-10 snap-x snap-mandatory hide-scrollbar">
        {reviews.map((rev, idx) => (
          <motion.div 
            key={rev.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-[260px] md:min-w-[360px] bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-[1.5rem] snap-center hover:border-accent-yellow/40 transition-colors relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 p-6 opacity-[0.03]">
              <Star className="w-20 h-20 text-accent-yellow fill-current" />
            </div>
            
            <div className="relative">
              <div className="flex gap-1 text-accent-yellow mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-white/10'}`} />
                ))}
              </div>
              <p className="text-white/90 text-sm md:text-base font-medium leading-[1.6] italic mb-6 tracking-tight">
                "{rev.comment}"
              </p>
            </div>

            <div className="flex items-center gap-3 border-t border-white/5 pt-4">
              <div className="w-8 h-8 bg-accent-yellow rounded-full flex items-center justify-center text-black font-black text-[10px] uppercase">
                {rev.name[0]}
              </div>
              <div>
                <div className="font-sans font-extrabold text-white text-xs tracking-tight uppercase">
                  {rev.name}
                </div>
                <div className="text-[8px] text-accent-yellow/60 font-black uppercase tracking-widest mt-0.5">
                  Verified Partner
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Call to Action Card at the end */}
        <motion.div 
          onClick={onWriteReview}
          className="min-w-[240px] md:min-w-[320px] bg-accent-yellow p-8 rounded-[1.5rem] snap-center cursor-pointer hover:bg-white hover:scale-[1.02] active:scale-95 transition-all flex flex-col justify-center items-center text-center group/cta"
        >
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4 group-hover/cta:scale-110 transition-transform shadow-xl">
            <MessageSquarePlus className="w-6 h-6 text-accent-yellow" />
          </div>
          <h3 className="text-black font-sans font-black text-xl md:text-2xl uppercase leading-none mb-2 tracking-tighter">SHARE YOUR<br />STORY</h3>
          <p className="text-black/50 font-bold text-[10px] max-w-[150px]">Help us define the next chapter.</p>
        </motion.div>
      </div>

      {/* Decorative Navigation Indicator for scrollable area */}
      <div className="flex justify-center gap-2 mt-4 opacity-50">
        {reviews.slice(0, 5).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
        ))}
      </div>
    </div>
  );
}
