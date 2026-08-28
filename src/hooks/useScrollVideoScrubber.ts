import { useEffect, useRef, useState, useCallback, type RefObject } from 'react';
import type { VideoScrubberState } from '../types';

interface UseScrollVideoScrubberOptions {
  videoSrc?: string;
  smoothing?: number; // Lerp factor (0.1 to 0.3)
  onProgressChange?: (progress: number) => void;
}

export function useScrollVideoScrubber(
  containerRef: RefObject<HTMLElement | null>,
  videoRef: RefObject<HTMLVideoElement | null>,
  options: UseScrollVideoScrubberOptions = {}
) {
  const { videoSrc = '/hero-video.mp4', smoothing = 0.16 } = options;

  const [state, setState] = useState<VideoScrubberState>({
    progress: 0,
    currentTime: 0,
    duration: 0,
    isReady: false,
    isLoading: true,
    isPinned: false,
    isReducedMotion: false,
    activeSource: videoSrc,
    videoWidth: 0,
    videoHeight: 0,
  });

  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const targetTimeRef = useRef<number>(0);
  const renderedTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const isSeekingRef = useRef<boolean>(false);
  const durationRef = useRef<number>(0);

  // Check reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setState((prev) => ({ ...prev, isReducedMotion: mediaQuery.matches }));

    const handler = (e: MediaQueryListEvent) => {
      setState((prev) => ({ ...prev, isReducedMotion: e.matches }));
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Update video source if changed
  const setCustomVideoSource = useCallback((newSrc: string) => {
    setState((prev) => ({
      ...prev,
      activeSource: newSrc,
      isLoading: true,
      isReady: false,
    }));
    targetProgressRef.current = 0;
    currentProgressRef.current = 0;
    targetTimeRef.current = 0;
    renderedTimeRef.current = 0;
  }, []);

  // Video loaded metadata handler
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;

    const handleLoadedMetadata = () => {
      const dur = video.duration || 6;
      durationRef.current = dur;
      setState((prev) => ({
        ...prev,
        duration: dur,
        isReady: true,
        isLoading: false,
        videoWidth: video.videoWidth || 1280,
        videoHeight: video.videoHeight || 720,
      }));
      video.pause();
      video.currentTime = 0;
    };

    const handleCanPlay = () => {
      setState((prev) => ({ ...prev, isLoading: false, isReady: true }));
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
    };

    const handleError = () => {
      // If hero-video.mp4 fails, fallback to charak-samhita.mp4
      if (state.activeSource === '/hero-video.mp4') {
        setCustomVideoSource('/charak-samhita.mp4');
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('error', handleError);

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('error', handleError);
    };
  }, [state.activeSource, videoRef, setCustomVideoSource]);

  // Scroll listener: Computes normalized target progress (0.0 to 1.0)
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight || 1;
      const totalScrollableDistance = rect.height - windowHeight;

      if (totalScrollableDistance <= 0) {
        targetProgressRef.current = 0;
        return;
      }

      // Progress calculation relative to sticky section
      const scrolled = -rect.top;
      const rawProgress = scrolled / totalScrollableDistance;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      targetProgressRef.current = clampedProgress;

      const dur = durationRef.current || 6;
      targetTimeRef.current = clampedProgress * dur;

      const isCurrentlyPinned = rect.top <= 0 && rect.bottom >= windowHeight;
      setState((prev) => {
        if (prev.isPinned !== isCurrentlyPinned) {
          return { ...prev, isPinned: isCurrentlyPinned };
        }
        return prev;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [containerRef]);

  // Smooth rAF render loop
  useEffect(() => {
    let lastReportedProgress = -1;

    const tick = () => {
      const video = videoRef.current;
      const targetP = targetProgressRef.current;
      const targetT = targetTimeRef.current;

      // Linear interpolation for silky smoothness
      currentProgressRef.current += (targetP - currentProgressRef.current) * smoothing;
      renderedTimeRef.current += (targetT - renderedTimeRef.current) * smoothing;

      // Clamp close values to prevent infinite micro-adjustments
      if (Math.abs(targetP - currentProgressRef.current) < 0.0001) {
        currentProgressRef.current = targetP;
      }
      if (Math.abs(targetT - renderedTimeRef.current) < 0.001) {
        renderedTimeRef.current = targetT;
      }

      const curP = currentProgressRef.current;
      const curT = renderedTimeRef.current;

      // Update state for UI elements (throttled to meaningful changes)
      if (Math.abs(curP - lastReportedProgress) > 0.002) {
        lastReportedProgress = curP;
        setState((prev) => ({
          ...prev,
          progress: curP,
          currentTime: curT,
        }));
      }

      // Update video element's currentTime directly during rAF
      if (video && durationRef.current > 0 && !state.isReducedMotion) {
        const timeDiff = Math.abs(video.currentTime - curT);
        if (timeDiff > 0.02 && !video.seeking) {
          // If browser supports fastSeek and diff is larger, use it, else set currentTime
          if ('fastSeek' in video && typeof (video as HTMLVideoElement & { fastSeek?: (t: number) => void }).fastSeek === 'function') {
            try {
              (video as HTMLVideoElement & { fastSeek: (t: number) => void }).fastSeek(curT);
            } catch {
              video.currentTime = curT;
            }
          } else {
            video.currentTime = curT;
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [videoRef, smoothing, state.isReducedMotion]);

  const seekToManualProgress = useCallback(
    (manualProgress: number) => {
      const clamped = Math.max(0, Math.min(1, manualProgress));
      targetProgressRef.current = clamped;
      const dur = durationRef.current || 6;
      targetTimeRef.current = clamped * dur;
    },
    []
  );

  return {
    state,
    seekToManualProgress,
    setCustomVideoSource,
  };
}
