import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={'relative p-2 rounded-full border transition-all duration-300 ' + (
        isDark
          ? 'bg-[#131B2A] border-stone-700/80 text-amber-300 hover:bg-[#1C263A] hover:border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
          : 'bg-white/90 border-stone-200 text-stone-700 hover:bg-stone-100 hover:text-stone-900 shadow-xs'
      ) + ' ' + className}
      title={isDark ? 'Switch to Warm Rural Craft Theme (Light)' : 'Switch to Urban Obsidian Luxury Theme (Dark)'}
      aria-label="Toggle Theme"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-300" />
        ) : (
          <Moon className="w-4 h-4 text-stone-700" />
        )}
      </motion.div>
    </button>
  );
}
