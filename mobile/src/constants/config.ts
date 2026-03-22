// Android emulator → host machine: use 10.0.2.2
// Physical device on same Wi-Fi: use your machine's local IP
export const API_BASE_URL = 'http://10.0.2.2:8000';

export const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';

// Replace with your actual keys before running Phase 4+
export const GOOGLE_PLACES_API_KEY = 'YOUR_GOOGLE_PLACES_API_KEY';
export const OPENWEATHER_API_KEY = 'YOUR_OPENWEATHER_API_KEY';

// Metering config
export const METER_INTERVAL_MS = 200;
export const DB_FLOOR = -90;   // dBFS silence floor
export const DB_CEILING = -20; // dBFS loud threshold

// Geohash precision — precision 7 gives ~152m × 152m cells
export const GEOHASH_PRECISION = 7;

// Heatmap
export const HEATMAP_CELL_RADIUS_M = 150;
export const HEATMAP_REFRESH_INTERVAL_MS = 60_000;
