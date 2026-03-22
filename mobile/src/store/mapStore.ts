import { create } from 'zustand';
import { HeatmapCell, Place, VibeFilter, BBox } from '../types';

interface MapState {
  heatmapCells: HeatmapCell[];
  selectedCell: HeatmapCell | null;
  nearbyPlaces: Place[];
  vibeFilter: VibeFilter[];
  radiusKm: number;
  lastRefreshed: Date | null;
  setHeatmapCells: (cells: HeatmapCell[]) => void;
  setSelectedCell: (cell: HeatmapCell | null) => void;
  setNearbyPlaces: (places: Place[]) => void;
  setVibeFilter: (vibes: VibeFilter[]) => void;
  setRadiusKm: (km: number) => void;
  setLastRefreshed: (date: Date) => void;
}

export const useMapStore = create<MapState>((set) => ({
  heatmapCells: [],
  selectedCell: null,
  nearbyPlaces: [],
  vibeFilter: ['quiet', 'moderate', 'lively'],
  radiusKm: 2,
  lastRefreshed: null,
  setHeatmapCells: (cells) => set({ heatmapCells: cells }),
  setSelectedCell: (cell) => set({ selectedCell: cell }),
  setNearbyPlaces: (places) => set({ nearbyPlaces: places }),
  setVibeFilter: (vibes) => set({ vibeFilter: vibes }),
  setRadiusKm: (km) => set({ radiusKm: km }),
  setLastRefreshed: (date) => set({ lastRefreshed: date }),
}));
