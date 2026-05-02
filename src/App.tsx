/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Lenis from '@studio-freight/lenis';
import AboutPage, { TeamMemberCard } from "./components/AboutPage";
import { servicesData, WorkPage, GrowthMarketingPage, BrandIdentityPage, SocialMediaPage, SeoOrganicPage, PerformanceAdsPage, ContentProductionPage, AiAutomationPage } from "./components/WorkPages";
import { InsightsMainPage, DynamicInsightPage, GrowthInsightPage, AdsInsightPage, AiInsightPage, LogoInsightPage } from "./components/InsightsPage";
import { ReviewSlider } from "./components/ReviewSlider";
import { ReviewPage } from "./components/ReviewPage";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from './lib/firebase';
import { PrivacyPolicyPage, DisclaimerPage, TermsAndConditionsPage, RefundPolicyPage } from "./components/LegalPages";
import AdminDashboard from "./components/AdminDashboard";
import PasswordModal from "./components/PasswordModal";
import BookingPage from "./components/BookingPage";
import GetNoticedPage from "./components/GetNoticedPage";
import founderImg from "./assets/regenerated_image_1777325423361.png";
import cofounderImg from "./assets/regenerated_image_1777325495036.png";
import operationsImg from "./assets/regenerated_image_1777533725823.png";
import { 
  TrendingUp, 
  Flame, 
  Smartphone, 
  Search, 
  Target, 
  Film, 
  Instagram, 
  Linkedin, 
  Twitter,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Trash2,
  LogOut,
  LayoutDashboard,
  MessageSquare,
  Star,
  Users,
  Lock,
  ArrowLeft,
  Send,
  CheckCircle2,
  Filter,
  Cpu,
  Bot,
  Lightbulb
} from "lucide-react";

const fadeInVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [prefilledGoal, setPrefilledGoal] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [activePost, setActivePost] = useState<any>(null);
  const [publicInsights, setPublicInsights] = useState<any[]>([]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    } as any)

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, []);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await fetch("/api/data?passcode=public");
        const json = await res.json();
        if (json.insights) {
          setPublicInsights(json.insights);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchInsights();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (currentPage === "admin") {
      window.location.hash = "admin";
    } else {
      window.location.hash = "";
    }
  }, [currentPage]);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#admin" && currentPage !== "admin") {
        setShowPasswordModal(true);
      }
    };
    window.addEventListener("hashchange", handleHash);
    handleHash(); // check on mount
    return () => window.removeEventListener("hashchange", handleHash);
  }, [currentPage]);

  const navigateToGetNoticed = (goal = "") => {
    setPrefilledGoal(goal);
    setCurrentPage("get-noticed");
  };
  const [commentsByPost, setCommentsByPost] = useState<{[key: string]: {name: string, text: string, date: string}[]}>(() => {
    const saved = localStorage.getItem("outtreach_comments_v2");
    return saved ? JSON.parse(saved) : { logo: [], growth: [], ads: [], ai: [] };
  });

  const [commentInput, setCommentInput] = useState({ name: "", text: "" });

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch('/api/data?passcode=public');
        const json = await res.json();
        const grouped = json.comments.reduce((acc: any, comment: any) => {
          if (!acc[comment.postId]) acc[comment.postId] = [];
          acc[comment.postId].push(comment);
          return acc;
        }, { logo: [], growth: [], ads: [] });
        setCommentsByPost(grouped);
      } catch (err) {
        console.error("Failed to load comments", err);
      }
    };
    fetchComments();
  }, []);

  const handleManagementAccess = () => {
    setShowPasswordModal(true);
  };

  const onLoginSuccess = (code: string) => {
    localStorage.setItem('op_pass', code);
    setCurrentPage("admin");
    setShowPasswordModal(false);
  };

  const addComment = (postId: string) => async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.name || !commentInput.text) return;
    
    const newComment = {
      postId,
      ...commentInput,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    try {
      await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment)
      });
      // Still update local state for immediate feedback
      setCommentsByPost(prev => ({
        ...prev,
        [postId]: [newComment, ...(prev[postId] || [])]
      }));
      setCommentInput({ name: "", text: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen">
      <PasswordModal 
        isOpen={showPasswordModal} 
        onClose={() => setShowPasswordModal(false)}
        onSuccess={onLoginSuccess}
      />
      <AnimatePresence mode="wait">
        {currentPage === "admin" ? (
          <motion.div
            key="admin"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <AdminDashboard onBack={() => setCurrentPage("home")} />
          </motion.div>
        ) : (
          <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="sticky top-0 bg-white/95 backdrop-blur-md z-50 border-b border-black/5 py-4 px-[5%] flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
              <div className="flex justify-between items-center w-full md:w-auto">
                <button 
                  onClick={() => setCurrentPage("home")} 
                  className="bg-accent-yellow px-4 py-1 text-2xl font-display font-bold hover:opacity-90 transition-opacity whitespace-nowrap cursor-pointer"
                >
                  OUTTREACH
                </button>
                <div className="flex items-center gap-3 md:hidden">
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setCurrentPage("booking")}
                    className="relative group bg-accent-yellow text-black px-4 py-2 text-[11px] font-bold uppercase rounded-sm overflow-hidden cursor-pointer shadow-[0_4px_14px_0_rgba(255,235,0,0.39)] transition-all"
                  >
                    <span className="relative z-10 flex items-center gap-2">Book 1:1 Call</span>
                  </motion.button>
                </div>
              </div>
              <nav className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar scroll-smooth">
                <ul className="flex gap-4 md:gap-6 items-center min-w-max">
                  {["Home", "About", "Work", "Insights", "Reviews"].map((item) => (
                    <li key={item}>
                      {item === "About" ? (
                        <button 
                          onClick={() => setCurrentPage("about")}
                          className={`text-sm font-bold hover:text-muted-gray transition-colors cursor-pointer ${currentPage === 'about' ? 'text-accent-yellow' : ''}`}
                        >
                          {item}
                        </button>
                      ) : item === "Work" ? (
                        <button 
                          onClick={() => setCurrentPage("work")}
                          className={`text-sm font-bold hover:text-muted-gray transition-colors cursor-pointer ${currentPage === 'work' ? 'text-accent-yellow' : ''}`}
                        >
                          {item}
                        </button>
                      ) : item === "Insights" ? (
                        <button 
                          onClick={() => setCurrentPage("insights")}
                          className={`text-sm font-bold hover:text-muted-gray transition-colors cursor-pointer ${currentPage === 'insights' ? 'text-accent-yellow' : ''}`}
                        >
                          {item}
                        </button>
                      ) : item === "Reviews" ? (
                        <button 
                          onClick={() => setCurrentPage("reviews")}
                          className={`text-sm font-bold hover:text-muted-gray transition-colors cursor-pointer ${currentPage === 'reviews' ? 'text-accent-yellow' : ''}`}
                        >
                          {item}
                        </button>
                      ) : (
                        <a 
                          href={currentPage === 'home' ? `#${item.toLowerCase().replace(" ", "")}` : `/#${item.toLowerCase().replace(" ", "")}`} 
                          onClick={() => currentPage !== 'home' && setCurrentPage('home')}
                          className="text-sm font-bold hover:text-muted-gray transition-colors"
                        >
                          {item}
                        </a>
                      )}
                    </li>
                  ))}
                  <li>
                    <motion.button 
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigateToGetNoticed()}
                      className={`relative px-4 py-1.5 text-sm font-bold overflow-hidden rounded-sm cursor-pointer group ${currentPage === 'get-noticed' ? 'bg-accent-yellow/10 text-accent-yellow' : 'bg-black/5 text-black'}`}
                    >
                      <span className="relative z-10 transition-colors group-hover:text-accent-yellow">Get Noticed</span>
                      <span className="absolute inset-x-0 bottom-0 h-[2px] bg-accent-yellow transform origin-center scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </motion.button>
                  </li>
                </ul>
              </nav>
              <div className="hidden md:flex items-center gap-3">
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setCurrentPage("booking")}
                  className="relative group bg-accent-yellow text-black px-6 py-3 text-[13px] font-bold uppercase rounded-sm overflow-hidden cursor-pointer shadow-[0_4px_14px_0_rgba(255,235,0,0.39)] hover:shadow-[0_6px_20px_rgba(255,235,0,0.23)] hover:bg-[#ffe500] transition-all"
                >
                  <span className="relative z-10 flex items-center gap-2">Book a 1:1 Call</span>
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                </motion.button>
              </div>
            </header>

            <main className="flex-1 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {currentPage === "home" ? (
                <>
                  {/* Hero Section */}
                  <section id="home" className="relative min-h-[90vh] grid grid-cols-1 lg:grid-cols-2 items-center px-[5%] py-12 overflow-hidden">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-yellow -z-10 [clip-path:polygon(100%_0,0_0,100%_100%)] opacity-20 lg:opacity-100" />
              
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeInVariant}
                className="z-10"
              >
                <span className="font-mono text-xs text-muted-gray uppercase tracking-widest block mb-4">Growth Marketing Agency</span>
                <h1 className="text-5xl md:text-8xl lg:text-9xl leading-[0.9] mb-8">
                  WE MAKE<br />BRANDS<br />
                  <span className="text-accent-yellow">LOUD.</span>
                </h1>
                <p className="text-text-gray max-w-lg text-base md:text-lg mb-8 md:mb-10 leading-relaxed px-1 md:px-0">
                  At Outtreach, we don't just market your brand — we build it, amplify it, and put it exactly where your audience already is.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 px-2 md:px-0">
                <motion.button 
                  onClick={() => setCurrentPage("booking")}
                  whileTap={{ scale: 0.95, filter: "blur(4px)" }}
                  className="bg-accent-yellow text-black px-6 md:px-8 py-3 md:py-4 font-bold uppercase text-xs md:text-sm rounded shadow-sm hover:translate-y-[-2px] transition-transform flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                >
                  Book a Free 1:1 Call <ArrowRight className="w-4 h-4" />
                </motion.button>
                  <button onClick={() => setCurrentPage("work")} className="border-2 border-text-black px-6 md:px-8 py-3 md:py-4 font-bold uppercase text-xs md:text-sm hover:bg-black hover:text-white transition-all cursor-pointer w-full sm:w-auto">
                    See Our Work
                  </button>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="mt-12 lg:mt-0"
              >
                <img 
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1000" 
                  alt="Marketing Agency" 
                  className="w-full h-[500px] object-cover border-b-[10px] border-accent-yellow shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </section>

            {/* Ticker */}
            <div className="bg-text-black py-4 overflow-hidden whitespace-nowrap font-display">
              <div className="ticker-animation inline-block">
                {[1, 2].map((i) => (
                  <div key={i} className="inline-block">
                    <span className="text-2xl text-accent-yellow mx-10">SILENCE OUT • SPOTLIGHT IN</span>
                    <span className="text-2xl text-accent-yellow mx-10">WE MAKE BRANDS LOUD</span>
                    <span className="text-2xl text-accent-yellow mx-10">GROWTH MARKETING</span>
                    <span className="text-2xl text-accent-yellow mx-10">BRAND IDENTITY</span>
                    <span className="text-2xl text-accent-yellow mx-10">SOCIAL MEDIA</span>
                    <span className="text-2xl text-accent-yellow mx-10">PAID ADS</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Services Section */}
            <section id="work" className="py-24 px-[5%]">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInVariant}
              >
                <span className="text-accent-yellow font-bold block mb-4 uppercase text-sm tracking-wider">What We Do</span>
                <h2 className="text-3xl md:text-6xl mb-8 md:mb-16 max-w-3xl leading-tight">7 Ways We Get Your<br className="hidden md:block" />Brand Noticed</h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                  {servicesData.map((service, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setCurrentPage(`work-${service.id}`)}
                      className="group cursor-pointer p-4 md:p-10 flex flex-col justify-between min-h-[160px] md:min-h-[320px] transition-all duration-500 rounded-xl bg-gradient-to-br from-black/80 to-[#1a1a1a] border border-accent-yellow/50 shadow-[0_4px_20px_rgba(255,235,0,0.1)] hover:shadow-[0_10px_40px_rgba(255,235,0,0.3)] hover:border-accent-yellow transform hover:-translate-y-1 md:hover:-translate-y-2 text-white relative overflow-hidden"
                      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                    >
                      <div className="absolute top-0 right-0 w-16 md:w-32 h-16 md:h-32 bg-accent-yellow/5 rounded-full blur-[30px] md:blur-[50px] group-hover:bg-accent-yellow/10 transition-colors pointer-events-none"></div>
                      <div className="relative z-10">
                        <div className="mb-2 md:mb-6 transition-transform group-hover:scale-110 duration-300 text-accent-yellow drop-shadow-[0_0_10px_rgba(255,235,0,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(255,235,0,0.6)] flex items-center gap-2">
                          <div className="scale-75 origin-left md:scale-100">{service.icon}</div>
                        </div>
                        <h3 className="text-[16px] md:text-2xl mb-2 md:mb-4 font-bold font-sans tracking-tight leading-[1.2] text-white z-10 relative drop-shadow-md">{service.title}</h3>
                        <p className="hidden md:block leading-relaxed mb-8 text-white/80">{service.desc}</p>
                      </div>
                      <div className="flex relative z-10 mt-auto pt-2 md:pt-6 border-t border-accent-yellow/20 justify-between items-center transition-colors group-hover:border-accent-yellow/60">
                        <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-accent-yellow drop-shadow-[0_0_5px_rgba(255,235,0,0.3)] group-hover:drop-shadow-[0_0_8px_rgba(255,235,0,0.5)]">
                          View details
                        </span>
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transform -translate-x-2 transition-all opacity-50 text-accent-yellow font-bold group-hover:opacity-100 group-hover:translate-x-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* About Snapshot */}
            <section id="about" className="bg-accent-yellow py-24 px-[5%] text-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariant}
              >
                <h2 className="text-4xl md:text-5xl mb-8">WE'RE YOUR GROWTH PARTNER</h2>
                <p className="max-w-3xl mx-auto text-lg md:text-xl font-medium mb-16 leading-relaxed">
                  Founded by Pranjal Yadav and Anubhav Singh, Outtreach combines bold creativity with data-driven execution to help businesses build a presence that can't be ignored.
                </p>
                <div className="text-4xl md:text-6xl font-display font-black uppercase tracking-widest mt-12 py-10">
                  <span className="opacity-90">COMING SOON</span>
                </div>
              </motion.div>
            </section>

            {/* Team Section */}
            <section className="py-24 px-[5%]">
              <motion.div
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true }}
                 variants={fadeInVariant}
                 className="text-center"
              >
                <span className="inline-block bg-accent-yellow px-4 py-2 text-xs font-black uppercase tracking-widest mb-6">Meet Our Team</span>
                <h2 className="text-3xl md:text-6xl mb-8 md:mb-16">The Minds Behind The <span className="text-accent-yellow">Spotlight</span></h2>
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
              </motion.div>
            </section>
      
            {/* Reviews Section */}
            <section id="reviews" className="py-16 md:py-32 bg-black text-white overflow-hidden">
              <motion.div 
                 className="px-[5%]"
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true }}
                 variants={fadeInVariant}
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
                  <div className="max-w-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="w-3 h-3 text-accent-yellow fill-accent-yellow" />
                        ))}
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-accent-yellow/80">4.9/5 Rating</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-sans font-black leading-tight tracking-tighter mb-3 uppercase">
                      CLIENT <span className="text-accent-yellow">ECHOES.</span>
                    </h2>
                    <p className="text-xs text-white/50 max-w-sm font-medium leading-relaxed">
                      Trust earned through consistent growth and attention-driven marketing.
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => setCurrentPage("reviews")}
                      className="bg-white/5 border border-white/10 text-white font-black px-5 py-3 rounded-xl hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 uppercase text-[9px] tracking-widest"
                    >
                      Browse Reviews <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => setCurrentPage("booking")}
                      className="bg-accent-yellow text-black font-black px-5 py-3 rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 uppercase text-[9px] tracking-widest shadow-lg shadow-accent-yellow/10"
                    >
                      Work With Us <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* The Dynamic Slider */}
                <ReviewSlider onWriteReview={() => setCurrentPage("reviews")} />

                {/* Final CTA Block for Reviews */}
                <motion.div 
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="mt-16 bg-gradient-to-br from-accent-yellow to-yellow-500 rounded-[1.5rem] p-8 md:p-12 text-center relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-xl md:text-2xl font-sans font-black text-black leading-tight mb-3 tracking-tighter uppercase">
                      READY TO BE OUR NEXT SUCCESS STORY?
                    </h3>
                    <p className="text-black/60 max-w-lg mx-auto text-[10px] font-bold mb-6">
                      Your brand deserves results. Let’s make it happen.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                      <button 
                        onClick={() => setCurrentPage("booking")}
                        className="bg-black text-accent-yellow px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2"
                      >
                        Get Noticed <ArrowRight className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setCurrentPage("booking")}
                        className="bg-white/20 backdrop-blur-md border border-white/30 text-black px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/40 transition-all"
                      >
                        Get a 1:1 Call
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </section>
      
            {/* Insights Section */}
            <section id="insights" className="py-32 px-[5%] bg-neutral-50 relative overflow-hidden">
              <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-accent-yellow/10 rounded-full blur-[120px] pointer-events-none" />
              <motion.div
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true }}
                 variants={fadeInVariant}
                 className="relative z-10 max-w-7xl mx-auto"
              >
                <div className="flex justify-between items-end mb-16">
                  <div>
                    <span className="inline-block bg-text-black text-white px-4 py-2 text-xs font-black uppercase tracking-widest mb-6">Knowledge Base</span>
                    <h2 className="text-3xl md:text-6xl max-w-2xl">Insights from the <span className="text-accent-yellow drop-shadow-sm">Spotlight</span></h2>
                  </div>
                  <button 
                    onClick={() => setCurrentPage("insights")}
                    className="hidden md:flex items-center gap-2 font-bold text-sm uppercase tracking-widest hover:text-accent-yellow transition-colors group"
                  >
                    View All <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                  {[
                    { category: "Growth Marketing", title: "Why Most Small Brands Fail at Social Media", id: "growth", readTime: "10 min", icon: <TrendingUp className="text-black w-4 h-4 md:w-5 md:h-5" />, image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop" },
                    { category: "Brand Identity", title: "Your Logo Isn't Your Brand", id: "logo", readTime: "6 min", icon: <Target className="text-black w-4 h-4 md:w-5 md:h-5" />, image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop" },
                    { category: "Paid Ads", title: "How to make ₹10k work like ₹50k", id: "ads", readTime: "7 min", icon: <Flame className="text-black w-4 h-4 md:w-5 md:h-5" />, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" }
                  ].map((post, idx) => (
                    <motion.div 
                      key={idx} 
                      whileHover={{ y: -8 }}
                      onClick={() => {
                        if (post.id === "logo") setCurrentPage("insight-logo");
                        if (post.id === "growth") setCurrentPage("insight-growth");
                        if (post.id === "ads") setCurrentPage("insight-ads");
                      }}
                      className="bg-white rounded-xl md:rounded-3xl border border-black/5 hover:border-accent-yellow/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 group cursor-pointer flex flex-col relative overflow-hidden"
                    >
                      <div className="h-28 md:h-56 w-full overflow-hidden relative">
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                        <img referrerPolicy="no-referrer" src={post.image} loading="lazy" alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent z-20" />
                      </div>

                      <div className="p-4 md:p-10 flex-col flex flex-1 relative z-30 -mt-6 md:-mt-12">
                        <div className="flex justify-between items-center mb-3 md:mb-6">
                          <div className="flex items-center gap-1.5 md:gap-3">
                            <div className="bg-white p-1.5 md:p-2.5 rounded-lg md:rounded-xl border border-black/5 group-hover:border-accent-yellow transition-colors shadow-sm">
                              {post.icon}
                            </div>
                            <span className="font-mono text-[8px] md:text-xs text-black uppercase tracking-widest font-bold bg-white px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-black/5 shadow-sm">{post.category}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-[16px] md:text-3xl leading-snug text-text-black font-black pr-1 md:pr-4 mb-4 md:mb-8">
                           {post.title}
                        </h3>
                        
                        <div className="mt-auto block">
                          <div className="h-px w-full bg-gradient-to-r from-black/5 to-transparent mb-2 md:mb-6" />
                          <button className="font-bold text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-1.5 md:gap-3 text-muted-gray group-hover:text-black transition-colors">
                            READ ARTICLE <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-2 group-hover:text-accent-yellow transition-all" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Dynamic Insights from DB */}
                  {publicInsights.slice(0, 3).map((post, idx) => (
                    <motion.div 
                      key={post.id || `dynamic-${idx}`} 
                      whileHover={{ y: -8 }}
                      onClick={() => {
                        setActivePost(post);
                        setCurrentPage("insight-dynamic");
                      }}
                      className="bg-white rounded-xl md:rounded-3xl border border-black/5 hover:border-accent-yellow/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 group cursor-pointer flex flex-col relative overflow-hidden"
                    >
                      <div className="h-28 md:h-56 w-full overflow-hidden relative">
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                        <img referrerPolicy="no-referrer" src={post.coverImage || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"} loading="lazy" alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent z-20" />
                      </div>

                      <div className="p-4 md:p-10 flex-col flex flex-1 relative z-30 -mt-6 md:-mt-12">
                        <div className="flex justify-between items-center mb-3 md:mb-6">
                          <div className="flex items-center gap-1.5 md:gap-3">
                            <div className="bg-white p-1.5 md:p-2.5 rounded-lg md:rounded-xl border border-black/5 group-hover:border-accent-yellow transition-colors shadow-sm">
                              <Lightbulb className="text-black w-4 h-4 md:w-5 md:h-5" />
                            </div>
                            <span className="font-mono text-[8px] md:text-xs text-black uppercase tracking-widest font-bold bg-white px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-black/5 shadow-sm">{post.category}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-[16px] md:text-3xl leading-snug text-text-black font-black pr-1 md:pr-4 mb-4 md:mb-8">
                           {post.title}
                        </h3>
                        
                        <div className="mt-auto block">
                          <div className="h-px w-full bg-gradient-to-r from-black/5 to-transparent mb-2 md:mb-6" />
                          <button className="font-bold text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-1.5 md:gap-3 text-muted-gray group-hover:text-black transition-colors">
                            READ ARTICLE <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-2 group-hover:text-accent-yellow transition-all" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                  <button 
                    onClick={() => setCurrentPage("insights")}
                    className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-widest hover:text-accent-yellow transition-colors group px-6 py-3 border-2 border-black/10 rounded-full"
                  >
                    View All Insights <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </section>
      
            {/* Dark CTA */}
            <section id="getnoticed" className="bg-text-black text-white text-center py-32 px-[5%]">
              <motion.div
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true }}
                 variants={fadeInVariant}
              >
                <h2 className="text-3xl md:text-8xl lg:text-[120px] leading-tight text-accent-yellow mb-8 drop-shadow-lg">
                  STOP BLENDING IN.<br />GET NOTICED.
                </h2>
                <p className="max-w-2xl mx-auto text-base md:text-xl opacity-80 mb-12">
                  Your audience is already out there. The only question is — can they find you?
                </p>
                <motion.button 
                  onClick={() => setCurrentPage("get-noticed")}
                  whileTap={{ scale: 0.95, filter: "blur(4px)" }}
                  className="inline-block bg-accent-yellow text-black font-bold py-4 md:py-6 px-8 md:px-12 text-lg md:text-xl hover:scale-105 transition-transform rounded-sm cursor-pointer uppercase tracking-tight shadow-2xl"
                >
                  Get Noticed By Outtreach →
                </motion.button>
              </motion.div>
            </section>
      
            {/* Booking Promo - Enhanced with Soft Box and Highlight Points */}
            <section className="py-24 px-[5%]">
              <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                 className="max-w-4xl mx-auto bg-white/30 backdrop-blur-2xl rounded-[3rem] p-10 md:p-20 border border-white/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] hover:-translate-y-4 hover:rotate-1 transition-all duration-700 ease-out text-center relative overflow-hidden"
              >
                {/* Decorative Soft Accents */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent-yellow/10 rounded-full blur-[80px]" />
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]" />

                <div className="relative z-10">
                  <span className="inline-block bg-black text-white px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8 rounded-full">Consultation</span>
                  <h2 className="text-3xl md:text-5xl font-sans font-black mb-6 tracking-tight uppercase leading-[1.1]">Not Sure Where To <span className="text-accent-yellow">Start?</span></h2>
                  <p className="text-sm md:text-base mb-12 max-w-xl mx-auto text-black/60 font-medium leading-relaxed">
                    Let’s get on a call. We listen first, strategically plan second, and execute flawlessly to make your business goals a reality.
                  </p>
                  
                  {/* Highlight Points */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                      { icon: <Target className="w-5 h-5" />, text: "Listener-First Approach" },
                      { icon: <TrendingUp className="w-5 h-5" />, text: "Custom Expansion Plan" },
                      { icon: <Flame className="w-5 h-5" />, text: "Real, Measurable Results" }
                    ].map((point, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-3 group">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-accent-yellow shadow-sm border border-black/5 group-hover:scale-110 transition-transform">
                          {point.icon}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-black/40">{point.text}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setCurrentPage("booking")}
                    className="group relative inline-flex items-center gap-4 bg-black text-accent-yellow font-black py-5 px-10 rounded-2xl text-base uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Book Your Growth Call <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                  </button>
                </div>
              </motion.div>
            </section>
            </>
          ) : currentPage === "about" ? (
            <AboutPage 
              onBack={() => setCurrentPage("home")} 
              onGetNoticed={() => navigateToGetNoticed()}
            />
          ) : currentPage === "get-noticed" ? (
            <GetNoticedPage onBack={() => setCurrentPage("home")} prefilledGoal={prefilledGoal} />
          ) : currentPage === "booking" ? (
            <BookingPage onBack={() => setCurrentPage("home")} />
          ) : currentPage === "work" ? (
            <WorkPage 
              onBack={() => setCurrentPage("home")} 
              onSelectWork={(id) => setCurrentPage(`work-${id}`)}
            />
          ) : currentPage === "work-growth-marketing" ? (
             <GrowthMarketingPage onBack={() => setCurrentPage("work")} onNavigateToGetNoticed={navigateToGetNoticed} />
          ) : currentPage === "work-brand-identity" ? (
             <BrandIdentityPage onBack={() => setCurrentPage("work")} onNavigateToGetNoticed={navigateToGetNoticed} />
          ) : currentPage === "work-social-media" ? (
             <SocialMediaPage onBack={() => setCurrentPage("work")} onNavigateToGetNoticed={navigateToGetNoticed} />
          ) : currentPage === "work-seo-organic" ? (
             <SeoOrganicPage onBack={() => setCurrentPage("work")} onNavigateToGetNoticed={navigateToGetNoticed} />
          ) : currentPage === "work-performance-ads" ? (
             <PerformanceAdsPage onBack={() => setCurrentPage("work")} onNavigateToGetNoticed={navigateToGetNoticed} />
          ) : currentPage === "work-content-production" ? (
             <ContentProductionPage onBack={() => setCurrentPage("work")} onNavigateToGetNoticed={navigateToGetNoticed} onBookCall={() => setCurrentPage("booking")} />
          ) : currentPage === "work-ai-automation" ? (
             <AiAutomationPage onBack={() => setCurrentPage("work")} onNavigateToGetNoticed={navigateToGetNoticed} onBookCall={() => setCurrentPage("booking")} />
          ) : currentPage === "reviews" ? (
             <ReviewPage onBack={() => setCurrentPage("home")} />
          ) : currentPage === "insight-logo" ? (
            <LogoInsightPage 
              onBack={() => setCurrentPage("home")} 
              comments={commentsByPost.logo || []}
              addComment={addComment("logo")}
              commentInput={commentInput}
              setCommentInput={setCommentInput}
              setCurrentPage={setCurrentPage}
              setShowPasswordModal={setShowPasswordModal}
            />
          ) : currentPage === "insight-growth" ? (
            <GrowthInsightPage 
              onBack={() => setCurrentPage("home")} 
              comments={commentsByPost.growth || []}
              addComment={addComment("growth")}
              commentInput={commentInput}
              setCommentInput={setCommentInput}
              setCurrentPage={setCurrentPage}
              setShowPasswordModal={setShowPasswordModal}
            />
          ) : currentPage === "insight-ads" ? (
            <AdsInsightPage 
              onBack={() => setCurrentPage("home")} 
              comments={commentsByPost.ads || []}
              addComment={addComment("ads")}
              commentInput={commentInput}
              setCommentInput={setCommentInput}
              setCurrentPage={setCurrentPage}
              setShowPasswordModal={setShowPasswordModal}
            />
          ) : currentPage === "insight-ai" ? (
            <AiInsightPage 
              onBack={() => setCurrentPage("home")} 
              comments={commentsByPost.ai || []}
              addComment={addComment("ai")}
              commentInput={commentInput}
              setCommentInput={setCommentInput}
              setCurrentPage={setCurrentPage}
              setShowPasswordModal={setShowPasswordModal}
            />
          ) : currentPage === "insights" ? (
            <InsightsMainPage 
              onBack={() => setCurrentPage("home")} 
              onNavigate={(page, data) => {
                setActivePost(data);
                setCurrentPage(page);
              }} 
            />
          ) : currentPage === "insight-dynamic" ? (
            <DynamicInsightPage 
              onBack={() => setCurrentPage("insights")} 
              post={activePost} 
            />
          ) : currentPage === "privacy-policy" ? (
            <PrivacyPolicyPage onBack={() => setCurrentPage("home")} />
          ) : currentPage === "disclaimer" ? (
            <DisclaimerPage onBack={() => setCurrentPage("home")} />
          ) : currentPage === "terms-conditions" ? (
            <TermsAndConditionsPage onBack={() => setCurrentPage("home")} />
          ) : currentPage === "refund-policy" ? (
            <RefundPolicyPage onBack={() => setCurrentPage("home")} />
          ) : null}
                </motion.div>
              </AnimatePresence>
            </main>
            <footer className="bg-text-black text-white py-24 px-[5%] border-t border-white/10 uppercase tracking-widest text-[10px] mt-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24 text-left lowercase normal-case tracking-normal text-base">
                <div className="col-span-1 lg:col-span-1">
                  <div className="bg-accent-yellow text-black px-4 py-2 text-2xl font-display font-bold inline-block mb-8 uppercase">
                    OUTTREACH
                  </div>
                  <p className="text-sm opacity-60 mb-8 max-w-xs leading-relaxed italic">
                    "Silence Out. Spotlight In."<br />
                    Growth Marketing Agency focused on making brands impossible to ignore.
                  </p>
                  <div className="space-y-4 text-sm opacity-80 font-bold">
                    <a href="mailto:outtreachgrowth@gmail.com" className="flex items-center gap-3 hover:text-accent-yellow transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      outtreachgrowth@gmail.com
                    </a>
                    <a href="tel:+918303984556" className="flex items-center gap-3 hover:text-accent-yellow transition-colors">
                      <Phone className="w-4 h-4" /> (+91) 83039 84556
                    </a>
                    <p className="flex items-center gap-3">
                      <MapPin className="w-4 h-4" /> Lucknow, India
                    </p>
                  </div>
                </div>
                
                <div className="uppercase tracking-widest text-xs font-bold space-y-8">
                  <div>
                    <h4 className="text-accent-yellow font-display text-lg mb-8 normal-case tracking-normal underline underline-offset-8">Pages</h4>
                    <ul className="space-y-4 text-xs opacity-60">
                      <li><a href="#home" onClick={() => setCurrentPage("home")} className="hover:text-accent-yellow transition-colors">Home</a></li>
                      <li><button onClick={() => setCurrentPage("about")} className="hover:text-accent-yellow transition-colors cursor-pointer">About</button></li>
                      <li><button onClick={() => setCurrentPage("work")} className="hover:text-accent-yellow transition-colors cursor-pointer">Work</button></li>
                      <li><button onClick={() => setCurrentPage("insights")} className="hover:text-accent-yellow transition-colors cursor-pointer">Insights</button></li>
                      <li><button onClick={() => setCurrentPage("reviews")} className="hover:text-accent-yellow transition-colors cursor-pointer capitalize">Reviews</button></li>
                    </ul>
                  </div>
                </div>
      
                <div className="uppercase tracking-widest text-xs font-bold">
                  <h4 className="text-accent-yellow font-display text-lg mb-8 normal-case tracking-normal underline underline-offset-8">Legal</h4>
                  <ul className="space-y-4 text-xs opacity-60">
                    <li><button onClick={() => setCurrentPage("privacy-policy")} className="hover:text-accent-yellow transition-colors cursor-pointer text-left focus:outline-none">Privacy Policy</button></li>
                    <li><button onClick={() => setCurrentPage("terms-conditions")} className="hover:text-accent-yellow transition-colors cursor-pointer text-left focus:outline-none">Terms & Conditions</button></li>
                    <li><button onClick={() => setCurrentPage("refund-policy")} className="hover:text-accent-yellow transition-colors cursor-pointer text-left focus:outline-none">Refund Policy</button></li>
                    <li><button onClick={() => setCurrentPage("disclaimer")} className="hover:text-accent-yellow transition-colors cursor-pointer text-left focus:outline-none">Disclaimer</button></li>
                  </ul>
                </div>
      
                <div className="uppercase tracking-widest text-xs font-bold">
                  <h4 className="text-accent-yellow font-display text-lg mb-8 normal-case tracking-normal underline underline-offset-8">Follow Us</h4>
                  <ul className="space-y-4 text-xs opacity-60">
                    <li>
                      <a href="https://www.instagram.com/outtreachgrowth" target="_blank" className="flex items-center gap-3 hover:text-accent-yellow transition-all">
                        <Instagram className="w-4 h-4" /> Instagram
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/in/pranjal-yadav-981034394?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-accent-yellow transition-all">
                        <Linkedin className="w-4 h-4" /> LinkedIn
                      </a>
                    </li>
                    <li>
                      <a href="https://x.com/BeyondTech__" target="_blank" className="flex items-center gap-3 hover:text-accent-yellow transition-all">
                        <Twitter className="w-4 h-4" /> Twitter / X
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] opacity-40">
                <div className="flex items-center gap-8 relative z-10">
                  <p>© 2026 Outtreach. All Rights Reserved.</p>
                </div>
                <p className="text-accent-yellow font-bold">SILENCE OUT. SPOTLIGHT IN.</p>
              </div>
            </footer>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
