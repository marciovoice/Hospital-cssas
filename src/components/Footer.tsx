import React from 'react';
import { BookOpen, ShieldCheck, MapPin, Phone, Mail, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050302] border-t border-[#d4af37]/20 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-xs text-[#8e7a68]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Col 1: Identity */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37]/20 to-[#8b6508]/40 border border-[#d4af37]/40 flex items-center justify-center text-[#ffd700]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-cinzel text-sm font-semibold text-[#ede4d8] tracking-wider">
                CHANDRA SHEKHAR SINGH
              </h4>
              <p className="text-[10px] tracking-[0.2em] text-[#d4af37]">
                AYURVED SANSTHAN
              </p>
            </div>
          </div>
          <p className="text-xs text-[#a89582] max-w-md leading-relaxed">
            Dedicated to the authentic preservation, clinical practice, and scientific advancement of classical Charak Samhita Ayurvedic medicine and Panchakarma therapeutics.
          </p>
          <div className="pt-2 flex items-center gap-3 text-[#cbb282]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#120d08] border border-[#d4af37]/20 text-[11px]">
              <Award className="w-3.5 h-3.5 text-[#ffd700]" />
              Recognized Ayurvedic Institute & Hospital
            </span>
          </div>
        </div>

        {/* Col 2: Sansthan Departments */}
        <div className="space-y-3">
          <h5 className="font-cinzel text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
            Sansthan Faculties
          </h5>
          <ul className="space-y-2 text-[#a89582]">
            <li className="hover:text-[#ffd700] transition-colors cursor-pointer">Kayachikitsa (Internal Medicine)</li>
            <li className="hover:text-[#ffd700] transition-colors cursor-pointer">Panchakarma Super-Specialty</li>
            <li className="hover:text-[#ffd700] transition-colors cursor-pointer">Dravyaguna (Herbal Pharmacology)</li>
            <li className="hover:text-[#ffd700] transition-colors cursor-pointer">Rasashastra & Bhaishajya Kalpana</li>
            <li className="hover:text-[#ffd700] transition-colors cursor-pointer">Swasthavritta & Yoga Therapy</li>
          </ul>
        </div>

        {/* Col 3: Vedic Inscription */}
        <div className="space-y-3">
          <h5 className="font-cinzel text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
            Vedic Prayer of Well-Being
          </h5>
          <blockquote className="font-sanskrit text-xs text-[#e8c374] border-l-2 border-[#d4af37]/40 pl-3 leading-relaxed">
            सर्वे भवन्तु सुखिनः<br />
            सर्वे सन्तु निरामयाः ।<br />
            सर्वे भद्राणि पश्यन्तु<br />
            मा कश्चिद्दुःखभाग्भवेत् ॥
          </blockquote>
          <p className="font-cormorant italic text-[11px] text-[#8e7a68]">
            "May all beings be happy. May all beings be free from disease."
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-[#d4af37]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6e5d4e]">
        <p>© {new Date().getFullYear()} Chandra Shekhar Singh Ayurved Sansthan. All rights reserved.</p>
        <p className="font-mono text-[10px] text-[#d4af37]/60">
          Scroll-Driven Precision Engine • Charak Samhita Cinematic Heritage
        </p>
      </div>
    </footer>
  );
};
