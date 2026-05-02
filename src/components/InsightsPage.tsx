import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Zap, Target, Flame, Lightbulb, TrendingUp, Mail, Phone, Lock } from "lucide-react";

export function GrowthInsightPage({ onBack, comments = [], addComment, commentInput, setCommentInput, setCurrentPage, setShowPasswordModal }: { 
  onBack: () => void, 
  comments: any[], 
  addComment: (e: React.FormEvent) => void,
  commentInput: {name: string, text: string},
  setCommentInput: (val: any) => void,
  setCurrentPage: (page: string) => void,
  setShowPasswordModal: (show: boolean) => void,
  key?: string
}) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const safeComments = comments || [];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen"
    >
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-black/5 py-4 px-[5%] flex justify-between items-center">
        <button onClick={onBack} className="flex items-center gap-2 font-bold uppercase text-sm hover:translate-x-[-4px] transition-transform">
          <ArrowLeft className="w-4 h-4" /> Back to Insights
        </button>
        <div className="bg-accent-yellow px-4 py-1 text-xl font-display font-bold">OUTTREACH</div>
      </header>

      <article className="pt-32 pb-24 px-[5%] max-w-4xl mx-auto">
        <span className="font-mono text-[10px] md:text-xs text-muted-gray uppercase tracking-widest block mb-4">Growth Marketing • 10 min read</span>
        <h1 className="text-3xl md:text-7xl mb-10 leading-tight font-black uppercase tracking-tighter">Why Most Small Brands Fail at Social Media.</h1>
        
        <img 
          src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1500" 
          alt="Marketing failure visualization" 
          className="w-full aspect-[16/9] md:aspect-[21/9] object-cover mb-12 md:mb-16 grayscale-0 contrast-110 rounded-2xl"
          referrerPolicy="no-referrer"
        />

        <div className="prose prose-lg md:prose-xl max-w-none text-black space-y-10 md:space-y-12 font-sans leading-relaxed text-sm md:text-base">
          <p className="text-xl md:text-2xl font-medium italic border-l-4 border-accent-yellow pl-6">
            Small brands don't fail on social media because of a lack of focus. They fail because they misunderstand what social media is actually built for.
          </p>

          <p>Many small business owners treat social media like a digital flyer board. They keep posting offers, products, discounts, and random festival creatives — then wonder why nobody cares. But social media was never designed to reward businesses for existing. It rewards brands that capture attention, build trust, and stay memorable.</p>

          <div className="bg-neutral-100 p-8 md:p-12 text-center text-xl md:text-3xl font-display uppercase tracking-tight">
            Reach can be bought.<br />
            <span className="text-accent-yellow">Resonance must be built.</span>
          </div>

          <div className="space-y-16">
            <section>
              <h3 className="text-3xl mb-6 font-display">1. They Sell Before They’re Known</h3>
              <p>A stranger walking into a room and asking for money feels awkward. That’s exactly what many small brands do online. No trust. No relationship. No context. Just: “Order now.”</p>
              <p className="text-lg opacity-70">Example: A local clothing brand posting “Flat 20% Off” daily gets ignored. But showing styling ideas, customer stories, and behind-the-scenes makes people care.</p>
            </section>

            <section>
              <h3 className="text-3xl mb-6 font-display">2. They Talk About Themselves, Not The Audience</h3>
              <p>Most brand content says: “We launched this,” “We are best.” Customers silently ask: <strong className="text-accent-yellow italic">“What’s in it for me?”</strong></p>
              <p className="text-lg opacity-70">Winning brands speak customer language. Solve a problem instead of listing a feature.</p>
            </section>

            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1500" 
              alt="Audience connection" 
              className="w-full aspect-video object-cover my-12 rounded-xl shadow-lg"
              referrerPolicy="no-referrer"
            />

            <section>
              <h3 className="text-3xl mb-6 font-display">3. They Confuse Activity With Strategy</h3>
              <p>Posting daily does not mean growing daily. Many brands are busy creating content but not learning anything from it. No testing. No analytics. No pattern recognition.</p>
            </section>

            <section>
              <h3 className="text-3xl mb-6 font-display">4. They Look Inconsistent</h3>
              <p>One day luxury tone, next day meme page. This creates identity confusion. If people can’t predict your vibe, they can’t remember you.</p>
            </section>

            <section>
              <h3 className="text-3xl mb-6 font-display">5. They Copy Viral Trends Blindly</h3>
              <p>A trend can bring views, but random trends without brand relevance bring empty traffic. Attention without alignment is useless.</p>
            </section>

            <section>
              <h3 className="text-3xl mb-6 font-display">6. They Ignore the Power of Storytelling</h3>
              <p>Facts inform. Stories persuade. People forget features. They remember stories. Instead of saying "Our soap is handmade," tell the story of why you started in your kitchen.</p>
            </section>

            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1500" 
              alt="Data and Analytics" 
              className="w-full aspect-video object-cover my-12 rounded-xl shadow-lg"
              referrerPolicy="no-referrer"
            />

            <section>
              <h3 className="text-3xl mb-6 font-display">7. They Quit Too Early</h3>
              <p>Social media works like compound interest. Most quit during the invisible stage. Consistency matters because trust needs time.</p>
            </section>

            <section>
              <h3 className="text-3xl mb-6 font-display">8. They Don’t Build Community</h3>
              <p>Followers are not community. Community means people interact, defend, and feel included. Reply to comments, ask opinions, and feature your customers.</p>
            </section>

            <div className="bg-black text-white p-12 my-16 rounded-2xl">
              <h4 className="text-2xl font-display mb-6 uppercase">Real Example: The Coffee Battle</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm">
                <div className="opacity-60">
                  <p className="font-bold mb-4 uppercase tracking-widest text-accent-yellow">Brand A Posts:</p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>“Best coffee in town. Visit now.”</li>
                    <li>“Fresh beans arrived.”</li>
                    <li>“Discount on Latte.”</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold mb-4 uppercase tracking-widest text-accent-yellow">Brand B Posts:</p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>How freelancers use their space to focus</li>
                    <li>Customer story: A first date that happened here</li>
                    <li>Morning routine reel from the barista POV</li>
                    <li>Poll: Cold coffee vs Cappuccino?</li>
                  </ul>
                </div>
              </div>
              <p className="mt-8 text-center italic opacity-80">Brand B wins because they sell identity, habit, and belonging.</p>
            </div>

            <section>
              <h3 className="text-3xl mb-6 font-display">9. They Chase Vanity Metrics</h3>
              <p>Don’t confuse applause with business. Views feel exciting, but saves, shares, DMs, and website clicks are what drive real growth.</p>
            </section>

            <section>
              <h3 className="text-3xl mb-6 font-display">10. They Lack Patience + Positioning</h3>
              <p>Small brands often try to be for everyone. That weakens positioning. Strong brands choose a lane. Specificity attracts. Genericity disappears.</p>
            </section>
          </div>

          <div className="bg-accent-yellow p-12 mt-24 text-center rounded-2xl">
            <h4 className="text-3xl font-display mb-6 uppercase">The Deep Truth</h4>
            <p className="text-xl font-bold">Most small brands think they have a reach problem. Actually, they have a resonance problem. People saw it — it just didn’t matter enough to remember.</p>
          </div>

          <p className="font-bold text-2xl mt-12">Engagement Question:</p>
          <p>What do you think kills more small brands on social media?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {['A) No budget', 'B) No strategy', 'C) No patience', 'D) No emotional connection'].map((opt) => (
              <div key={opt} className="p-6 border-2 border-black hover:bg-black hover:text-white transition-all cursor-pointer font-bold uppercase text-sm flex items-center justify-between group">
                {opt} <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>

          <p className="text-center mt-12 text-sm opacity-50 uppercase tracking-[0.2em]">Contact Us</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="mailto:outtreachgrowth@gmail.com" className="bg-black text-white px-8 py-3 font-bold flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email Us
            </a>
            <a href="https://wa.me/918303984556" className="border-2 border-black px-8 py-3 font-bold flex items-center gap-2">
              <Phone className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>

        {/* Comment Section */}
        <section className="mt-24 pt-24 border-t border-black/10">
          <h2 className="text-4xl mb-12 flex items-center gap-4 uppercase font-display">
            Reader Comments <span className="bg-accent-yellow text-black text-sm px-3 py-1 rounded-full font-sans font-bold">{safeComments.length}</span>
          </h2>

          <form onSubmit={addComment} className="mb-16 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                required
                type="text" 
                placeholder="Your Name" 
                value={commentInput.name}
                onChange={(e) => setCommentInput({...commentInput, name: e.target.value})}
                className="w-full bg-neutral-50 border border-black/5 p-4 focus:border-accent-yellow outline-none transition-colors font-bold"
              />
            </div>
            <textarea 
              required
              rows={4}
              placeholder="Join the conversation..." 
              value={commentInput.text}
              onChange={(e) => setCommentInput({...commentInput, text: e.target.value})}
              className="w-full bg-neutral-50 border border-black/5 p-4 focus:border-accent-yellow outline-none transition-colors resize-none"
            ></textarea>
            <button 
              type="submit"
              className="bg-black text-white px-10 py-4 font-bold uppercase text-sm hover:translate-y-[-2px] transition-transform cursor-pointer"
            >
              Post Comment
            </button>
          </form>

          <div className="space-y-8">
            {safeComments.length === 0 ? (
              <p className="text-neutral-400 italic">No comments yet. Be the first to share your thoughts!</p>
            ) : (
              safeComments.map((comment, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className="bg-neutral-50 p-8 border-l-4 border-accent-yellow rounded-r-xl shadow-sm"
                >
                  <div className="flex justify-between items-center mb-4">
                    <strong className="text-lg uppercase">{comment.name}</strong>
                    <span className="text-xs font-mono opacity-40">{comment.date}</span>
                  </div>
                  <p className="text-neutral-600">{comment.text}</p>
                </motion.div>
              ))
            )}
          </div>
        </section>
      </article>
      
      <footer className="bg-black text-white py-12 px-[5%] text-center">
        <p className="text-xs opacity-40 tracking-widest uppercase mb-4">© 2026 Outtreach • Silence Out. Spotlight In.</p>
        <button 
          onClick={() => {
            if (localStorage.getItem('op_pass') === "698124") {
              setCurrentPage("admin");
            } else {
              setShowPasswordModal(true);
            }
          }} 
          className="text-[10px] font-bold uppercase tracking-widest opacity-20 hover:opacity-100 transition-opacity flex items-center gap-1 mx-auto"
        >
          <Lock className="w-3 h-3" /> Management
        </button>
      </footer>
    </motion.div>
  );
}

export function AdsInsightPage({ onBack, comments = [], addComment, commentInput, setCommentInput, setCurrentPage, setShowPasswordModal }: { 
  onBack: () => void, 
  comments: any[], 
  addComment: (e: React.FormEvent) => void,
  commentInput: {name: string, text: string},
  setCommentInput: (val: any) => void,
  setCurrentPage: (page: string) => void,
  setShowPasswordModal: (show: boolean) => void,
  key?: string
}) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const safeComments = comments || [];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen"
    >
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-black/5 py-4 px-[5%] flex justify-between items-center">
        <button onClick={onBack} className="flex items-center gap-2 font-bold uppercase text-sm hover:translate-x-[-4px] transition-transform">
          <ArrowLeft className="w-4 h-4" /> Back to Insights
        </button>
        <div className="bg-accent-yellow px-4 py-1 text-xl font-display font-bold">OUTTREACH</div>
      </header>

      <article className="pt-32 pb-24 px-[5%] max-w-4xl mx-auto">
        <span className="font-mono text-[10px] md:text-xs text-muted-gray uppercase tracking-widest block mb-4">Paid Ads • 7 min read</span>
        <h1 className="text-3xl md:text-7xl mb-10 leading-tight font-black uppercase tracking-tighter">How to make ₹10k work like ₹50k.</h1>
        
        <img 
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1500" 
          alt="Data Analytics Dashboard" 
          className="w-full aspect-[16/9] md:aspect-[21/9] object-cover mb-12 md:mb-16 grayscale-0 contrast-110 rounded-2xl"
          referrerPolicy="no-referrer"
        />

        <div className="prose prose-lg md:prose-xl max-w-none text-black space-y-10 md:space-y-12 font-sans leading-relaxed text-sm md:text-base">
          <p className="text-xl md:text-2xl font-medium italic border-l-4 border-accent-yellow pl-6">
            Most small brands think ads fail because the budget is too low. But many times, the real problem is not money. It is weak strategy.
          </p>

          <p>₹10,000 can perform like ₹50,000 when used with precision, while ₹50,000 can get wasted fast when spent without clarity. Paid ads don’t reward bigger spend first. They reward relevance, positioning, and conversion systems.</p>

          <div className="grid grid-cols-3 gap-3 md:gap-6 my-12 md:my-16">
            <div className="bg-neutral-50 p-4 md:p-8 text-center border-b-2 md:border-b-4 border-accent-yellow rounded-t-xl">
              <span className="text-2xl md:text-4xl font-display block mb-1 md:mb-2 italic font-black">85%</span>
              <p className="text-[8px] md:text-xs uppercase tracking-widest font-bold opacity-50">Relevance Rate</p>
            </div>
            <div className="bg-neutral-50 p-4 md:p-8 text-center border-b-2 md:border-b-4 border-accent-yellow rounded-t-xl">
              <span className="text-2xl md:text-4xl font-display block mb-1 md:mb-2 italic font-black">5X</span>
              <p className="text-[8px] md:text-xs uppercase tracking-widest font-bold opacity-50">ROI Scaling</p>
            </div>
            <div className="bg-neutral-50 p-4 md:p-8 text-center border-b-2 md:border-b-4 border-accent-yellow rounded-t-xl">
              <span className="text-2xl md:text-4xl font-display block mb-1 md:mb-2 italic font-black">0.5s</span>
              <p className="text-[8px] md:text-xs uppercase tracking-widest font-bold opacity-50">Hook Speed</p>
            </div>
          </div>

          <div className="space-y-16">
            <section>
              <h3 className="text-3xl mb-6 font-display uppercase tracking-tight">1. Winning Starts Before the Ad Runs</h3>
              <p>Many brands launch ads too early. Bad landing page. Weak offer. No trust signals. Ads only amplify what already exists. If your funnel is weak, more money only scales waste.</p>
            </section>

            <section>
              <h3 className="text-3xl mb-6 font-display uppercase tracking-tight">2. Narrow Targeting Beats Broad Guessing</h3>
              <p>Small brands often try to target everyone. That burns money quickly. ₹10k works better when focused on one specific buyer type. Sharp targeting buys intent; broad targeting buys curiosity.</p>
            </section>

            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1500" 
              alt="Audience Targeting" 
              className="w-full aspect-video object-cover my-12 rounded-2xl shadow-xl"
              referrerPolicy="no-referrer"
            />

            <section>
              <h3 className="text-3xl mb-6 font-display uppercase tracking-tight">3. One Strong Offer Beats Ten Average Creatives</h3>
              <p>Many brands keep changing visuals but ignore the offer. A strong offer—like Buy 2 Get 1 or a consultation—makes small budgets stretch. People don’t click for design; they click for value.</p>
            </section>

            <section>
              <h3 className="text-3xl mb-6 font-display uppercase tracking-tight">4. Retargeting Makes Small Budgets Powerful</h3>
              <p>Cold audiences are expensive. Warm audiences convert cheaper. Use part of your budget to retarget website visitors, reel engagers, and cart abandoners.</p>
            </section>

            <section>
              <h3 className="text-3xl mb-6 font-display uppercase tracking-tight">5. Creative Quality &gt; Camera Quality</h3>
              <p>Simple phone-shot content can outperform polished studio ads if it feels real. Founder speaking directly or customer reactions often beat overproduction.</p>
            </section>

            <section>
              <h3 className="text-3xl mb-6 font-display uppercase tracking-tight">6. Speed of Optimization Saves Budget</h3>
              <p>Optimize quickly—if the CTR is low, fix the hook. If clicks are high but sales are low, fix the page. Optimization turns average budgets into powerhouses.</p>
            </section>

            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1500" 
              alt="Team Analytics" 
              className="w-full aspect-video object-cover my-12 rounded-2xl shadow-xl"
              referrerPolicy="no-referrer"
            />

            <section>
              <h3 className="text-3xl mb-6 font-display uppercase tracking-tight">7. Use Data, Not Ego</h3>
              <p>Markets don’t care what founders like. They respond to what works. Test your headlines, offers, and videos. Let customers decide through data.</p>
            </section>

            <div className="bg-black text-white p-12 my-16 rounded-3xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-yellow opacity-10 blur-[60px]" />
              <h4 className="text-2xl font-display mb-6 uppercase tracking-widest text-[#FFE600]">Real Example: The Efficiency Duel</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm">
                <div className="opacity-60">
                  <p className="font-bold mb-4 uppercase tracking-widest text-accent-yellow">Brand A (₹50k Spend):</p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Broad targeting</li>
                    <li>Generic "Shop Now"</li>
                    <li>Weak Landing Page</li>
                    <li>No reviews/social proof</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold mb-4 uppercase tracking-widest text-accent-yellow">Brand B (₹10k Spend):</p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Niche audience (College women)</li>
                    <li>UGC try-on videos</li>
                    <li>Limited-time combo offer</li>
                    <li>Retargeting active visitors</li>
                  </ul>
                </div>
              </div>
              <p className="mt-8 text-center italic opacity-80 border-t border-white/10 pt-8">Brand B often outperforms Brand A because efficiency beats ego spend.</p>
            </div>
          </div>

          <div className="bg-accent-yellow p-12 mt-24 text-center rounded-3xl shadow-xl">
            <h4 className="text-3xl font-display mb-6 uppercase font-black tracking-tighter italic">Final Insight</h4>
            <p className="text-xl font-bold">Small budgets force discipline: better targeting, better offers, and faster learning. That discipline becomes an unfair advantage. Many brands don’t need more spend; they need sharper thinking.</p>
          </div>

          <p className="font-bold text-2xl mt-12">Engagement Question:</p>
          <p>What wastes ad budget the fastest?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {['A) Bad targeting', 'B) Weak creative', 'C) No retargeting', 'D) Poor landing page'].map((opt) => (
              <div key={opt} className="p-6 border-2 border-black hover:bg-black hover:text-white transition-all cursor-pointer font-bold uppercase text-xs flex items-center justify-between group">
                {opt} <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-24">
            <a href="mailto:outtreachgrowth@gmail.com" className="bg-black text-white px-8 py-4 font-bold flex items-center gap-3 w-full sm:w-auto justify-center hover:bg-accent-yellow hover:text-black transition-colors rounded">
              <Mail className="w-5 h-5" /> Let's Optimize Your Ads
            </a>
            <a href="https://wa.me/918303984556" className="border-2 border-black px-8 py-4 font-bold flex items-center gap-3 w-full sm:w-auto justify-center hover:bg-black hover:text-white transition-colors rounded">
              <Phone className="w-5 h-5" /> Free Ad Audit
            </a>
          </div>
        </div>

        {/* Comment Section */}
        <section className="mt-24 pt-24 border-t border-black/10">
          <h2 className="text-4xl mb-12 flex items-center gap-4 font-display font-black uppercase">
            Reader Comments <span className="bg-accent-yellow text-black text-sm px-3 py-1 rounded-full font-sans font-bold">{safeComments.length}</span>
          </h2>

          <form onSubmit={addComment} className="mb-16 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                required
                type="text" 
                placeholder="Your Name" 
                value={commentInput.name}
                onChange={(e) => setCommentInput({...commentInput, name: e.target.value})}
                className="w-full bg-neutral-50 border border-black/5 p-4 focus:border-accent-yellow outline-none transition-colors font-bold"
              />
            </div>
            <textarea 
              required
              rows={4}
              placeholder="How do you handle small ad budgets?" 
              value={commentInput.text}
              onChange={(e) => setCommentInput({...commentInput, text: e.target.value})}
              className="w-full bg-neutral-50 border border-black/5 p-4 focus:border-accent-yellow outline-none transition-colors resize-none"
            ></textarea>
            <button 
              type="submit"
              className="bg-black text-white px-10 py-4 font-bold uppercase text-sm hover:translate-y-[-2px] transition-transform cursor-pointer"
            >
              Post Comment
            </button>
          </form>

          <div className="space-y-8">
            {safeComments.length === 0 ? (
              <p className="text-neutral-400 italic">No comments yet. Share your experience with paid ads!</p>
            ) : (
              safeComments.map((comment, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className="bg-neutral-50 p-8 border-l-4 border-accent-yellow rounded-r-2xl shadow-sm"
                >
                  <div className="flex justify-between items-center mb-4">
                    <strong className="text-lg uppercase">{comment.name}</strong>
                    <span className="text-xs font-mono opacity-40">{comment.date}</span>
                  </div>
                  <p className="text-neutral-600">{comment.text}</p>
                </motion.div>
              ))
            )}
          </div>
        </section>
      </article>
      
      <footer className="bg-black text-white py-12 px-[5%] text-center">
        <p className="text-xs opacity-40 tracking-widest uppercase mb-4">© 2026 Outtreach • Silence Out. Spotlight In.</p>
        <button 
          onClick={() => {
            if (localStorage.getItem('op_pass') === "698124") {
              setCurrentPage("admin");
            } else {
              setShowPasswordModal(true);
            }
          }} 
          className="text-[10px] font-bold uppercase tracking-widest opacity-20 hover:opacity-100 transition-opacity flex items-center gap-1 mx-auto"
        >
          <Lock className="w-3 h-3" /> Management
        </button>
      </footer>
    </motion.div>
  );
}

export function AiInsightPage({ onBack, comments = [], addComment, commentInput, setCommentInput, setCurrentPage, setShowPasswordModal }: { 
  onBack: () => void, 
  comments: any[], 
  addComment: (e: React.FormEvent) => void,
  commentInput: {name: string, text: string},
  setCommentInput: (val: any) => void,
  setCurrentPage: (page: string) => void,
  setShowPasswordModal: (show: boolean) => void,
  key?: string
}) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const safeComments = comments || [];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen"
    >
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-black/5 py-4 px-[5%] flex justify-between items-center">
        <button onClick={onBack} className="flex items-center gap-2 font-bold uppercase text-sm hover:translate-x-[-4px] transition-transform">
          <ArrowLeft className="w-4 h-4" /> Back to Insights
        </button>
        <div className="bg-accent-yellow px-4 py-1 text-xl font-display font-bold">OUTTREACH</div>
      </header>

      <article className="pt-32 pb-24 px-[5%] max-w-4xl mx-auto">
        <span className="font-mono text-[10px] md:text-xs text-muted-gray uppercase tracking-widest block mb-4">AI Automation • 5 min read</span>
        <h1 className="text-3xl md:text-7xl mb-10 leading-tight font-black uppercase tracking-tighter">AI Automation: The Secret Weapon for Scaling.</h1>
        
        <img 
          src="https://images.unsplash.com/photo-1677442135136-760c813028c0?auto=format&fit=crop&q=80&w=1500" 
          alt="AI Automation" 
          className="w-full aspect-[16/9] md:aspect-[21/9] object-cover mb-12 md:mb-16 grayscale-0 contrast-110 rounded-2xl"
          referrerPolicy="no-referrer"
        />

        <div className="prose prose-lg md:prose-xl max-w-none text-black space-y-10 md:space-y-12 font-sans leading-relaxed text-sm md:text-base">
          <p className="text-xl md:text-2xl font-medium italic border-l-4 border-accent-yellow pl-6">
            Small businesses have the agility, but large enterprises have the workforce. With AI automation, you can finally have both.
          </p>

          <p>We are living in an era where delegating tasks doesn't require hiring full-time employees. From lead generation to data-entry, intelligent agents can handle the mundane, freeing up your time for deep, strategic work.</p>

          <div className="grid grid-cols-3 gap-3 md:gap-6 my-12 md:my-16">
            <div className="bg-neutral-50 p-4 md:p-8 text-center border-b-2 md:border-b-4 border-accent-yellow rounded-xl shadow-sm">
              <span className="text-2xl md:text-4xl font-display block mb-1 md:mb-2 italic font-black">24/7</span>
              <p className="text-[8px] md:text-xs uppercase tracking-widest font-bold opacity-50">Availability</p>
            </div>
            <div className="bg-neutral-50 p-4 md:p-8 text-center border-b-2 md:border-b-4 border-accent-yellow rounded-xl shadow-sm">
              <span className="text-2xl md:text-4xl font-display block mb-1 md:mb-2 italic font-black">70%</span>
              <p className="text-[8px] md:text-xs uppercase tracking-widest font-bold opacity-50">Time Saved</p>
            </div>
            <div className="bg-neutral-50 p-4 md:p-8 text-center border-b-2 md:border-b-4 border-accent-yellow rounded-xl shadow-sm">
              <span className="text-2xl md:text-4xl font-display block mb-1 md:mb-2 italic font-black">10X</span>
              <p className="text-[8px] md:text-xs uppercase tracking-widest font-bold opacity-50">Output Scaling</p>
            </div>
          </div>

          <div className="space-y-16">
            <section>
              <h3 className="text-3xl mb-6 font-display uppercase tracking-tight">1. Stop Doing Robotic Work</h3>
              <p>If a task is repetitive, rule-based, and predictable, it should be automated. Humans are built for creativity and relationship-building, not copy-pasting data across spreadsheets.</p>
            </section>

            <section>
              <h3 className="text-3xl mb-6 font-display uppercase tracking-tight">2. Instant Lead Qualification</h3>
              <p>When a prospect reaches out, speed is everything. AI agents can instantly engage, ask qualifying questions, and book appointments directly on your calendar while you are asleep.</p>
            </section>

            <section>
              <h3 className="text-3xl mb-6 font-display uppercase tracking-tight">3. Personalized Cold Outreach at Scale</h3>
              <p>Generic cold emails don't work anymore. AI can analyze a prospect's public profile and generate hyper-personalized outreach sequences that feel genuinely human.</p>
            </section>

            <section>
              <h3 className="text-3xl mb-6 font-display uppercase tracking-tight">4. Connect Your Ecosystem</h3>
              <p>Using no-code platforms like Make or Zapier combined with custom AI APIs, we can connect your CRM, email, Slack, and accounting software into a seamless, autonomous system.</p>
            </section>
          </div>
        </div>

        {/* Discussion Section */}
        <div className="mt-24 pt-16 border-t border-black/10">
          <h2 className="text-3xl font-display font-black uppercase mb-8">Join the Discussion</h2>
          
          <div className="bg-neutral-50 p-8 mb-12 rounded-2xl border border-black/5 shadow-inner">
            <h3 className="text-xl mb-6 font-bold uppercase tracking-tight">Leave a comment</h3>
            <form onSubmit={addComment} className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                value={commentInput.name}
                onChange={(e) => setCommentInput({...commentInput, name: e.target.value})}
                className="p-4 border border-black/10 bg-white focus:outline-none focus:border-accent-yellow transition-colors font-mono text-sm rounded"
                required
              />
              <textarea 
                placeholder="Share your thoughts..." 
                value={commentInput.text}
                onChange={(e) => setCommentInput({...commentInput, text: e.target.value})}
                className="p-4 border border-black/10 bg-white focus:outline-none focus:border-accent-yellow transition-colors font-mono text-sm min-h-[120px] resize-y rounded"
                required
              />
              <button 
                type="submit" 
                className="bg-black text-white font-bold py-4 px-8 self-start hover:bg-accent-yellow hover:text-black transition-colors cursor-pointer uppercase text-xs tracking-widest rounded"
              >
                Post Comment
              </button>
            </form>
          </div>

          <div className="space-y-8">
             <h3 className="text-xl font-bold mb-8 uppercase tracking-widest opacity-50">Recent Comments ({safeComments.length})</h3>
             {safeComments.length > 0 ? (
               safeComments.map((comment, i) => (
                 <div key={i} className="border-b border-black/5 pb-8">
                   <div className="flex items-center gap-3 mb-3">
                     <div className="w-10 h-10 bg-black text-accent-yellow flex items-center justify-center font-display text-xl font-bold rounded">
                       {comment.name.charAt(0).toUpperCase()}
                     </div>
                     <div>
                       <div className="font-bold uppercase tracking-tight">{comment.name}</div>
                       <div className="text-xs text-neutral-400 uppercase font-mono">{comment.date}</div>
                     </div>
                   </div>
                   <p className="text-neutral-600 leading-relaxed pl-13">{comment.text}</p>
                 </div>
               ))
             ) : (
               <p className="text-neutral-400 italic">No comments yet. Be the first to share your thoughts.</p>
             )}
          </div>
        </div>
      </article>

      <footer className="footer-ai py-8 px-[5%] text-center border-t border-black/5 flex justify-between items-center">
        <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest">© 2026 Outtreach Agency</p>
        <button 
          onClick={() => setShowPasswordModal(true)}
          className="text-xs text-neutral-400 hover:text-black transition-colors flex items-center gap-1 cursor-pointer font-bold uppercase tracking-widest"
        >
          <Lock className="w-3 h-3 text-accent-yellow" /> Management
        </button>
      </footer>
    </motion.div>
  );
}

export function LogoInsightPage({ onBack, comments = [], addComment, commentInput, setCommentInput, setCurrentPage, setShowPasswordModal }: { 
  onBack: () => void, 
  comments: any[], 
  addComment: (e: React.FormEvent) => void,
  commentInput: {name: string, text: string},
  setCommentInput: (val: any) => void,
  setCurrentPage: (page: string) => void,
  setShowPasswordModal: (show: boolean) => void,
  key?: string
}) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const safeComments = comments || [];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen"
    >
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-black/5 py-4 px-[5%] flex justify-between items-center">
        <button onClick={onBack} className="flex items-center gap-2 font-bold uppercase text-sm hover:translate-x-[-4px] transition-transform">
          <ArrowLeft className="w-4 h-4" /> Back to Insights
        </button>
        <div className="bg-accent-yellow px-4 py-1 text-xl font-display font-bold">OUTTREACH</div>
      </header>

      <article className="pt-32 pb-24 px-[5%] max-w-4xl mx-auto">
        <span className="font-mono text-[10px] md:text-xs text-muted-gray uppercase tracking-widest block mb-4">Brand Identity • 6 min read</span>
        <h1 className="text-3xl md:text-7xl mb-10 leading-tight font-black uppercase tracking-tighter">Your Logo Isn't Your Brand.</h1>
        
        <img 
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1500" 
          alt="Branding moodboard" 
          className="w-full aspect-[16/9] md:aspect-[21/9] object-cover mb-12 md:mb-16 grayscale-0 contrast-110 rounded-2xl md:rounded-3xl shadow-xl"
          referrerPolicy="no-referrer"
        />

        <div className="prose prose-lg md:prose-xl max-w-none text-black space-y-6 md:space-y-8 font-sans leading-relaxed text-sm md:text-base">
          <p className="text-xl md:text-2xl font-medium italic border-l-4 border-accent-yellow pl-6">
            Most brands think they have a visibility problem. In reality, they have a memory problem.
          </p>

          <p>Coca-Cola isn’t successful because of a red-and-white logo. It’s successful because that logo triggers a feeling instantly—Familiarity. Nostalgia. Trust. Happiness.</p>

          <p>And that’s where many brands get it wrong. They think a logo is the brand. It’s not.</p>
          
          <div className="bg-neutral-900 text-white p-6 md:p-12 my-8 md:my-16 text-center text-xl md:text-4xl font-display font-black uppercase tracking-tighter rounded-3xl">
            BRAND IMAGE ≠ LOGO<br />
            <span className="text-accent-yellow">LOGO = TRIGGER</span>
          </div>

          <p>A logo is not the whole story. It’s the shortcut to the story people already believe about you.</p>

          <img 
            src="https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&q=80&w=1500" 
            alt="Strategic design" 
            className="w-full aspect-video object-cover my-12 rounded-2xl shadow-lg"
            referrerPolicy="no-referrer"
          />

          <p>Many businesses overcomplicate their logos because they want to hide deep meaning inside the design. A mountain for ambition. A circle for unity. A random line “representing innovation.” Respectfully... customers are not doing treasure hunts.</p>

          <h3 className="text-3xl mt-16 mb-6 font-display font-black uppercase italic tracking-tighter">The Rule of Thumb</h3>
          <ul className="space-y-6 list-none pl-0">
            <li className="flex gap-4 items-start border-l-2 border-black/5 pl-6 py-2 hover:border-accent-yellow transition-colors"><span className="text-accent-yellow text-2xl font-black">01</span> <div><strong className="block uppercase text-xs tracking-widest opacity-40 mb-1">Simplicity</strong> <strong>Simpler logo = Easier to remember</strong></div></li>
            <li className="flex gap-4 items-start border-l-2 border-black/5 pl-6 py-2 hover:border-accent-yellow transition-colors"><span className="text-accent-yellow text-2xl font-black">02</span> <div><strong className="block uppercase text-xs tracking-widest opacity-40 mb-1">Recall</strong> <strong>Easier to remember = Stronger recognition</strong></div></li>
            <li className="flex gap-4 items-start border-l-2 border-black/5 pl-6 py-2 hover:border-accent-yellow transition-colors"><span className="text-accent-yellow text-2xl font-black">03</span> <div><strong className="block uppercase text-xs tracking-widest opacity-40 mb-1">Authority</strong> <strong>Stronger recognition = More trust</strong></div></li>
            <li className="flex gap-4 items-start border-l-2 border-black/5 pl-6 py-2 hover:border-accent-yellow transition-colors"><span className="text-accent-yellow text-2xl font-black">04</span> <div><strong className="block uppercase text-xs tracking-widest opacity-40 mb-1">ROI</strong> <strong>More trust = More conversions, more referrals, more sales</strong></div></li>
          </ul>

          <div className="my-16 p-10 bg-black text-white text-center rounded-3xl relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent-yellow/10 to-transparent" />
            <h4 className="text-accent-yellow text-2xl md:text-3xl mb-4 italic font-display font-black uppercase tracking-tighter">"Talented in silence is still silence."</h4>
            <p className="opacity-70 text-sm md:text-base font-bold uppercase tracking-widest">Strategic attention is what makes people stop scrolling and take action.</p>
          </div>

          <p className="text-lg font-medium">Drop your brand name below, and in one line I’ll tell you what emotion it should own in the market. 👇</p>
          <p className="font-bold text-xl md:text-2xl mt-8">If your brand looks good but gets ignored, <span className="text-accent-yellow underline">let’s fix that.</span></p>
          <div className="mt-8 flex gap-4">
             <a href="mailto:outtreachgrowth@gmail.com" className="text-black font-black border-b-4 border-accent-yellow hover:bg-accent-yellow transition-colors px-2 py-1 uppercase text-sm tracking-widest">Email Us</a>
          </div>
        </div>

        {/* Comment Section */}
        <section className="mt-24 pt-24 border-t border-black/10">
          <h2 className="text-4xl mb-12 flex items-center gap-4 font-display font-black uppercase">
            Reader Comments <span className="bg-accent-yellow text-black text-sm px-3 py-1 rounded-full font-sans font-bold">{safeComments.length}</span>
          </h2>

          <form onSubmit={addComment} className="mb-16 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                required
                type="text" 
                placeholder="Your Name" 
                value={commentInput.name}
                onChange={(e) => setCommentInput({...commentInput, name: e.target.value})}
                className="w-full bg-neutral-50 border border-black/5 p-4 focus:border-accent-yellow outline-none transition-colors font-bold rounded"
              />
            </div>
            <textarea 
              required
              rows={4}
              placeholder="Join the conversation..." 
              value={commentInput.text}
              onChange={(e) => setCommentInput({...commentInput, text: e.target.value})}
              className="w-full bg-neutral-50 border border-black/5 p-4 focus:border-accent-yellow outline-none transition-colors resize-none rounded"
            ></textarea>
            <button 
              type="submit"
              className="bg-black text-white px-10 py-4 font-bold uppercase text-sm hover:translate-y-[-2px] transition-transform cursor-pointer rounded"
            >
              Post Comment
            </button>
          </form>

          <div className="space-y-8">
            {safeComments.length === 0 ? (
              <p className="text-neutral-400 italic">No comments yet. Be the first to share your thoughts!</p>
            ) : (
              safeComments.map((comment, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className="bg-neutral-50 p-8 border-l-4 border-accent-yellow rounded-r-3xl shadow-sm"
                >
                  <div className="flex justify-between items-center mb-4">
                    <strong className="text-lg uppercase">{comment.name}</strong>
                    <span className="text-xs font-mono opacity-40">{comment.date}</span>
                  </div>
                  <p className="text-neutral-600 leading-relaxed font-sans">{comment.text}</p>
                </motion.div>
              ))
            )}
          </div>
        </section>
      </article>
      
      <footer className="footer-logo py-12 px-[5%] text-center border-t border-black/5 bg-neutral-50 rounded-t-[3rem]">
        <p className="text-xs opacity-40 tracking-widest uppercase mb-4 font-bold">© 2026 Outtreach • Silence Out. Spotlight In.</p>
        <button 
          onClick={() => {
            if (localStorage.getItem('op_pass') === "698124") {
              setCurrentPage("admin");
            } else {
              setShowPasswordModal(true);
            }
          }} 
          className="text-[10px] font-bold uppercase tracking-widest opacity-20 hover:opacity-100 transition-opacity flex items-center gap-1 mx-auto cursor-pointer"
        >
          <Lock className="w-3 h-3 text-accent-yellow" /> Management
        </button>
      </footer>
    </motion.div>
  );
}

export function InsightsMainPage({ onBack, onNavigate }: { onBack: () => void, onNavigate: (page: string, data?: any) => void }) {
  const [dbInsights, setDbInsights] = useState<any[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchInsights = async () => {
      try {
        const res = await fetch("/api/data?passcode=public");
        const json = await res.json();
        if (json.insights) {
          setDbInsights(json.insights);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchInsights();
  }, []);

  const hardcodedInsights = [
    { category: "Growth Marketing", title: "Why Most Small Brands Fail at Social Media", id: "insight-growth", readTime: "10 min", icon: <TrendingUp className="text-accent-yellow w-5 h-5" />, image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop" },
    { category: "Brand Identity", title: "Your Logo Isn't Your Brand", id: "insight-logo", readTime: "6 min", icon: <Target className="text-accent-yellow w-5 h-5" />, image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop" },
    { category: "Paid Ads", title: "How to make ₹10k work like ₹50k", id: "insight-ads", readTime: "7 min", icon: <Flame className="text-accent-yellow w-5 h-5" />, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" },
    { category: "AI Automation", title: "AI Automation: The Secret Weapon for Scaling", id: "insight-ai", readTime: "5 min", icon: <Zap className="text-accent-yellow w-5 h-5" />, image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#000000] min-h-screen text-white font-sans relative overflow-hidden"
    >
      {/* Cool graphics / background blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#FFE600] rounded-full blur-[150px] opacity-[0.12] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#FFE600] rounded-full blur-[200px] opacity-[0.08] pointer-events-none" />

      <main className="pt-24 md:pt-40 pb-24 px-[5%] max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-7xl lg:text-8xl mb-6 md:mb-8 leading-tight font-extrabold uppercase tracking-normal text-white">
              THE <span className="text-accent-yellow">SPOTLIGHT</span>
            </h1>
            <p className="text-base md:text-xl max-w-2xl mx-auto text-white/60 leading-relaxed font-medium px-4 md:px-0">
              High-leverage strategies, deep marketing breakdowns, and actionable advice to scale your brand in the digital age.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          {hardcodedInsights.map((post, idx) => (
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1, duration: 0.6 }}
               key={post.id} 
               onClick={() => onNavigate(post.id)}
               style={{ transformStyle: 'preserve-3d' }}
               className="bg-[#111111] rounded-3xl border border-white/10 hover:border-[#FFE600]/40 transition-all duration-500 group cursor-pointer flex flex-col relative overflow-hidden hover:md:-translate-y-4 hover:shadow-[0_20px_40px_rgba(255,230,0,0.15)] hover:bg-[#151515]"
             >
               {/* Image Header */}
               <div className="h-48 md:h-56 w-full overflow-hidden relative">
                 <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500 z-10" />
                 <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent z-20" />
               </div>

               <div className="p-6 md:p-10 flex-col flex flex-1 relative z-30 -mt-10 md:-mt-12">
                 <div className="flex justify-between items-center mb-4 md:mb-6">
                   <div className="flex items-center gap-2 md:gap-3">
                     <div className="bg-black/80 p-2 md:p-2.5 rounded-xl border border-white/10 group-hover:border-[#FFE600]/30 transition-colors backdrop-blur-md">
                       {post.icon}
                     </div>
                     <span className="font-mono text-[9px] md:text-xs text-[#FFE600] uppercase tracking-widest font-bold bg-black/60 px-2 md:px-3 py-1 md:py-1.5 rounded-full backdrop-blur-md border border-white/5">{post.category}</span>
                   </div>
                   <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-white/50 bg-black/60 px-2 md:px-3 py-1 md:py-1.5 rounded-full backdrop-blur-md border border-white/5">{post.readTime} READ</span>
                 </div>
                 
                 <h3 className="text-xl md:text-2xl lg:text-3xl leading-snug text-white font-bold tracking-normal pr-4 mb-6 md:mb-8 relative z-10">
                    {post.title}
                 </h3>
                 
                 <div className="mt-auto">
                   <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent mb-4 md:mb-6" />
                   <button className="font-bold text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2 md:gap-3 text-white/70 group-hover:text-[#FFE600] transition-colors">
                     READ ARTICLE <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
                   </button>
                 </div>
               </div>
             </motion.div>
          ))}

          {dbInsights.map((post, idx) => (
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: (idx + hardcodedInsights.length) * 0.1, duration: 0.6 }}
               key={post.id} 
               onClick={() => onNavigate("insight-dynamic", post)}
               style={{ transformStyle: 'preserve-3d' }}
               className="bg-[#111111] rounded-3xl border border-white/10 hover:border-[#FFE600]/40 transition-all duration-500 group cursor-pointer flex flex-col relative overflow-hidden hover:md:-translate-y-4 hover:shadow-[0_20px_40px_rgba(255,230,0,0.15)] hover:bg-[#151515]"
             >
               {/* Image Header - Dynamic or generic fallback */}
               <div className="h-48 md:h-56 w-full overflow-hidden relative">
                 <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500 z-10" />
                 <img src={post.coverImage || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent z-20" />
               </div>

               <div className="p-6 md:p-10 flex-col flex flex-1 relative z-30 -mt-10 md:-mt-12">
                 <div className="flex justify-between items-center mb-4 md:mb-6">
                   <div className="flex items-center gap-2 md:gap-3">
                     <div className="bg-black/80 p-2 md:p-2.5 rounded-xl border border-white/10 group-hover:border-[#FFE600]/30 transition-colors backdrop-blur-md">
                       <Lightbulb className="text-accent-yellow w-4 h-4 md:w-5 md:h-5" />
                     </div>
                     <span className="font-mono text-[9px] md:text-xs text-[#FFE600] uppercase tracking-widest font-bold bg-black/60 px-2 md:px-3 py-1 md:py-1.5 rounded-full backdrop-blur-md border border-white/5">{post.category}</span>
                   </div>
                   <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-white/50 bg-black/60 px-2 md:px-3 py-1 md:py-1.5 rounded-full backdrop-blur-md border border-white/5">5 MIN READ</span>
                 </div>
                 
                 <h3 className="text-xl md:text-2xl lg:text-3xl leading-snug text-white font-bold tracking-normal pr-4 mb-6 md:mb-8 relative z-10">
                    {post.title}
                 </h3>
                 
                 <div className="mt-auto">
                   <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent mb-4 md:mb-6" />
                   <button className="font-bold text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2 md:gap-3 text-white/70 group-hover:text-[#FFE600] transition-colors">
                     READ ARTICLE <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
                   </button>
                 </div>
               </div>
             </motion.div>
          ))}
        </div>
      </main>
    </motion.div>
  );
}

export function DynamicInsightPage({ onBack, post }: { onBack: () => void, post: any }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!post) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#000000] min-h-screen text-white font-sans relative overflow-hidden"
    >
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#FFE600] rounded-full blur-[200px] opacity-[0.08] pointer-events-none" />

      <article className="pt-20 md:pt-24 pb-24 px-[5%] max-w-5xl mx-auto relative z-10">
        <button onClick={onBack} className="mb-8 md:mb-12 font-bold text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2 md:gap-3 text-white/50 hover:text-[#FFE600] transition-colors group">
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-2 transition-transform text-[#FFE600]" /> BACK TO INSIGHTS
        </button>

        <div className="mb-10 md:mb-16">
          <span className="font-mono text-[10px] md:text-xs text-[#FFE600] uppercase tracking-widest font-bold block mb-4 md:mb-6">{post.category} • {new Date(post.createdAt || Date.now()).toLocaleDateString()}</span>
          <h1 className="text-3xl md:text-7xl mb-6 md:mb-8 leading-tight font-black uppercase tracking-tighter">{post.title}</h1>
          <div className="w-16 md:w-24 h-1.5 md:h-2 bg-[#FFE600] rounded-full mt-6 md:mt-8 mb-10 md:mb-12"></div>
        </div>

        {post.coverImage && (
          <div className="w-full h-auto max-h-[40vh] md:max-h-[60vh] overflow-hidden rounded-2xl md:rounded-3xl mb-10 md:mb-16 shadow-[0_0_40px_rgba(255,230,0,0.1)] border border-white/10">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {post.sections && post.sections.length > 0 ? (
          <div className="space-y-16 md:space-y-24">
            {post.sections.map((section: any, idx: number) => (
              <div key={idx} className="flex flex-col gap-6 md:gap-8">
                {section.heading && (
                  <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-white/90 leading-tight">
                    {section.heading}
                  </h2>
                )}
                {section.image && (
                  <div className="w-full rounded-xl md:rounded-2xl overflow-hidden border border-white/5">
                    <img src={section.image} alt={section.heading} className="w-full h-auto object-cover" />
                  </div>
                )}
                {section.content && (
                  <div className="prose prose-lg md:prose-xl prose-invert max-w-none text-white/70 font-sans leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                    {section.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="prose prose-lg md:prose-xl prose-invert max-w-none text-white/80 space-y-6 md:space-y-8 font-sans leading-relaxed whitespace-pre-wrap text-sm md:text-base">
            {post.content}
          </div>
        )}

        {post.question && (
          <div className="mt-16 md:mt-24 bg-[#111] border-l-4 border-[#FFE600] p-6 md:p-10 rounded-r-2xl md:rounded-r-3xl shadow-[0_0_30px_rgba(255,230,0,0.05)]">
            <h3 className="text-[#FFE600] font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3 md:mb-4">Final Question for You</h3>
            <p className="text-xl md:text-3xl font-bold leading-tight">{post.question}</p>
          </div>
        )}
        
        <div className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-white/10 flex justify-between items-center">
           <button onClick={onBack} className="font-bold text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2 md:gap-3 text-white hover:text-[#FFE600] transition-colors group">
             <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-2 transition-transform text-[#FFE600]" /> BACK TO INSIGHTS
           </button>
        </div>
      </article>
    </motion.div>
  );
}
