import React from "react";
import { motion } from "motion/react";
import { 
  TrendingUp, Flame, Smartphone, Search, Target, Film, Cpu, ArrowLeft, Bot, ExternalLink 
} from "lucide-react";

export const servicesData = [
  { id: "ai-automation", icon: <Cpu className="w-10 h-10" />, title: "AI Automation", desc: "Automate your workflows, qualify leads 24/7, and scale operations with intelligent agents and AI tools. Save thousands of hours and eliminate operational bottlenecks seamlessly.", isHighlighted: true },
  { id: "growth-marketing", icon: <TrendingUp className="w-10 h-10" />, title: "Growth Marketing", desc: "We build data-backed growth systems tailored to your brand. From deep audience research to high-converting funnel design and rigorous scaling strategy." },
  { id: "brand-identity", icon: <Flame className="w-10 h-10" />, title: "Brand Identity", desc: "Your brand is a feeling. We create cohesive visual identities, purposeful typography, and impactful messaging that makes you undeniably unforgettable." },
  { id: "social-media", icon: <Smartphone className="w-10 h-10" />, title: "Social Media", desc: "We run your socials so you can run your business. Monthly content strategy, creation, and precision community management that builds true fans." },
  { id: "seo-organic", icon: <Search className="w-10 h-10" />, title: "SEO & Organic", desc: "Rank higher. Get found. We make Google work for you 24/7 with long-term organic authority building, technical SEO, and semantic keyword mastery." },
  { id: "performance-ads", icon: <Target className="w-10 h-10" />, title: "Performance Ads", desc: "Every rupee working harder than the last. Precision-targeted, high-converting campaigns on Meta, Google, and YouTube designed entirely for ROI." },
  { id: "content-production", icon: <Film className="w-10 h-10" />, title: "Content Production", desc: "Scroll-stopping reels and exquisite branded graphics that convert attention into definitive action and build solid consumer trust." },
];

export function GrowthMarketingPage({ onBack, onNavigateToGetNoticed }: { onBack: () => void, onNavigateToGetNoticed: (goal: string) => void }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="min-h-screen bg-text-black text-white px-[5%] py-12 pb-32">
      <button onClick={onBack} className="flex items-center gap-2 text-accent-yellow font-bold uppercase tracking-widest text-sm mb-12 hover:translate-x-[-4px] transition-transform">
        <ArrowLeft className="w-4 h-4" /> Back to Work
      </button>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-7xl font-display mb-6 md:mb-8">GROWTH<br/>MARKETING</h1>
        <p className="text-lg md:text-xl opacity-80 leading-relaxed mb-10 md:mb-16">
          We don't just run campaigns; we build sustainable growth systems. Our data-backed approach involves deep audience research, conversion-optimized funnel design, and rigorous scaling strategy to ensure predictable revenue.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left mb-10 md:mb-16">
          <div className="bg-black/40 border-2 border-white/10 p-6 md:p-8 rounded-2xl relative overflow-hidden group hover:border-accent-yellow/50 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-yellow/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-accent-yellow/20 transition-all"></div>
            <h3 className="text-lg md:text-xl text-accent-yellow mb-4 md:mb-6 font-black font-display tracking-wide relative z-10">How We Help Your Brand</h3>
            <ul className="space-y-3 md:space-y-4 opacity-90 relative z-10 text-sm md:text-base">
              <li className="flex items-center gap-3"><span className="text-accent-yellow text-lg font-bold">✓</span> Identify untapped market segments</li>
              <li className="flex items-center gap-3"><span className="text-accent-yellow text-lg font-bold">✓</span> Optimize your conversion rate (CRO)</li>
              <li className="flex items-center gap-3"><span className="text-accent-yellow text-lg font-bold">✓</span> Reduce Customer Acquisition Cost (CAC)</li>
              <li className="flex items-center gap-3"><span className="text-accent-yellow text-lg font-bold">✓</span> Increase Lifetime Value (LTV)</li>
            </ul>
          </div>
          <div className="bg-black/40 border-2 border-white/10 p-6 md:p-8 rounded-2xl relative overflow-hidden group hover:border-accent-yellow/50 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-yellow/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-accent-yellow/20 transition-all"></div>
            <h3 className="text-lg md:text-xl text-accent-yellow mb-4 md:mb-6 font-black font-display tracking-wide relative z-10">What We Do</h3>
            <ul className="space-y-3 md:space-y-4 opacity-90 relative z-10 text-sm md:text-base">
              <li className="flex items-center gap-3"><span className="text-accent-yellow text-lg font-bold">✓</span> Funnel Architecture</li>
              <li className="flex items-center gap-3"><span className="text-accent-yellow text-lg font-bold">✓</span> Multi-channel Orchestration</li>
              <li className="flex items-center gap-3"><span className="text-accent-yellow text-lg font-bold">✓</span> A/B Testing & Data Analytics</li>
              <li className="flex items-center gap-3"><span className="text-accent-yellow text-lg font-bold">✓</span> Retention Strategy</li>
            </ul>
          </div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigateToGetNoticed("I want to work in growth marketing to scale my brand.")}
          className="bg-accent-yellow text-black px-6 md:px-8 py-4 md:py-5 text-sm md:text-lg font-bold uppercase tracking-widest rounded-lg shadow-[0_0_20px_rgba(255,235,0,0.3)] hover:shadow-[0_0_40px_rgba(255,235,0,0.5)] transition-all"
        >
          Get in touch
        </motion.button>
      </div>
    </motion.div>
  );
}

export function WorkPage({ onBack, onSelectWork }: { onBack: () => void, onSelectWork: (id: string) => void }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-text-black text-white px-[5%] py-12 pb-32"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-accent-yellow font-bold uppercase tracking-widest text-sm mb-12 hover:translate-x-[-4px] transition-transform"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Headquarters
      </button>

      <div className="max-w-6xl mx-auto text-center px-4 md:px-0">
        <div className="text-center mb-10 md:mb-20">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block bg-accent-yellow/10 border border-accent-yellow/50 px-4 md:px-6 py-1.5 md:py-2 rounded-full mb-6 md:mb-8"
          >
            <span className="text-accent-yellow font-bold uppercase tracking-widest text-[10px] md:text-sm">What We Do</span>
          </motion.div>
          <h1 className="text-3xl md:text-7xl font-display mb-6 md:mb-8">7 WAYS WE GET YOUR<br className="hidden md:block" />BRAND NOTICED</h1>
          <p className="max-w-2xl mx-auto text-sm md:text-xl opacity-80 leading-relaxed">
            Why choose us? Because we blend bold creativity with clinical execution. We don't just run campaigns; we build growth machines. Choose specific work below to see how we can escalate your brand.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {servicesData.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onSelectWork(service.id)}
              className="group cursor-pointer p-5 md:p-10 border transition-all duration-500 flex flex-col justify-between min-h-[220px] md:min-h-[320px] bg-gradient-to-br from-black/80 to-[#1a1a1a] border-accent-yellow/50 shadow-[0_4px_20px_rgba(255,235,0,0.1)] hover:shadow-[0_10px_40px_rgba(255,235,0,0.3)] hover:border-accent-yellow transform hover:-translate-y-2 rounded-xl relative overflow-hidden"
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-yellow/5 rounded-full blur-[50px] group-hover:bg-accent-yellow/10 transition-colors pointer-events-none"></div>
              <div className="relative z-10 text-left">
                <div className="mb-4 md:mb-6 transition-transform group-hover:scale-110 duration-300 text-accent-yellow drop-shadow-[0_0_10px_rgba(255,235,0,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(255,235,0,0.6)]">
                  <div className="scale-75 origin-left md:scale-100">{service.icon}</div>
                </div>
                <h3 className="text-sm md:text-2xl mb-2 md:mb-4 font-black font-display tracking-wide uppercase leading-tight">{service.title}</h3>
                <p className="hidden md:block text-white/80 leading-relaxed mb-8">{service.desc}</p>
              </div>
              <div className="relative z-10 mt-auto pt-3 md:pt-6 border-t border-accent-yellow/20 flex justify-between items-center group-hover:border-accent-yellow/60 transition-colors">
                <span className="text-[9px] md:text-xs uppercase tracking-widest font-bold text-accent-yellow drop-shadow-[0_0_5px_rgba(255,235,0,0.3)] group-hover:drop-shadow-[0_0_8px_rgba(255,235,0,0.5)]">
                  View Detail
                </span>
                <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 rotate-180 transform -translate-x-2 opacity-50 transition-all text-accent-yellow font-bold group-hover:opacity-100 group-hover:translate-x-0" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function BrandIdentityPage({ onBack, onNavigateToGetNoticed }: { onBack: () => void, onNavigateToGetNoticed: (goal: string) => void }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  const options = [
    { title: "Get you noticeable logo", goal: "I want a logo enhancement" },
    { title: "Get a visual Identity for your brand", goal: "I want a visual Identity for my brand" },
    { title: "Get your brand story", goal: "I want to get my brand story" },
    { title: "Full fledge brand Identity enhancement", goal: "I want a full fledge brand Identity enhancement" }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="min-h-screen bg-text-black text-white px-[5%] py-12 pb-32">
      <button onClick={onBack} className="flex items-center gap-2 text-accent-yellow font-bold uppercase tracking-widest text-sm mb-12 hover:translate-x-[-4px] transition-transform">
        <ArrowLeft className="w-4 h-4" /> Back to Work
      </button>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-7xl font-display mb-6 md:mb-8">BRAND<br/>IDENTITY</h1>
        <p className="text-lg md:text-xl opacity-80 leading-relaxed mb-10 md:mb-16">
          Your brand is more than a logo; it's a feeling. We create cohesive visual identities, typography, and messaging that ensures you remain unforgettable in a crowded market.
        </p>

        <h3 className="text-xl md:text-2xl text-accent-yellow mb-6 md:mb-8 font-black font-display tracking-wide border-b border-accent-yellow/20 pb-4 inline-block">Choose any specific work</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-left mb-16">
          {options.map((opt, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigateToGetNoticed(opt.goal)}
              className="bg-black/40 border-2 border-white/10 p-5 md:p-6 rounded-xl hover:bg-gradient-to-br hover:from-accent-yellow hover:to-[#ffd700] hover:text-black hover:border-accent-yellow hover:shadow-[0_10px_30px_rgba(255,235,0,0.3)] transition-all duration-300 flex items-center justify-between group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"></div>
              <span className="font-bold text-base md:text-lg relative z-10">{opt.title}</span>
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 rotate-180 opacity-50 group-hover:opacity-100 transition-opacity relative z-10" />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function SocialMediaPage({ onBack, onNavigateToGetNoticed }: { onBack: () => void, onNavigateToGetNoticed: (goal: string) => void }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  const apps = [
    "Instagram", "LinkedIn", "Emails", "Facebook", "YouTube", "Twitter", "WhatsApp", "Pinterest"
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="min-h-screen bg-text-black text-white px-[5%] py-12 pb-32">
      <button onClick={onBack} className="flex items-center gap-2 text-accent-yellow font-bold uppercase tracking-widest text-sm mb-12 hover:translate-x-[-4px] transition-transform">
        <ArrowLeft className="w-4 h-4" /> Back to Work
      </button>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-7xl font-display mb-6 md:mb-8">SOCIAL<br/>MEDIA</h1>
        <p className="text-lg md:text-xl opacity-80 leading-relaxed mb-10 md:mb-16">
          We run your socials so you can run your business. From monthly content strategies to execution and community management, we build digital homes that attract loyal followers.
        </p>

        <h3 className="text-xl md:text-2xl text-accent-yellow mb-6 md:mb-8 font-black font-display tracking-wide border-b border-accent-yellow/20 pb-4 inline-block">Choose any specific app</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-left mb-16">
          {apps.map((app, i) => (
             <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigateToGetNoticed(`I want to grow myself on ${app.toLowerCase()}`)}
              className="bg-black/40 border-2 border-white/10 p-4 md:p-6 rounded-2xl hover:bg-gradient-to-tr hover:from-accent-yellow hover:to-[#ffea00] hover:text-black hover:border-accent-yellow hover:shadow-[0_10px_30px_rgba(255,235,0,0.3)] transition-all duration-300 flex flex-col items-center justify-center gap-2 md:gap-4 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"></div>
              <Smartphone className="w-8 h-8 md:w-10 md:h-10 opacity-50 group-hover:opacity-100 transition-all group-hover:scale-110 relative z-10" />
              <span className="font-bold text-[10px] md:text-sm tracking-widest uppercase relative z-10">{app}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function SeoOrganicPage({ onBack, onNavigateToGetNoticed }: { onBack: () => void, onNavigateToGetNoticed: (goal: string) => void }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="min-h-screen bg-text-black text-white px-[5%] py-12 pb-32">
      <button onClick={onBack} className="flex items-center gap-2 text-accent-yellow font-bold uppercase tracking-widest text-sm mb-12 hover:translate-x-[-4px] transition-transform">
        <ArrowLeft className="w-4 h-4" /> Back to Work
      </button>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-7xl font-display mb-6 md:mb-8">SEO &<br/>ORGANIC</h1>
        <p className="text-lg md:text-xl opacity-80 leading-relaxed mb-10 md:mb-16">
          Rank higher. Get found. We make Google work for you 24/7 with long-term organic authority building. We optimize your structure, content, and backlinks to secure the top spot.
        </p>

        <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-xl mb-12 md:mb-16">
           <h3 className="text-lg md:text-xl text-accent-yellow mb-4 md:mb-6 font-bold">Organic Growth Trajectory</h3>
           <div className="h-32 md:h-48 flex items-end justify-between gap-1 md:gap-2 opacity-80 px-2 md:px-4">
             {[20, 35, 30, 50, 65, 80, 95].map((h, i) => (
               <motion.div 
                 key={i}
                 initial={{ height: 0 }}
                 animate={{ height: `${h}%` }}
                 transition={{ delay: i * 0.1, duration: 1 }}
                 className="w-full bg-accent-yellow rounded-t-sm relative group"
               >
                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[10px] md:text-xs font-bold transition-opacity">
                   +{h}%
                 </div>
               </motion.div>
             ))}
           </div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigateToGetNoticed("I want to work in seo & organic.")}
          className="bg-accent-yellow text-black px-6 md:px-8 py-4 md:py-5 text-sm md:text-lg font-bold uppercase tracking-widest rounded-lg shadow-[0_0_20px_rgba(255,235,0,0.3)] hover:shadow-[0_0_40px_rgba(255,235,0,0.5)] transition-all"
        >
          Get help
        </motion.button>
      </div>
    </motion.div>
  );
}

export function PerformanceAdsPage({ onBack, onNavigateToGetNoticed }: { onBack: () => void, onNavigateToGetNoticed: (goal: string) => void }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  const options = [
    { title: "Meta ads", goal: "I want to run Meta ads" },
    { title: "Google ads", goal: "I want to run Google ads" },
    { title: "YouTube ads", goal: "I want to run YouTube ads" },
    { title: "I want to show my ad everywhere", goal: "I want to show my ad everywhere" }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="min-h-screen bg-text-black text-white px-[5%] py-12 pb-32">
      <button onClick={onBack} className="flex items-center gap-2 text-accent-yellow font-bold uppercase tracking-widest text-sm mb-12 hover:translate-x-[-4px] transition-transform">
        <ArrowLeft className="w-4 h-4" /> Back to Work
      </button>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-7xl font-display mb-6 md:mb-8">PERFORMANCE<br/>ADS</h1>
        <p className="text-lg md:text-xl opacity-80 leading-relaxed mb-10 md:mb-16">
          Every rupee working harder than the last. We run precision-targeted campaigns on platforms where your audience is already scrolling.
        </p>

        <h3 className="text-xl md:text-2xl text-accent-yellow mb-6 md:mb-8 font-black font-display tracking-wide border-b border-accent-yellow/20 pb-4 inline-block">Work with us</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-left mb-16">
          {options.map((opt, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigateToGetNoticed(opt.goal)}
              className="bg-black/40 border-2 border-white/10 p-5 md:p-6 rounded-xl hover:bg-gradient-to-br hover:from-accent-yellow hover:to-[#ffd700] hover:text-black hover:border-accent-yellow hover:shadow-[0_10px_30px_rgba(255,235,0,0.3)] transition-all duration-300 flex items-center justify-between group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"></div>
              <span className="font-bold text-base md:text-lg relative z-10">{opt.title}</span>
              <Target className="w-5 h-5 md:w-6 md:h-6 opacity-30 group-hover:opacity-100 transition-opacity relative z-10 group-hover:scale-110" />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ContentProductionPage({ onBack, onNavigateToGetNoticed, onBookCall }: { onBack: () => void, onNavigateToGetNoticed: (goal: string) => void, onBookCall: () => void }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  const options = [
    { title: "Advertisement video for my business", action: () => onNavigateToGetNoticed("I want an advertisement video for my business") },
    { title: "Advertisement campaigns poster", action: () => onNavigateToGetNoticed("I want advertisement campaigns poster") },
    { title: "Online advertisement", action: () => onNavigateToGetNoticed("I want online advertisement") },
    { title: "Offline advertisement", action: () => onNavigateToGetNoticed("I want offline advertisement") },
    { title: "I want to know more through call", action: onBookCall }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="min-h-screen bg-text-black text-white px-[5%] py-12 pb-32">
      <button onClick={onBack} className="flex items-center gap-2 text-accent-yellow font-bold uppercase tracking-widest text-sm mb-12 hover:translate-x-[-4px] transition-transform">
        <ArrowLeft className="w-4 h-4" /> Back to Work
      </button>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-7xl font-display mb-6 md:mb-8">CONTENT<br/>PRODUCTION</h1>
        <p className="text-lg md:text-xl opacity-80 leading-relaxed mb-10 md:mb-12">
          Scroll-stopping reels and branded graphics that convert attention into action and build solid trust.
        </p>

        <div className="mb-10 md:mb-16">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base font-bold transition-colors">
            View our work <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <h3 className="text-xl md:text-2xl text-accent-yellow mb-6 md:mb-8 font-black font-display tracking-wide border-b border-accent-yellow/20 pb-4 inline-block">Get your advertisement ready</h3>
        <div className="grid grid-cols-1 gap-3 md:gap-4 text-left max-w-2xl mx-auto">
          {options.map((opt, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={opt.action}
              className="bg-black/40 border-2 border-white/10 p-5 md:p-6 rounded-xl hover:bg-gradient-to-br hover:from-accent-yellow hover:to-[#ffd700] hover:text-black hover:border-accent-yellow hover:shadow-[0_10px_30px_rgba(255,235,0,0.3)] transition-all duration-300 flex items-center justify-between group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"></div>
              <span className="font-bold text-base md:text-lg relative z-10">{opt.title}</span>
              <Film className="w-5 h-5 md:w-6 md:h-6 opacity-30 group-hover:opacity-100 transition-opacity relative z-10 group-hover:scale-110" />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function AiAutomationPage({ onBack, onBookCall, onNavigateToGetNoticed }: { onBack: () => void, onBookCall: () => void, onNavigateToGetNoticed: (goal: string) => void }) {
  const [desc, setDesc] = React.useState("");
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSubmitEmail = () => {
    if (!desc.trim()) return;
    onNavigateToGetNoticed(`I want to automate: ${desc}`);
  };

  const handleSubmitCall = () => {
    if (!desc.trim()) return;
    onBookCall();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="min-h-screen bg-text-black text-white px-[5%] py-12 pb-32">
      <button onClick={onBack} className="flex items-center gap-2 text-accent-yellow font-bold uppercase tracking-widest text-sm mb-12 hover:translate-x-[-4px] transition-transform">
        <ArrowLeft className="w-4 h-4" /> Back to Work
      </button>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-7xl font-display mb-6 md:mb-8">AI<br/>AUTOMATION</h1>
        <p className="text-lg md:text-xl opacity-80 leading-relaxed mb-10 md:mb-16">
          Scale your operations instantly. 70% of redundant workflows can be handed over to intelligent agents. We build AI systems that qualify leads, answer queries, and integrate with your CRMs 24/7 without breaking a sweat.
        </p>

        <div className="bg-black/40 border-2 border-white/10 p-6 md:p-12 rounded-3xl max-w-3xl mx-auto text-left shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent-yellow/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <h3 className="text-2xl md:text-3xl text-accent-yellow mb-4 md:mb-6 font-black font-display tracking-wide">Automate your work</h3>
          <p className="mb-4 md:mb-6 opacity-80 font-medium text-base md:text-lg">Describe what you want to automate in your business operations:</p>
          
          <textarea 
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={4}
            className="w-full bg-black/60 border-2 border-white/10 p-4 md:p-6 rounded-2xl focus:border-accent-yellow outline-none transition-all resize-none mb-6 md:mb-8 relative z-10 text-base md:text-lg shadow-inner"
            placeholder="e.g. I want to automate my lead generation process..."
          ></textarea>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 relative z-10">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmitEmail}
              disabled={!desc.trim()}
              className="flex-1 bg-white/10 border border-white/20 hover:border-accent-yellow hover:text-black hover:bg-accent-yellow text-white px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              Get an email
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmitCall}
              disabled={!desc.trim()}
              className="flex-1 bg-accent-yellow text-black px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base font-bold rounded-xl shadow-[0_0_20px_rgba(255,235,0,0.2)] hover:shadow-[0_0_40px_rgba(255,235,0,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              Get a call
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
