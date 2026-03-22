import { create } from 'zustand';

interface EnergyState {
  isRecording: boolean;
  currentDbfs: number;
  energyScore: number;
  setRecording: (val: boolean) => void;
  setDbfs: (dbfs: number) => void;
  setEnergyScore: (score: number) => void;
}

export const useEnergyStore = create<EnergyState>((set) => ({
  isRecording: false,
  currentDbfs: -90,
  energyScore: 0,
  setRecording: (val) => set({ isRecording: val }),
  setDbfs: (dbfs) => set({ currentDbfs: dbfs }),
  setEnergyScore: (score) => set({ energyScore: score }),
}));
