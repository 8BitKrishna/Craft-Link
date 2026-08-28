import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DemoBanner from '../components/DemoBanner';
import CustomCursor from '../components/CustomCursor';
import ScrollProgressBar from '../components/ScrollProgressBar';
import SiteOpeningLoader from '../components/SiteOpeningLoader';
import QuickPageLauncher from '../components/QuickPageLauncher';
import FloatingCraftProps from '../components/FloatingCraftProps';
import PageTransition from './PageTransition';

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F5] dark:bg-[#0B0F17] text-stone-900 dark:text-stone-100 selection:bg-[#C85A32]/20 selection:text-[#C85A32] relative transition-colors duration-300 font-sans">
      {/* 1. Cinematic Site Opening Animation Splash */}
      <SiteOpeningLoader />

      {/* 2. Custom Smooth Lag Cursor */}
      <CustomCursor />

      {/* 3. Ambient Floating Craft Props */}
      <FloatingCraftProps />

      {/* 4. Top Scroll Progress Gradient & Smooth Scroll-To-Top */}
      <ScrollProgressBar />

      {/* 5. Direct Page Navigator & Floating Teleporter */}
      <QuickPageLauncher />

      {/* 6. Demo Banner & Navbar */}
      <DemoBanner />
      <Navbar />

      {/* 7. Animated Smooth Page Shift Outlet with Shutter Transitions */}
      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
