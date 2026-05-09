import { create } from 'zustand';
import { QUEST_DATA, DLC_QUEST_DATA, ROUTES_ITEM_DATA } from '../data/questData';
import type { QuestRegion } from '../types/guide';

interface AppState {
  progress: Record<string, boolean>;
  currentRegion: QuestRegion | null;
  toggleStep: (stepId: string) => void;
  resetProgress: () => void;
  resetRegionProgress: (region: QuestRegion) => void;
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

  resetRegionProgress: (region) =>
    set((state) => {
      const stepIds = new Set(region.phases.flatMap((p) => p.steps.map((s) => s.id)));
      const next = Object.fromEntries(
        Object.entries(state.progress).filter(([id]) => !stepIds.has(id))
      );
      localStorage.setItem('er_quest_progress', JSON.stringify(next));
      return { progress: next };
    }),

  selectRegion: (id) => {
    const all = [...QUEST_DATA.regions, ...DLC_QUEST_DATA.regions, ...ROUTES_ITEM_DATA.regions];
    const region = all.find((r) => r.id === id) ?? null;
    set({ currentRegion: region });
  },

  goBack: () => set({ currentRegion: null }),
}));
