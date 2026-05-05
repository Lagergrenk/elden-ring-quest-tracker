import { create } from 'zustand';
import { QUEST_DATA, DLC_QUEST_DATA } from '../data/questData';
import type { QuestRegion } from '../types/guide';

interface AppState {
  progress: Record<string, boolean>;
  currentRegion: QuestRegion | null;
  toggleStep: (stepId: string) => void;
  resetProgress: () => void;
  selectRegion: (id: string) => void;
  goBack: () => void;
}

function loadProgress(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem('er_quest_progress') ?? '{}'); }
  catch { return {}; }
}

export const useAppStore = create<AppState>((set) => ({
  progress: loadProgress(),
  currentRegion: null,

  toggleStep: (stepId) =>
    set((state) => {
      const next = { ...state.progress };
      if (next[stepId]) delete next[stepId];
      else next[stepId] = true;
      localStorage.setItem('er_quest_progress', JSON.stringify(next));
      return { progress: next };
    }),

  resetProgress: () => {
    localStorage.removeItem('er_quest_progress');
    set({ progress: {} });
  },

  selectRegion: (id) => {
    const all = [...QUEST_DATA.regions, ...DLC_QUEST_DATA.regions];
    const region = all.find((r) => r.id === id) ?? null;
    set({ currentRegion: region });
  },

  goBack: () => set({ currentRegion: null }),
}));
