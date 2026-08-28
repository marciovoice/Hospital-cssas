/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavigationHeader } from './components/NavigationHeader';
import { HeroScrollSection } from './components/HeroScrollSection';
import { AyurvedicFeaturesSection } from './components/AyurvedicFeaturesSection';
import { FooterSection } from './components/FooterSection';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Global scroll listener for header percentage indicator
  useEffect(() => {
    const handleGlobalScroll = () => {
      const hero = document.getElementById('hero-container');
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable > 0) {
        const p = Math.max(0, Math.min(1, -rect.top / scrollable));
        setScrollProgress(p);
      }
    };

    window.addEventListener('scroll', handleGlobalScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleGlobalScroll);
  }, []);

  const handleJumpToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleReducedMotion = () => {
    setIsReducedMotion((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#060403] text-[#ede4d8] selection:bg-[#d4af37]/30 selection:text-[#ffd700]">
      {/* Top Fixed Navigation */}
      <NavigationHeader
        progress={scrollProgress}
        isReducedMotion={isReducedMotion}
        onToggleReducedMotion={toggleReducedMotion}
        onJumpToSection={handleJumpToSection}
      />

      <main>
        {/* Cinematic Scroll-Driven Hero Section (Pinned & Frame Controlled) */}
        <HeroScrollSection isReducedMotionExternal={isReducedMotion} />

        {/* Subsequent sections continuing naturally after hero releases */}
        <AyurvedicFeaturesSection />
      </main>

      {/* Vedic Institutional Footer */}
      <FooterSection onJumpToTop={() => handleJumpToSection('hero-container')} />
    </div>
  );
}

