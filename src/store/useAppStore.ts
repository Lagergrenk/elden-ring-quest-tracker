import { create } from 'zustand';
import type { QuestRegion } from '../types/guide';

const PROGRESS_STORAGE_KEY = 'er_quest_progress';

interface AppState {
  progress: Record<string, boolean>;
  currentRegionId: string | null;
  toggleStep: (stepId: string) => void;
  toggleSteps: (stepIds: string[]) => void;
  resetProgress: () => void;
  resetRegionProgress: (region: QuestRegion) => void;
  selectRegion: (id: string) => void;
  goBack: () => void;
}

function loadProgress(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(PROGRESS_STORAGE_KEY) ?? '{}'); }
  catch { return {}; }
}

export const useAppStore = create<AppState>((set) => ({
  progress: loadProgress(),
  currentRegionId: null,

  toggleStep: (stepId) =>
    set((state) => {
      const next = { ...state.progress };
      if (next[stepId]) delete next[stepId];
      else next[stepId] = true;
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(next));
      return { progress: next };
    }),

  toggleSteps: (stepIds) =>
    set((state) => {
      const next = { ...state.progress };
      const allDone = stepIds.every((id) => next[id]);
      if (allDone) stepIds.forEach((id) => delete next[id]);
      else stepIds.forEach((id) => { next[id] = true; });
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(next));
      return { progress: next };
    }),

  resetProgress: () => {
    localStorage.removeItem(PROGRESS_STORAGE_KEY);
    set({ progress: {} });
  },

  resetRegionProgress: (region) =>
    set((state) => {
      const stepIds = new Set(region.phases.flatMap((p) => p.steps.map((s) => s.id)));
      const next = Object.fromEntries(
        Object.entries(state.progress).filter(([id]) => !stepIds.has(id))
      );
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(next));
      return { progress: next };
    }),

  selectRegion: (id) => set({ currentRegionId: id }),

  goBack: () => set({ currentRegionId: null }),
}));
