import React from 'react';
import { BookOpen, MapPin, Phone, Mail, Award, Heart } from 'lucide-react';

interface FooterSectionProps {
  onJumpToTop: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onJumpToTop }) => {
  return (
    <footer className="relative z-30 bg-[#050302] border-t border-[#d4af37]/20 pt-16 pb-12 text-[#a89582] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Institute Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={onJumpToTop}>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37]/20 to-[#8b6508]/40 border border-[#d4af37]/40 flex items-center justify-center text-[#ffd700]">
                <BookOpen className="w-5 h-5 text-[#f6d365]" />
              </div>
              <div>
                <h3 className="font-cinzel text-sm font-bold text-[#ede4d8] tracking-wider">
                  CHANDRA SHEKHAR SINGH AYURVED SANSTHAN
                </h3>
                <p className="text-[10px] tracking-[0.2em] text-[#d4af37]">
                  ANCIENT WISDOM. MODERN HEALING.
                </p>
              </div>
            </div>
            <p className="text-xs text-[#8e7a68] leading-relaxed max-w-md mb-4">
              Dedicated to the uncompromised preservation and clinical application of authentic Ayurvedic scriptures. Specializing in classical Panchakarma, Rasayana rejuvenation, and constitutional Prakriti diagnostics.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#140e08] border border-[#d4af37]/25 text-[11px] text-[#d4af37]">
              <Award className="w-3.5 h-3.5 text-[#ffd700]" />
              <span>Accredited Ayurvedic Research & Clinical Sansthan</span>
            </div>
          </div>

          {/* Col 2: Canonical Modules */}
          <div>
            <h4 className="font-cinzel text-xs font-semibold text-[#ede4d8] uppercase tracking-widest mb-4">
              Classical Disciplines
            </h4>
            <ul className="space-y-2 text-[#8e7a68]">
              <li><a href="#ayurveda-principles" className="hover:text-[#ffd700] transition-colors">Charak Samhita Sutrasthana</a></li>
              <li><a href="#ayurveda-principles" className="hover:text-[#ffd700] transition-colors">Kaya Chikitsa (Internal Medicine)</a></li>
              <li><a href="#ayurveda-principles" className="hover:text-[#ffd700] transition-colors">Panchakarma Detoxification</a></li>
              <li><a href="#ayurveda-principles" className="hover:text-[#ffd700] transition-colors">Dravyaguna (Herbal Pharmacology)</a></li>
              <li><a href="#prakriti-explorer" className="hover:text-[#ffd700] transition-colors">Prakriti & Nadi Pariksha</a></li>
            </ul>
          </div>

          {/* Col 3: Sansthan Contact */}
          <div>
            <h4 className="font-cinzel text-xs font-semibold text-[#ede4d8] uppercase tracking-widest mb-4">
              Sansthan Contact
            </h4>
            <div className="space-y-3 text-[#8e7a68]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>Ayurvedic Campus & Clinical Center, CSS Ayurved Sansthan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>+91 (0) 542 228 9400</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>contact@cssayurved.edu.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom divider & copyright */}
        <div className="pt-8 border-t border-[#d4af37]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6e5e50]">
          <p>© {new Date().getFullYear()} Chandra Shekhar Singh Ayurved Sansthan. All sacred scriptures preserved.</p>
          <div className="flex items-center gap-4">
            <button 
              onClick={onJumpToTop} 
              className="text-[#d4af37] hover:text-[#ffd700] underline uppercase tracking-wider cursor-pointer"
              id="btn-footer-back-to-top"
            >
              Back to Scripture Hero ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
