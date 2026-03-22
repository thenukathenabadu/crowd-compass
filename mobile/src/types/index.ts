import { VibeKey } from '../constants/energy';

export type { VibeKey };

export interface Reading {
  id: string;
  lat: number;
  lng: number;
  noise_db: number;
  crowd_level: number;   // 1–5
  energy_score: number;  // 0–100
  geohash: string;
  session_id?: string;
  timestamp: string;     // ISO
}

export interface HeatmapCell {
  geohash: string;
  lat: number;
  lng: number;
  avg_energy: number;
  reading_count: number;
  last_updated: string;  // ISO
}

export interface Place {
  place_id: string;
  name: string;
  lat: number;
  lng: number;
  category?: string;
  google_place_id?: string;
  distance_m?: number;
  energy_score?: number;
  vibe_label?: VibeKey;
  last_reading_at?: string;
}

export interface PlaceDetail extends Place {
  current_energy: number;
  hourly_history: { hour: number; avg_energy: number }[];
  weekly_pattern: { hour: number; avg_energy: number }[];
  recent_readings: Reading[];
  weather?: { condition: string; temp_c: number } | null;
}

export interface BBox {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

export type VibeFilter = VibeKey | 'all';
