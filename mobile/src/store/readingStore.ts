import { create } from 'zustand';
import { Reading } from '../types';

interface ReadingState {
  crowdLevel: number;
  lastSubmission: Date | null;
  sessionReadingCount: number;
  pendingUpload: boolean;
  submitted: Reading[];
  setCrowdLevel: (level: number) => void;
  // submitReading wired to real API in Phase 3; mock in Phase 2
  submitReading: (lat: number, lng: number, dbfs: number, energyScore: number) => Promise<void>;
}

export const useReadingStore = create<ReadingState>((set, get) => ({
  crowdLevel: 3,
  lastSubmission: null,
  sessionReadingCount: 0,
  pendingUpload: false,
  submitted: [],

  setCrowdLevel: (level) => set({ crowdLevel: level }),

  submitReading: async (lat, lng, dbfs, energyScore) => {
    set({ pendingUpload: true });
    // Phase 2: mock — simulate a 1s network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockReading: Reading = {
      id: `local-${Date.now()}`,
      lat,
      lng,
      noise_db: dbfs,
      crowd_level: get().crowdLevel,
      energy_score: energyScore,
      geohash: '',
      timestamp: new Date().toISOString(),
    };

    set((state) => ({
      pendingUpload: false,
      lastSubmission: new Date(),
      sessionReadingCount: state.sessionReadingCount + 1,
      submitted: [mockReading, ...state.submitted],
    }));
  },
}));
