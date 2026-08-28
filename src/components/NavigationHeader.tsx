import React from 'react';
import { BookOpen, Sparkles, Eye, ShieldCheck, Compass } from 'lucide-react';

interface NavigationHeaderProps {
  progress: number;
  isReducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onJumpToSection: (id: string) => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  progress,
  isReducedMotion,
  onToggleReducedMotion,
  onJumpToSection,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-[#070504]/70 border-b border-[#d4af37]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div 
          onClick={() => onJumpToSection('hero-container')}
          className="flex items-center gap-3 cursor-pointer group"
          id="nav-brand-logo"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#d4af37]/20 to-[#8b6508]/40 border border-[#d4af37]/40 flex items-center justify-center text-[#ffd700] shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:border-[#ffd700] transition-colors">
            <BookOpen className="w-5 h-5 text-[#f6d365]" />
          </div>
          <div>
            <h1 className="font-cinzel text-xs sm:text-sm font-semibold tracking-wider text-[#ede4d8] group-hover:text-[#ffd700] transition-colors leading-tight">
              CHANDRA SHEKHAR SINGH
            </h1>
            <p className="text-[10px] tracking-[0.2em] text-[#d4af37]/80 font-medium">
              AYURVED SANSTHAN
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs tracking-wider text-[#cbb282]">
          <button
            onClick={() => onJumpToSection('hero-container')}
            className="hover:text-[#ffd700] transition-colors cursor-pointer"
            id="nav-link-manuscript"
          >
            CHARAK SAMHITA
          </button>
          <button
            onClick={() => onJumpToSection('ayurveda-principles')}
            className="hover:text-[#ffd700] transition-colors cursor-pointer"
            id="nav-link-principles"
          >
            CORE PRINCIPLES
          </button>
          <button
            onClick={() => onJumpToSection('canonical-sections')}
            className="hover:text-[#ffd700] transition-colors cursor-pointer"
            id="nav-link-sections"
          >
            THE EIGHT LIMBS
          </button>
          <button
            onClick={() => onJumpToSection('prakriti-explorer')}
            className="hover:text-[#ffd700] transition-colors cursor-pointer"
            id="nav-link-prakriti"
          >
            PRAKRITI ASSESSMENT
          </button>
        </nav>

        {/* Actions & Live Indicators */}
        <div className="flex items-center gap-3">
          {/* Scroll progress mini pill */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#161009] border border-[#d4af37]/20 text-[11px] font-mono text-[#d4af37]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffd700] animate-pulse" />
            <span>{Math.round(progress * 100)}% SCROLL</span>
          </div>

          {/* Reduced Motion Toggle */}
          <button
            onClick={onToggleReducedMotion}
            title={isReducedMotion ? "Enable full scroll animation" : "Enable reduced motion (static view)"}
            className={`p-2 rounded-lg border transition-all text-xs flex items-center gap-1.5 cursor-pointer ${
              isReducedMotion
                ? 'bg-[#d4af37]/20 border-[#ffd700] text-[#ffd700]'
                : 'bg-[#120d08] border-[#d4af37]/20 text-[#a89582] hover:text-[#ede4d8] hover:border-[#d4af37]/50'
            }`}
            id="btn-toggle-reduced-motion"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden lg:inline text-[11px]">
              {isReducedMotion ? 'Motion Reduced' : 'Scroll Motion'}
            </span>
          </button>

          {/* Direct CTA */}
          <button
            onClick={() => onJumpToSection('ayurveda-principles')}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b38927] hover:from-[#f3ce63] hover:to-[#c69a30] text-[#0d0a06] text-xs font-semibold tracking-wider font-cinzel transition-all shadow-[0_0_15px_rgba(212,175,55,0.25)] cursor-pointer"
            id="btn-explore-wisdom"
          >
            EXPLORE
          </button>
        </div>
      </div>
    </header>
  );
};
