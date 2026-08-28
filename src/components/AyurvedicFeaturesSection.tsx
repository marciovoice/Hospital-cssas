import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Wind, 
  Flame, 
  Droplet, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  HeartHandshake, 
  Sun, 
  Compass,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import type { AyurvedicPrinciple } from '../types';

const PRINCIPLES: AyurvedicPrinciple[] = [
  {
    id: 'tridosha',
    name: 'Tridosha',
    sanskrit: 'त्रिदोष सिद्धान्त',
    meaning: 'The Tri-Fold Dynamic Equilibrium',
    description: 'The fundamental biological energies that govern all physiological and psychological functions of the human organism.',
    element: 'Ether, Air, Fire, Water, Earth',
    iconName: 'Sparkles',
  },
  {
    id: 'vata',
    name: 'Vata Dosha',
    sanskrit: 'वात दोष',
    meaning: 'Kinetic & Movement Principle',
    doshaCategory: 'Vata',
    description: 'Composed of Akasha (Ether) and Vayu (Air). Controls nerve impulses, circulation, respiration, and cellular movement.',
    element: 'Space & Air',
    iconName: 'Wind',
  },
  {
    id: 'pitta',
    name: 'Pitta Dosha',
    sanskrit: 'पित्त दोष',
    meaning: 'Transformation & Metabolic Fire',
    doshaCategory: 'Pitta',
    description: 'Composed of Tejas (Fire) and Jala (Water). Governs digestion, metabolic transformation, enzyme synthesis, and body temperature.',
    element: 'Fire & Water',
    iconName: 'Flame',
  },
  {
    id: 'kapha',
    name: 'Kapha Dosha',
    sanskrit: 'कफ दोष',
    meaning: 'Structure & Cohesion Principle',
    doshaCategory: 'Kapha',
    description: 'Composed of Prithvi (Earth) and Jala (Water). Bestows physical strength, cellular lubrication, stability, and immune resilience (Ojas).',
    element: 'Water & Earth',
    iconName: 'Droplet',
  },
  {
    id: 'prakriti',
    name: 'Prakriti',
    sanskrit: 'मूल प्रकृति',
    meaning: 'Individual Inborn Constitution',
    description: 'The unique psycho-somatic phenotype determined at conception, dictating dietary, therapeutic, and lifestyle needs.',
    element: 'Genotypic Matrix',
    iconName: 'Compass',
  },
  {
    id: 'agni',
    name: 'Agni',
    sanskrit: 'जठराग्नि',
    meaning: 'Metabolic & Digestive Fire',
    description: 'The bio-catalyst responsible for nutrient assimilation, systemic detox, clarity of perception, and cellular vitality.',
    element: 'Digestive Radiance',
    iconName: 'Sun',
  },
  {
    id: 'ahara',
    name: 'Ahara',
    sanskrit: 'आहार विज्ञान',
    meaning: 'Sacred Nutrition & Dietetics',
    description: 'Considered the primary pillar of longevity. Food consumed according to season, constitution, and digestive capacity.',
    element: 'Nutritive Medicine',
    iconName: 'HeartHandshake',
  },
  {
    id: 'rasayana',
    name: 'Rasayana',
    sanskrit: 'रसायन तन्त्र',
    meaning: 'Geriatrics & Cellular Rejuvenation',
    description: 'Classical therapeutic modalities designed to arrest biological aging, boost Ojas, and maintain mental clarity.',
    element: 'Vital Immortality',
    iconName: 'ShieldCheck',
  },
];

const CANONICAL_SECTIONS = [
  { name: 'Sutra Sthana', sanskrit: 'सूत्रस्थानम्', desc: 'General principles, pharmacology, regimen for daily living (Dinacharya), and ethics.' },
  { name: 'Nidana Sthana', sanskrit: 'निदानस्थानम्', desc: 'Etiology, pathogenesis, and diagnostic methodology of classical diseases.' },
  { name: 'Vimana Sthana', sanskrit: 'विमानस्थानम्', desc: 'Epistemology, dosha quantification, epidemiology, and clinical pedagogy.' },
  { name: 'Sharira Sthana', sanskrit: 'शारीरस्थानम्', desc: 'Embryology, anatomy, genetic constitution, and spiritual dimensions of life.' },
  { name: 'Indriya Sthana', sanskrit: 'इन्द्रियस्थानम्', desc: 'Prognostic medicine and signs of recovery and lifespan assessment.' },
  { name: 'Chikitsa Sthana', sanskrit: 'चिकित्सास्थानम्', desc: 'Comprehensive therapeutics, formulation preparation, and Panchakarma.' },
  { name: 'Kalpa Sthana', sanskrit: 'कल्पस्थानम्', desc: 'Standard operating procedures for therapeutic evacuation and formulation scaling.' },
  { name: 'Siddhi Sthana', sanskrit: 'सिद्धिस्थानम्', desc: 'Successful clinical outcomes, management of complications, and vital points (Marma).' },
];

export const AyurvedicFeaturesSection: React.FC = () => {
  const [selectedPrinciple, setSelectedPrinciple] = useState<AyurvedicPrinciple>(PRINCIPLES[0]);
  
  // Interactive mini Prakriti Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [prakritiResult, setPrakritiResult] = useState<string | null>(null);

  const calculatePrakriti = () => {
    const counts: Record<string, number> = { vata: 0, pitta: 0, kapha: 0 };
    (Object.values(quizAnswers) as string[]).forEach((val) => {
      if (typeof val === 'string' && val in counts) {
        counts[val] = (counts[val] || 0) + 1;
      }
    });
    const vataCount = counts['vata'] || 0;
    const pittaCount = counts['pitta'] || 0;
    const kaphaCount = counts['kapha'] || 0;

    if (vataCount >= pittaCount && vataCount >= kaphaCount) {
      setPrakritiResult('Vata Dominant (Air & Space Principle) — Adaptable, imaginative, needs warm nourishing foods and grounding routines.');
    } else if (pittaCount >= vataCount && pittaCount >= kaphaCount) {
      setPrakritiResult('Pitta Dominant (Fire & Water Principle) — Sharp intellect, purposeful, needs cooling herbs, balanced schedules, and hydration.');
    } else {
      setPrakritiResult('Kapha Dominant (Earth & Water Principle) — Calm, steady endurance, needs stimulating exercise, light warm spices, and activity.');
    }
  };

  return (
    <section className="relative z-30 bg-[#070504] py-24 px-4 sm:px-6 lg:px-8 border-t border-[#d4af37]/20">
      {/* Background radial gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18110a] border border-[#d4af37]/30 text-[#d4af37] text-[11px] font-cinzel tracking-widest uppercase mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Vedic Manuscript Codex
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#ede4d8] mb-4">
            The Eight Pillars of Ayurvedic Science
          </h2>
          <p className="font-cormorant text-lg sm:text-xl text-[#cbb282] leading-relaxed">
            Preserved directly from the golden manuscripts of Acharya Charak, our sansthan bridges millenia of diagnostic mastery with clinical excellence.
          </p>
        </div>

        {/* 8 Core Principles Grid */}
        <div id="ayurveda-principles" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {PRINCIPLES.map((principle) => {
            const isSelected = selectedPrinciple.id === principle.id;
            return (
              <div
                key={principle.id}
                onClick={() => setSelectedPrinciple(principle)}
                className={`relative group p-6 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                  isSelected
                    ? 'bg-[#18120b] border-[#ffd700] shadow-[0_0_25px_rgba(212,175,55,0.2)]'
                    : 'bg-[#100c08]/80 border-[#d4af37]/20 hover:border-[#d4af37]/60 hover:bg-[#140e09]'
                }`}
                id={`card-principle-${principle.id}`}
              >
                {/* Accent Top Border */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`} />

                <div className="flex items-center justify-between mb-3">
                  <span className="font-sanskrit text-sm text-[#ffd700] font-medium">
                    {principle.sanskrit}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-[#a89582] bg-[#22180f] px-2 py-0.5 rounded">
                    {principle.element}
                  </span>
                </div>

                <h3 className="font-cinzel text-lg font-bold text-[#ede4d8] mb-1 group-hover:text-[#ffd700] transition-colors">
                  {principle.name}
                </h3>
                <p className="text-xs text-[#d4af37] font-medium mb-3">
                  {principle.meaning}
                </p>
                <p className="text-xs text-[#a89582] line-clamp-3 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Selected Principle Deep Dive Banner */}
        <div className="bg-gradient-to-br from-[#161009] to-[#0c0805] border border-[#d4af37]/35 rounded-3xl p-8 sm:p-12 mb-28 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_80%_20%,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
            <div className="lg:col-span-2">
              <div className="inline-block px-3 py-1 rounded-md bg-[#281b10] border border-[#ffd700]/30 text-[#ffd700] text-xs font-mono mb-3">
                ॥ श्लोक व्याख्या ॥ {selectedPrinciple.sanskrit}
              </div>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#fff3db] mb-3">
                {selectedPrinciple.name}: {selectedPrinciple.meaning}
              </h3>
              <p className="text-sm sm:text-base text-[#d8c5ad] leading-relaxed mb-6">
                {selectedPrinciple.description}
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-[#0b0805]/70 border border-[#d4af37]/20 p-3 rounded-xl">
                  <span className="text-[#a89582] block text-[10px] uppercase font-mono">Constitutional Element</span>
                  <strong className="text-[#ffd700] font-cinzel">{selectedPrinciple.element}</strong>
                </div>
                <div className="bg-[#0b0805]/70 border border-[#d4af37]/20 p-3 rounded-xl">
                  <span className="text-[#a89582] block text-[10px] uppercase font-mono">Canonical Reference</span>
                  <strong className="text-[#ede4d8]">Charak Sutrasthana</strong>
                </div>
                <div className="bg-[#0b0805]/70 border border-[#d4af37]/20 p-3 rounded-xl col-span-2 sm:col-span-1">
                  <span className="text-[#a89582] block text-[10px] uppercase font-mono">Sansthan Clinical Application</span>
                  <strong className="text-[#ffd700]">Panchakarma & Rasayana</strong>
                </div>
              </div>
            </div>

            <div className="bg-[#1a120b] border border-[#d4af37]/30 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#d4af37]/20 to-[#ffd700]/10 border border-[#ffd700]/50 flex items-center justify-center text-[#ffd700] mb-4 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                <Sparkles className="w-8 h-8" />
              </div>
              <h4 className="font-cinzel text-base font-semibold text-[#ede4d8] mb-1">
                Sansthan Guidance
              </h4>
              <p className="text-xs text-[#a89582] mb-4">
                Consult with our senior Ayurvedic Vaidyas for custom constitution balancing.
              </p>
              <button 
                onClick={() => {
                  const el = document.getElementById('prakriti-explorer');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#99731b] hover:from-[#f6d365] hover:to-[#b38927] text-[#0d0a06] text-xs font-semibold font-cinzel transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] cursor-pointer"
                id="btn-consultation-jump"
              >
                Assess Your Prakriti
              </button>
            </div>
          </div>
        </div>

        {/* Charak Samhita 8 Canonical Sthanas */}
        <div id="canonical-sections" className="mb-28">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-cinzel tracking-widest text-[#d4af37] uppercase">
              Eight Canonical Sections
            </span>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#ede4d8] mt-1">
              Structure of Charaka Samhita
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CANONICAL_SECTIONS.map((sec, idx) => (
              <div
                key={sec.name}
                className="p-5 rounded-xl bg-[#0f0b07] border border-[#d4af37]/20 hover:border-[#ffd700]/50 transition-colors"
                id={`sthāna-card-${idx}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-[#ffd700] px-2 py-0.5 rounded bg-[#20150c]">
                    Section 0{idx + 1}
                  </span>
                  <span className="font-sanskrit text-xs text-[#cbb282]">
                    {sec.sanskrit}
                  </span>
                </div>
                <h4 className="font-cinzel text-sm font-semibold text-[#ede4d8] mb-1">
                  {sec.name}
                </h4>
                <p className="text-xs text-[#8e7a68] leading-relaxed">
                  {sec.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Prakriti Assessment Tool */}
        <div id="prakriti-explorer" className="bg-[#120d08] border border-[#d4af37]/30 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#ffd700]">
                Interactive Diagnostic Tool
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#ede4d8] mt-1">
                Prakriti Self-Discovery Assessment
              </h3>
              <p className="font-cormorant text-sm text-[#cbb282] mt-2">
                Discover your constitutional baseline according to the canonical parameters of Charak Samhita.
              </p>
            </div>

            {/* Quiz Questions */}
            <div className="space-y-6 mb-8">
              {/* Question 1 */}
              <div className="bg-[#0b0805] border border-[#d4af37]/20 p-5 rounded-2xl">
                <p className="text-sm font-medium text-[#ede4d8] mb-3">
                  1. Physical Frame & Natural Movement Pace:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {[
                    { key: 'vata', label: 'Slender, light frame, quick active movements' },
                    { key: 'pitta', label: 'Medium athletic build, precise energetic stride' },
                    { key: 'kapha', label: 'Broad sturdy build, graceful steady gait' },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setQuizAnswers((prev) => ({ ...prev, 1: opt.key }))}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        quizAnswers[1] === opt.key
                          ? 'bg-[#d4af37]/20 border-[#ffd700] text-[#ffd700]'
                          : 'bg-[#161009] border-[#d4af37]/15 text-[#a89582] hover:border-[#d4af37]/40'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div className="bg-[#0b0805] border border-[#d4af37]/20 p-5 rounded-2xl">
                <p className="text-sm font-medium text-[#ede4d8] mb-3">
                  2. Digestive Fire (Agni) & Appetite Patterns:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {[
                    { key: 'vata', label: 'Variable / irregular appetite, easily bloated' },
                    { key: 'pitta', label: 'Intense / sharp appetite, cannot skip meals' },
                    { key: 'kapha', label: 'Slow steady appetite, easy to fast comfortably' },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setQuizAnswers((prev) => ({ ...prev, 2: opt.key }))}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        quizAnswers[2] === opt.key
                          ? 'bg-[#d4af37]/20 border-[#ffd700] text-[#ffd700]'
                          : 'bg-[#161009] border-[#d4af37]/15 text-[#a89582] hover:border-[#d4af37]/40'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              <div className="bg-[#0b0805] border border-[#d4af37]/20 p-5 rounded-2xl">
                <p className="text-sm font-medium text-[#ede4d8] mb-3">
                  3. Mental Temperament & Stress Response:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {[
                    { key: 'vata', label: 'Creative, rapidly changing thoughts, anxiety-prone' },
                    { key: 'pitta', label: 'Focused, decisive, ambitious, easily irritated' },
                    { key: 'kapha', label: 'Calm, loyal, patient, resistant to change' },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setQuizAnswers((prev) => ({ ...prev, 3: opt.key }))}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        quizAnswers[3] === opt.key
                          ? 'bg-[#d4af37]/20 border-[#ffd700] text-[#ffd700]'
                          : 'bg-[#161009] border-[#d4af37]/15 text-[#a89582] hover:border-[#d4af37]/40'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action & Result */}
            <div className="flex flex-col items-center">
              <button
                onClick={calculatePrakriti}
                disabled={Object.keys(quizAnswers).length < 3}
                className={`py-3 px-8 rounded-xl font-cinzel text-xs tracking-wider font-bold transition-all ${
                  Object.keys(quizAnswers).length >= 3
                    ? 'bg-gradient-to-r from-[#ffd700] to-[#d4af37] text-[#0d0a06] hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)] cursor-pointer'
                    : 'bg-[#20160d] text-[#6b5847] border border-[#d4af37]/10 cursor-not-allowed'
                }`}
                id="btn-evaluate-prakriti"
              >
                EVALUATE CONSTITUTION
              </button>

              {prakritiResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-6 rounded-2xl bg-[#1c130b] border border-[#ffd700]/40 text-center w-full shadow-lg"
                >
                  <span className="text-[10px] font-mono text-[#ffd700] uppercase tracking-widest block mb-1">
                    Your Canonical Profile
                  </span>
                  <p className="font-cinzel text-sm sm:text-base font-semibold text-[#fff2b2] mb-2">
                    {prakritiResult}
                  </p>
                  <p className="text-xs text-[#cbb282] max-w-lg mx-auto">
                    At Chandra Shekhar Singh Ayurved Sansthan, our Vaidyas prescribe precise seasonal Dinacharya (daily rituals) and Ritucharya (seasonal regimens) to maintain your Ojas.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
