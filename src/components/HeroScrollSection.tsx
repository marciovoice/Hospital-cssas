import React, { useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  UploadCloud, 
  Sparkles, 
  BookOpen, 
  Layers, 
  Flame, 
  Leaf, 
  Wind, 
  Activity,
  Maximize2
} from 'lucide-react';
import { useScrollVideoScrubber } from '../hooks/useScrollVideoScrubber';
import type { ScrollMilestone } from '../types';

interface HeroScrollSectionProps {
  onScrollComplete?: () => void;
  isReducedMotionExternal?: boolean;
}

const MILESTONES: ScrollMilestone[] = [
  {
    progressRange: [0.0, 0.15],
    title: '॥ चरक संहिता ॥',
    sanskrit: 'आयुर्वेदोऽमृतानाम्',
    subtext: 'The Primordial Canonical Scripture of Ayurvedic Medicine',
    chapter: 'अध्याय १ • प्रादुर्भाव',
    activeConcepts: ['Ayurveda', 'Veda', 'Charaka'],
  },
  {
    progressRange: [0.15, 0.45],
    title: '॥ त्रिदोष रहस्यम् ॥',
    sanskrit: 'वायुः पित्तं कफश्चेति त्रयो दोषाः समासततः',
    subtext: 'The Tri-Dosha Matrix: Vata, Pitta, & Kapha in Biological Harmony',
    chapter: 'सूत्रस्थानम् • श्लोक ५७',
    activeConcepts: ['Vata', 'Pitta', 'Kapha', 'Tridosha'],
  },
  {
    progressRange: [0.45, 0.75],
    title: '॥ प्रकृति एवं अग्नि ॥',
    sanskrit: 'समदोषः समाग्निश्च समधातुमलक्रियः',
    subtext: 'Individual Inborn Constitution & Sacred Metabolic Fire',
    chapter: 'शारीरस्थानम् • अध्याय ३',
    activeConcepts: ['Prakriti', 'Agni', 'Ahara', 'Dhatu'],
  },
  {
    progressRange: [0.75, 1.0],
    title: '॥ रसायन एवं स्वास्थ्यम् ॥',
    sanskrit: 'प्रसन्नात्मेन्द्रियमनाः स्वस्थ इत्यभिधीयते',
    subtext: 'Rejuvenation, Cellular Longevity, & Total Equilibrium',
    chapter: 'सिद्धिस्थानम् • उपसंहार',
    activeConcepts: ['Rasayana', 'Swastha', 'Moksha'],
  },
];

export const HeroScrollSection: React.FC<HeroScrollSectionProps> = ({
  isReducedMotionExternal = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isHoveringAssetControl, setIsHoveringAssetControl] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [videoFitMode, setVideoFitMode] = useState<'cover' | 'contain'>('contain');

  const { state, seekToManualProgress, setCustomVideoSource } = useScrollVideoScrubber(
    containerRef,
    videoRef,
    {
      videoSrc: '/hero-video.mp4',
      smoothing: 0.16,
    }
  );

  const isReducedMotion = isReducedMotionExternal || state.isReducedMotion;

  // Active milestone based on scroll progress
  const currentMilestone = useMemo(() => {
    return (
      MILESTONES.find(
        (m) => state.progress >= m.progressRange[0] && state.progress <= m.progressRange[1]
      ) || MILESTONES[0]
    );
  }, [state.progress]);

  // Handle custom video upload
  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith('video/')) {
        const objectUrl = URL.createObjectURL(file);
        setCustomVideoSource(objectUrl);
        setShowFileModal(false);
      }
    },
    [setCustomVideoSource]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith('video/')) {
        const objectUrl = URL.createObjectURL(file);
        setCustomVideoSource(objectUrl);
        setShowFileModal(false);
      }
    },
    [setCustomVideoSource]
  );

  return (
    <div
      id="hero-container"
      ref={containerRef}
      className="relative w-full bg-[#060403]"
      style={{
        // 350vh provides generous scroll distance for tactile precision
        height: isReducedMotion ? '100vh' : '380vh',
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center bg-[#070504]">
        {/* Subtle Ambient Vignette & Backing */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,rgba(10,7,5,0.7)_60%,rgba(6,4,3,0.98)_100%)] z-10" />

        {/* TOP BRAND OVERLAY: Subtle, Restrained, Non-Intrusive */}
        <div className="relative z-20 w-full pt-20 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col items-center text-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* Institute Vedic Seal Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c140d]/80 border border-[#d4af37]/30 text-[#d4af37] text-[10px] sm:text-xs tracking-[0.25em] font-cinzel uppercase mb-3 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
              <Sparkles className="w-3 h-3 text-[#ffd700]" />
              <span>Chandra Shekhar Singh Ayurved Sansthan</span>
            </div>

            {/* Subtitle */}
            <h2 className="font-cormorant text-xl sm:text-2xl md:text-3xl font-normal text-[#f3ece0] tracking-wide max-w-2xl text-shadow">
              Ancient Wisdom. Modern Healing.
            </h2>
          </motion.div>
        </div>

        {/* PRIMARY CINEMATIC VIDEO ELEMENT */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-0">
          <div className="relative w-full h-full flex items-center justify-center max-w-[1920px] max-h-[1080px] p-2 sm:p-6 md:p-10">
            <video
              ref={videoRef}
              src={state.activeSource}
              poster="/poster.jpg"
              preload="auto"
              muted
              playsInline
              className={`w-full h-full transition-transform duration-300 ${
                videoFitMode === 'cover' ? 'object-cover' : 'object-contain'
              } drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]`}
              style={{
                willChange: 'transform',
                transform: 'translateZ(0)',
              }}
            />

            {/* Reduced motion static notice if activated */}
            {isReducedMotion && (
              <div className="absolute top-24 left-6 z-30 pointer-events-auto bg-[#140e08]/90 border border-[#d4af37]/40 p-4 rounded-xl max-w-sm backdrop-blur-md">
                <p className="text-xs text-[#ffd700] font-cinzel font-semibold mb-1">
                  Reduced Motion Mode Active
                </p>
                <p className="text-[11px] text-[#cbb282] mb-3">
                  Scroll animation paused. Use the timeline slider below to scrub frames manually.
                </p>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={state.progress}
                  onChange={(e) => seekToManualProgress(parseFloat(e.target.value))}
                  className="w-full accent-[#d4af37] cursor-pointer"
                  id="slider-reduced-motion-scrub"
                />
              </div>
            )}
          </div>
        </div>

        {/* DYNAMIC SCRIPTURAL OVERLAY (SYNCHRONIZED WITH SCROLL PROGRESS) */}
        <div className="relative z-20 w-full max-w-4xl mx-auto px-4 pb-20 sm:pb-16 flex flex-col items-center text-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMilestone.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center bg-[#0d0906]/85 border border-[#d4af37]/25 px-6 py-4 sm:px-8 sm:py-5 rounded-2xl backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
            >
              {/* Chapter Tag */}
              <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#d4af37] font-mono tracking-widest uppercase mb-1">
                <span>{currentMilestone.chapter}</span>
              </div>

              {/* Sanskrit Verse */}
              <h3 className="font-sanskrit text-lg sm:text-2xl md:text-3xl font-semibold text-[#ffd700] mb-1 gold-glow leading-snug">
                {currentMilestone.title}
              </h3>

              <p className="font-cormorant italic text-xs sm:text-sm text-[#e8c374] mb-2">
                "{currentMilestone.sanskrit}"
              </p>

              {/* Subtext description */}
              <p className="text-[11px] sm:text-xs text-[#cbb282] max-w-xl">
                {currentMilestone.subtext}
              </p>

              {/* Active concepts pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                {currentMilestone.activeConcepts.map((concept) => (
                  <span
                    key={concept}
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#22180f] border border-[#d4af37]/30 text-[#e6ca65]"
                  >
                    #{concept}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM HUD: TIMELINE SCRUB BAR, FRAME COUNTER & SCROLL HINT */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#cbb282]">
          {/* Scroll Prompt (Fades as user scrolls past 5%) */}
          <div
            className={`flex items-center gap-2 transition-opacity duration-500 ${
              state.progress > 0.08 ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <div className="w-5 h-8 rounded-full border border-[#d4af37]/40 flex items-start justify-center p-1">
              <span className="w-1.5 h-2 rounded-full bg-[#ffd700] animate-bounce" />
            </div>
            <span className="text-[11px] font-cinzel tracking-wider text-[#d4af37]">
              SCROLL DOWN TO UNFOLD SCRIPTURE
            </span>
          </div>

          {/* Interactive Progress Bar */}
          <div className="w-full sm:w-80 md:w-96 flex flex-col gap-1 pointer-events-auto">
            <div className="flex justify-between items-center text-[10px] font-mono text-[#a89582]">
              <span className="text-[#ffd700]">
                FRAME {(state.currentTime * 30).toFixed(0).padStart(3, '0')} / {(state.duration * 30).toFixed(0)}
              </span>
              <span>{Math.round(state.progress * 100)}% UNROLLED</span>
            </div>
            
            {/* Fine hairline progress bar */}
            <div 
              className="h-1.5 w-full bg-[#18110a] rounded-full overflow-hidden border border-[#d4af37]/30 cursor-pointer relative"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickP = (e.clientX - rect.left) / rect.width;
                seekToManualProgress(clickP);
                if (containerRef.current) {
                  const targetScroll = containerRef.current.offsetTop + clickP * (containerRef.current.offsetHeight - window.innerHeight);
                  window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                }
              }}
              title="Click anywhere to jump to timeline point"
              id="timeline-progress-track"
            >
              <div
                className="h-full bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#f6d365] transition-all duration-75 relative shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                style={{ width: `${Math.max(2, state.progress * 100)}%` }}
              />
            </div>
          </div>

          {/* Controls: Fit toggle & Replace Video Option */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => setVideoFitMode((prev) => (prev === 'contain' ? 'cover' : 'contain'))}
              title={`Toggle Aspect Mode (${videoFitMode === 'contain' ? 'Fit Screen' : 'Fill Viewport'})`}
              className="px-2.5 py-1 rounded bg-[#161009] hover:bg-[#261b11] border border-[#d4af37]/30 text-[11px] text-[#d4af37] flex items-center gap-1 transition-colors cursor-pointer"
              id="btn-toggle-fit-mode"
            >
              <Maximize2 className="w-3 h-3" />
              <span>{videoFitMode === 'contain' ? 'Contain' : 'Cover'}</span>
            </button>

            <button
              onClick={() => setShowFileModal(true)}
              title="Upload / Replace Animation Video"
              className="px-2.5 py-1 rounded bg-[#161009] hover:bg-[#261b11] border border-[#d4af37]/30 text-[11px] text-[#ffd700] flex items-center gap-1 transition-colors cursor-pointer"
              id="btn-upload-video-asset"
            >
              <UploadCloud className="w-3 h-3" />
              <span>Video Asset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Video Asset Modal / Drawer */}
      <AnimatePresence>
        {showFileModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#120d08] border border-[#d4af37]/40 rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <h3 className="font-cinzel text-lg text-[#ffd700] font-semibold mb-2">
                Animation Video Asset Source
              </h3>
              <p className="text-xs text-[#cbb282] mb-4">
                The scroll engine is currently driving the Charak Samhita animation frame-by-frame. You can switch to any local MP4 or WebM video file.
              </p>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#d4af37]/40 hover:border-[#ffd700] rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer bg-[#1a120b]/50 hover:bg-[#1a120b] transition-all text-center mb-4"
                id="dropzone-video-upload"
              >
                <UploadCloud className="w-8 h-8 text-[#ffd700]" />
                <p className="text-xs text-[#ede4d8] font-medium">
                  Click to select video or drag & drop here
                </p>
                <p className="text-[10px] text-[#8e7a68]">
                  Supports MP4, WebM, QuickTime (H.264 / ProRes)
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setCustomVideoSource('/hero-video.mp4');
                    setShowFileModal(false);
                  }}
                  className="flex-1 py-2 px-3 rounded-lg bg-[#22180f] hover:bg-[#2f2115] border border-[#d4af37]/30 text-xs text-[#d4af37] font-mono cursor-pointer"
                  id="btn-restore-default-video"
                >
                  Reset Default Video
                </button>
                <button
                  onClick={() => setShowFileModal(false)}
                  className="py-2 px-4 rounded-lg bg-[#d4af37] text-[#0d0a06] font-semibold text-xs font-cinzel hover:bg-[#f6d365] transition-colors cursor-pointer"
                  id="btn-close-asset-modal"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
