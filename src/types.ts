export interface AyurvedicPrinciple {
  id: string;
  name: string;
  sanskrit: string;
  meaning: string;
  doshaCategory?: string;
  description: string;
  element: string;
  iconName: string;
}

export interface ScrollMilestone {
  progressRange: [number, number];
  title: string;
  sanskrit: string;
  subtext: string;
  chapter: string;
  activeConcepts: string[];
}

export interface VideoScrubberState {
  progress: number; // 0 to 1
  currentTime: number;
  duration: number;
  isReady: boolean;
  isLoading: boolean;
  isPinned: boolean;
  isReducedMotion: boolean;
  activeSource: string;
  videoWidth: number;
  videoHeight: number;
}
