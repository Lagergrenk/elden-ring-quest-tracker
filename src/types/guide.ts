export interface QuestStep {
  id: string;
  title: string;
  description: string;
  tag: string[];
  timestamp?: number;
  mapGenieId?: number | null;
}

export interface QuestPhase {
  id: string;
  title: string;
  steps: QuestStep[];
}

export interface QuestRegion {
  id: string;
  area: string;
  part: number;
  description: string;
  youtubeUrl: string;
  phases: QuestPhase[];
}

export interface QuestData {
  regions: QuestRegion[];
}
