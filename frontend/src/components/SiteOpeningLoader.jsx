import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function SiteOpeningLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate loading progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        return prev + 25;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="site-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -20,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[999999] bg-[#121212] text-white flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* Ambient Glowing Background Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.25, 0.45, 0.25]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#C85A27]/40 via-amber-600/30 to-[#1E4D2B]/40 blur-3xl pointer-events-none"
          />

          {/* Center Brand Emblem & Opening Sequence */}
          <div className="relative z-10 text-center space-y-6 max-w-sm px-6">
            {/* Emblem with pulsing halo */}
            <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#C85A27]/50"
              />
              <motion.img
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                src="/icon.png"
                alt="CraftLink Emblem"
                className="h-20 w-auto object-contain drop-shadow-2xl bg-white/10 p-2 rounded-2xl backdrop-blur-sm"
              />
            </div>

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-2"
            >
              <div className="text-3xl font-extrabold font-serif tracking-tight flex items-center justify-center gap-1">
                <span className="text-emerald-400">Craft</span>
                <span className="text-[#C85A27]">Link</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-extrabold font-sans">
                AI-POWERED MARKETPLACE
              </div>
              <p className="text-[11px] text-stone-400 font-normal tracking-wide">
                Empowering Artisans • Intelligent Discovery • Stronger Connections
              </p>
            </motion.div>

            {/* Smooth Progress Bar & Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-2 pt-2"
            >
              <div className="w-48 h-1.5 bg-stone-800 rounded-full overflow-hidden mx-auto border border-stone-700/60">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-[#C85A27] rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.2 }}
                />
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-400 font-mono">
                <Sparkles className="w-3 h-3 text-amber-400 animate-spin" />
                <span>Initializing Craft Ecosytem... {progress}%</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom Hackathon Tag */}
          <div className="absolute bottom-6 text-center text-[11px] text-stone-500 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Smart India Hackathon 2026 Production Edition</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
