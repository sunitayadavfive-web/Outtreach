import React from "react";
import { motion } from "motion/react";
import { 
  Users, 
  MapPin, 
  Target, 
  Flame, 
  Clock, 
  ShieldCheck, 
  Instagram, 
  Linkedin,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { AnimatePresence } from "motion/react";
const founderImg = "https://lh3.googleusercontent.com/d/1wi-T5j_PnN3q25tH7deSXSfJtx9QP21a=w600";
const cofounderImg = "https://lh3.googleusercontent.com/d/1hBpdobTGgekI5lVIS7Uf82QYEYoo0kPX=w600";
const operationsImg = "https://lh3.googleusercontent.com/d/15OeeOpS-o-knj0lgSiKclDxg_UJVNSat=w600";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  description: string;
  instagram?: string;
  linkedin?: string;
}

export function TeamMemberCard({ name, role, image, description, instagram, linkedin }: TeamMemberProps) {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <div className="group text-center cursor-pointer" onClick={() => setIsActive(!isActive)}>
      <div className="relative mb-3 md:mb-6 overflow-hidden aspect-[4/5] rounded-lg">
        <motion.img 
          src={image} 
          alt={name} 
          loading="lazy"
          animate={{ 
            scale: isActive ? 1.1 : 1,
            filter: isActive ? "blur(4px)" : "blur(0px)" 
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        
        <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10 pointer-events-none">
          <span className="bg-[#FFEB00] px-1.5 md:px-3 py-0.5 md:py-1 text-[8px] md:text-[10px] font-bold uppercase text-black shadow-sm">{role}</span>
        </div>

        {/* Social Icons Overlay */}
        <AnimatePresence>
          {isActive && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center gap-3 md:gap-6 bg-black/20"
            >
              {instagram && (
                <motion.a 
                  href={instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center text-black shadow-xl hover:bg-[#FFEB00] transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Instagram size={24} className="w-5 h-5 md:w-6 md:h-6" />
                </motion.a>
              )}
              {linkedin && (
                <motion.a 
                  href={linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center text-black shadow-xl hover:bg-[#FFEB00] transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Linkedin size={24} className="w-5 h-5 md:w-6 md:h-6" />
                </motion.a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <h3 className="text-[15px] md:text-2xl mb-1 md:mb-2 font-display font-bold text-white">{name}</h3>
      <p className="text-[10px] md:text-sm text-gray-400 max-w-[250px] mx-auto italic">{description}</p>
      {!isActive && <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-black text-[#FFEB00] mt-2 md:hidden opacity-90">Tap to see social</p>}
    </div>
  );
}

const fadeInVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function AboutPage({ onBack, onGetNoticed }: { onBack: () => void, onGetNoticed: () => void }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFEB00] rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-[#FFEB00] text-black px-4 py-1 text-xs font-black uppercase tracking-widest mb-6"
          >
            Go Behind The Scenes
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-8xl font-display font-medium leading-tight mb-8 md:mb-12"
          >
            Our Story. <br />
            <span className="text-[#FFEB00]">Outtreach</span> Philosophy.
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="h-20 w-[1px] bg-gradient-to-b from-[#FFEB00] to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* The Founder's Journey Section */}
      <section className="py-16 md:py-32 bg-black border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariant}
            >
              <h2 className="text-3xl md:text-5xl mb-6 md:mb-8 leading-tight">
                "I started Outtreach with <span className="text-[#FFEB00]">0 clients</span>, 0 network & 0 proof."
              </h2>
              <div className="space-y-4 md:space-y-6 text-lg md:text-xl text-gray-400 font-sans leading-relaxed">
                <p>
                  Everyone talks about scaling. Very few talk about the phase where nobody knows you, 
                  nobody trusts you, and nobody replies.
                </p>
                <p className="border-l-4 border-[#FFEB00] pl-4 md:pl-6 italic text-white/90">
                  That phase builds you. It forces you to look at the brutal truths of growth 
                  that most agencies ignore.
                </p>
                <p>
                  Outtreach wasn't built on a perfect plan. It was built on the compounding 
                  results of patience and consistent visibility.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square"
            >
              <div className="absolute -inset-4 border border-[#FFEB00]/20 translate-x-4 translate-y-4" />
              <img 
                src={founderImg} 
                alt="Founder Journey" 
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3 Brutal Truths Section */}
      <section className="py-16 md:py-32 bg-[#0A0A0A]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-6xl font-display mb-4 md:mb-6">3 Brutal Truths</h2>
            <p className="text-gray-400 uppercase tracking-widest text-[10px] md:text-xs">Learned from building from zero</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            {/* Truth 1 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white/5 p-6 md:p-10 border border-white/10 hover:border-[#FFEB00]/50 transition-colors"
            >
              <div className="text-[#FFEB00] mb-6 md:mb-8 font-mono text-3xl md:text-4xl">I</div>
              <h3 className="text-xl md:text-2xl mb-4 md:mb-6">Nobody cares about your brand in the beginning.</h3>
              <p className="text-xs md:text-sm text-gray-400 mb-6 md:mb-8 font-sans italic">
                "No matter how skilled you are, your client wants someone who has experience, 
                work, and proven results."
              </p>
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#FFEB00]">How to solve</p>
                <ul className="space-y-2 text-xs md:text-sm text-white/80">
                  <li className="flex items-start gap-2"><ShieldCheck size={16} className="text-[#FFEB00] mt-0.5 shrink-0" /> Communicate clearly</li>
                  <li className="flex items-start gap-2"><ShieldCheck size={16} className="text-[#FFEB00] mt-0.5 shrink-0" /> Solve visibility problem</li>
                  <li className="flex items-start gap-2"><ShieldCheck size={16} className="text-[#FFEB00] mt-0.5 shrink-0" /> Show results consistently</li>
                  <li className="flex items-start gap-2"><ShieldCheck size={16} className="text-[#FFEB00] mt-0.5 shrink-0" /> Repeat your message often</li>
                </ul>
              </div>
            </motion.div>

            {/* Truth 2 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white/5 p-6 md:p-10 border border-white/10 hover:border-[#FFEB00]/50 transition-colors"
            >
              <div className="text-[#FFEB00] mb-6 md:mb-8 font-mono text-3xl md:text-4xl">II</div>
              <h3 className="text-xl md:text-2xl mb-4 md:mb-6">Skill alone doesn't win. Positioning does.</h3>
              <p className="text-xs md:text-sm text-gray-400 mb-6 md:mb-8 font-sans italic">
                "Average people with better positioning often grow faster than skilled 
                people with poor communication."
              </p>
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#FFEB00]">How to solve</p>
                <ul className="space-y-2 text-xs md:text-sm text-white/80">
                  <li className="flex items-start gap-2"><Target size={16} className="text-[#FFEB00] mt-0.5 shrink-0" /> Clear headline & offer</li>
                  <li className="flex items-start gap-2"><Target size={16} className="text-[#FFEB00] mt-0.5 shrink-0" /> Specific niche</li>
                  <li className="flex items-start gap-2"><Target size={16} className="text-[#FFEB00] mt-0.5 shrink-0" /> Strong online presence</li>
                </ul>
              </div>
            </motion.div>

            {/* Truth 3 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white/5 p-6 md:p-10 border border-white/10 hover:border-[#FFEB00]/50 transition-colors"
            >
              <div className="text-[#FFEB00] mb-6 md:mb-8 font-mono text-3xl md:text-4xl">III</div>
              <h3 className="text-xl md:text-2xl mb-4 md:mb-6">The hidden Growth Hack.</h3>
              <p className="text-xs md:text-sm text-gray-400 mb-6 md:mb-8 font-sans italic">
                "Most people quit when results are delayed. One viral post can help, 
                but 100 consistent days can change your identity."
              </p>
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#FFEB00]">The Insight</p>
                <div className="bg-[#FFEB00]/10 p-4 rounded border border-[#FFEB00]/20">
                  <p className="text-xs md:text-sm">Compounding rewards patience. 100 consistent days &gt; 1 viral moment.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-32 bg-black">
        <div className="container mx-auto px-6 text-center">
          <motion.span 
            initial="hidden"
            whileInView="visible"
            variants={fadeInVariant}
            className="inline-block bg-[#FFEB00] text-black px-4 py-1 text-xs font-black uppercase tracking-widest mb-6"
          >
            Meet Our Team
          </motion.span>
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            variants={fadeInVariant}
            className="text-3xl md:text-6xl mb-8 md:mb-12"
          >
            Explore our expert <span className="text-[#FFEB00]">minds.</span>
          </motion.h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 md:mb-20 italic">
            "A crazy group of strategic and imaginative thinkers for the growth of your business."
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12">
            <TeamMemberCard 
              name="Pranjal Yadav"
              role="Founder & CEO"
              image={founderImg}
              description='"A visionary in brand building, shaping brands that aren&apos;t just seen, but remembered."'
              instagram="https://www.instagram.com/pranjalyadav__0?igsh=MTJ5M2xlYWg3MWU5OQ=="
              linkedin="https://www.linkedin.com/in/pranjal-yadav-981034394?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            />
            <TeamMemberCard 
              name="Anubhav Singh"
              role="Co-Founder"
              image={cofounderImg}
              description='"Expert in mass communication, ensuring the right message hits the right audience."'
              instagram="https://www.instagram.com/anubhav.singh.somvanshi?igsh=MnEya245N3U4NGJm"
              linkedin="https://www.linkedin.com/in/anubhav-singh-4a2160406?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            />
            <TeamMemberCard 
              name="Prashant Yadav"
              role="Operations & Ads"
              image={operationsImg}
              description='"The analytical backbone making sure every ad budget works at peak efficiency."'
              instagram="https://www.instagram.com/prashant_yadav_0_?igsh=ZW80azA5encwdDJj"
            />
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-32 bg-[#0A0A0A] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
               initial="hidden"
               whileInView="visible"
               variants={fadeInVariant}
            >
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="text-[#FFEB00]" />
                <span className="uppercase tracking-[0.3em] text-xs font-bold font-mono">Our Location</span>
              </div>
              <h2 className="text-4xl md:text-5xl mb-8">Where we work <span className="text-[#FFEB00]">from.</span></h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed italic">
                From our creative hub, we reach out to brands worldwide. Our location is more than just an 
                address; it's where strategy meets imagination.
              </p>
              <div className="space-y-4">
                <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                  <h4 className="text-[#FFEB00] font-bold mb-2">Main Headquarters</h4>
                  <p className="text-sm">Lucknow, Uttar Pradesh, India</p>
                </div>
                <p className="text-xs text-gray-500 font-mono">* Operating locally, scaling globally.</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="relative h-[400px] bg-white/5 rounded-2xl overflow-hidden border border-white/10 group"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-32 h-32 bg-[#FFEB00]/20 rounded-full flex items-center justify-center"
                  >
                    <div className="w-16 h-16 bg-[#FFEB00]/40 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-[#FFEB00] rounded-full shadow-[0_0_20px_rgba(255,235,0,0.5)]" />
                    </div>
                  </motion.div>
                </div>
              </div>
              
              <div className="absolute bottom-8 left-8 right-8 bg-black/60 backdrop-blur-md p-6 border border-white/10 rounded-xl translate-y-4 group-hover:translate-y-0 transition-transform">
                <p className="text-xs font-mono uppercase tracking-widest text-[#FFEB00] mb-2">Global Reach</p>
                <p className="text-sm font-sans">Helping businesses cross borders through digital excellence.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="py-24 bg-[#FFEB00] text-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-display mb-8">Ready to start your journey?</h2>
          <motion.button 
            onClick={onGetNoticed}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-12 py-5 text-xs font-black uppercase tracking-widest flex items-center gap-4 mx-auto"
          >
            Get In Touch <ArrowRight size={16} />
          </motion.button>
        </div>
      </section>
    </div>
  );
}
