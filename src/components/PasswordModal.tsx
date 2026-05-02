import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, ArrowRight, X } from "lucide-react";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (code?: string) => void;
}

export const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (emailInput.toLowerCase().trim() === "outtreachgrowth@gmail.com" && passInput === "Outtreachversion7791@rise11") {
      setLoading(true);
      try {
        localStorage.setItem('op_pass', passInput);
        onSuccess(passInput);
        onClose();
        setEmailInput("");
        setPassInput("");
        setError(false);
      } catch (err) {
        console.error("Auth Failed", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    } else {
      setError(true);
      setPassInput("");
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white text-black w-full max-w-md p-8 md:p-12 rounded-2xl md:rounded-[3rem] relative shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <X className="w-5 h-5 opacity-40" />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-yellow rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                <Lock className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase mb-3 tracking-wider">ADMIN LOGIN</h2>
              <p className="text-xs md:text-sm text-neutral-500 mb-10 font-bold uppercase tracking-widest italic">Management Portal Access</p>
              
              <div className="relative mb-4">
                <input 
                  type="email" 
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="EMAIL ADDRESS"
                  className={`w-full bg-neutral-50 border-2 ${error ? 'border-red-500' : 'border-black/5'} focus:border-accent-yellow outline-none p-4 font-mono text-sm tracking-widest transition-all rounded-xl`}
                  autoFocus
                />
              </div>

              <div className="relative mb-6">
                <input 
                  type="password" 
                  value={passInput}
                  onChange={(e) => setPassInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                  placeholder="PASSWORD"
                  className={`w-full bg-neutral-50 border-2 ${error ? 'border-red-500' : 'border-black/5'} focus:border-accent-yellow outline-none p-4 font-mono text-sm tracking-[0.2em] transition-all rounded-xl`}
                />
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-4"
                  >
                    Invalid Credentials. Access Denied.
                  </motion.p>
                )}
              </div>

              <button 
                onClick={handleVerify}
                disabled={loading}
                className="w-full bg-black text-white font-bold py-4 md:py-6 rounded-xl text-sm md:text-base uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? 'AUTHENTICATING...' : 'PROCEED'} {!loading && <ArrowRight className="w-5 h-5 text-accent-yellow" />}
              </button>
              
              <p className="mt-8 text-[9px] md:text-[10px] opacity-30 font-bold uppercase tracking-widest leading-relaxed">
                Notice: Unauthorized access attempts are logged and monitored. IP tracing active.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PasswordModal;
