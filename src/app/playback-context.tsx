import { createContext } from "react";

export interface Song {
  id: number;
  name: string;
  author: string;
  duration: number;
}

interface PlaybackContextState {
  isPlaying: boolean;
  progress: number;
  isShuffled: boolean;
  isRepeat: boolean;
  queue: Song[] | null;
  currentSongIndex: number | null;
  shuffleOrder: number[] | null;
  shufflePosition: number;
  currentSong: Song | null;
  togglePlayback: () => void;
  seekTo: (newProgress: number) => void;
  handleNext: () => void;
  handleBack: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  // Dummy
  dummy: number;
  setDummy: (dummy: number) => void;
}

export const PlaybackContext = createContext<PlaybackContextState>({
  isPlaying: false,
  progress: 0,
  isShuffled: false,
  isRepeat: false,
  queue: null,
  currentSongIndex: null,
  currentSong: null,
  shuffleOrder: null,
  shufflePosition: 0,
  togglePlayback: () => {},
  seekTo: () => {},
  handleNext: () => {},
  handleBack: () => {},
  toggleShuffle: () => {},
  toggleRepeat: () => {},
  // Dummy
  dummy: 1,
  setDummy: () => {},
});