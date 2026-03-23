# Crowd Compass — Progress & Roadmap

## What It Is

Point your phone at any street or crowd and get a real-time **energy score** (0–100) based on ambient noise, crowd density, and time of day. A community-sourced city heatmap shows social energy across your area. Find spots by vibe — quiet cafes, lively bars, wherever the energy matches what you need.

---

## Stack

| Layer | Tech |
|---|---|
| Mobile | Expo bare SDK 55, React Native 0.83.2, TypeScript |
| Navigation | React Navigation v7 (bottom tabs + native stack) |
| State | Zustand |
| Maps | react-native-maps |
| Sensors | expo-av (microphone metering), expo-location (GPS) |
| Animations | react-native-reanimated v4 |
| Backend | FastAPI + PostgreSQL + PostGIS |
| Geospatial | geohash precision 7 (~152m cells) |
| Charts | react-native-chart-kit |
| External APIs | Google Places, OpenWeatherMap, Nominatim (geocoding) |

---

## Energy Score Formula

```
energy_score = round(
  0.60 × noise_norm      ← ambient dBFS from microphone
  0.25 × crowd_norm      ← user-selected crowd level (1–5)
  0.15 × time_prior      ← time-of-day model (weekday noon vs Friday night)
)
```

Color scale: **0–33** green "Quiet" · **34–66** yellow "Moderate" · **67–100** red "Lively"

Server computes and stores the canonical score. Mobile runs the same formula live for the animated orb.

---

## Phase Progress

### ✅ Phase 0 — Foundation
*Complete*

- GitHub repo created: https://github.com/thenukathenabadu/crowd-compass
- Expo bare SDK 55 scaffolded (`mobile/`)
- Three-tab navigation shell: **Radar / Map / Discover**
- All TypeScript types, constants, Zustand stores
- Energy score formula (client + server identical)
- FastAPI backend scaffold with all models, schemas, routers, services
- `android/gradle.properties` patched for Windows (`arm64-v8a`, `cxx` path fix)
- Monorepo structure: `mobile/` + `backend/`

---

### Phase 1 — Location + Live Noise Meter
*Not started*

**Goal:** Microphone feeds real-time dB into an animated energy orb on the Radar screen.

- `useMicrophone.ts` — expo-av recording with `isMeteringEnabled: true`, 200ms polling
- `useLocation.ts` — foreground GPS watch + Nominatim reverse geocode (suburb/city label)
- `EnergyOrb` component — Reanimated 3 animated circle, pulsing ring, color interpolation
- `DbMeter` component — horizontal bar showing live dBFS
- RadarScreen wired with live orb

**Verify:** Open RadarScreen → orb pulses, dB number changes with real ambient noise.

---

### Phase 2 — Reading Submission Flow
*Not started*

**Goal:** User selects crowd level and submits a reading (mock storage, no backend yet).

- `CrowdPicker` — 5 person icons, tap to select crowd level 1–5
- `SubmitButton` — Reanimated press feedback + loading spinner
- `readingStore.submitReading` — mock 1s delay, local array storage
- Success toast + "Last submitted X ago" label (date-fns)

**Verify:** Select crowd level 3 → tap Submit → toast appears → session counter increments.

---

### Phase 3 — FastAPI Backend
*Not started*

**Goal:** Real PostgreSQL + PostGIS backend receives and stores readings, feeds heatmap.

- PostgreSQL + PostGIS setup, alembic migration
- `POST /readings` — server-side energy score → store → upsert geohash heatmap cell
- `GET /readings/nearby` — ST_DWithin PostGIS spatial query
- `GET /heatmap` — bbox viewport query on heatmap_cells
- Mobile `readingStore.submitReading` updated to hit real API
- Tests: POST reading → verify DB row; GET nearby → verify spatial filter

**Verify:** Submit from phone → `GET /readings/nearby?lat=...` returns the row.

---

### Phase 4 — Heatmap Map Screen
*Not started*

**Goal:** MapScreen shows a live color-coded overlay of community energy readings.

- `useHeatmap.ts` — debounced viewport bbox → GET /heatmap → mapStore, auto-refresh 60s
- `HeatmapLayer` — MapView Circle overlays (r=150m), energy-based color at 55% opacity
- MapScreen — full-screen map, HeatmapLayer, refresh button, bottom sheet on cell tap
- Google Maps API key wired into `app.json`

**Verify:** MapScreen → colored circles appear over locations with readings; viewport pan fetches new cells.

---

### Phase 5 — Discover + Google Places
*Not started*

**Goal:** Discover tab lists nearby venues ranked by vibe, powered by Google Places.

- Backend `places_enricher.py` — Google Places Nearby Search → upsert venues
- `GET /places/nearby` — ST_DWithin + geohash energy join + vibe filter
- `POST /places/enrich` — BackgroundTasks (seeds area on first Discover open)
- `PlaceCard`, `VibeFilterBar`, `DiscoverScreen` with pull-to-refresh

**Verify:** Discover tab → venue list appears; filter to "Quiet" → only green-scored venues shown.

---

### Phase 6 — Place Detail
*Not started*

**Goal:** Per-venue energy history, best visit times, recent community readings.

- Backend `GET /places/{place_id}` — hourly_history (last 24h), weekly_pattern (current dow), recent_readings, weather
- `EnergyChart` — LineChart 24h hourly averages
- `BestTimesBars` — BarChart typical energy for current day of week
- PlaceDetailScreen assembled

**Verify:** Tap a venue → energy chart and best-times bars render correctly.

---

### Phase 7 — Polish
*Not started*

**Goal:** Animations, onboarding, theming, app icon, release build.

- Onboarding — 3-screen swiper gated by AsyncStorage (shows on fresh install only)
- App icon + splash — 1024×1024 design, sharp asset generation
- Smooth orb color transitions — Reanimated `withTiming` interpolation
- Dark mode support — `useColorScheme()` throughout
- Error states — network failure banner, GPS unavailable state
- Performance — memoize HeatmapLayer circles, ETag-based heatmap refresh
- Android release APK build

**Verify:** Fresh install → onboarding → main app; orb animates smoothly on score changes.

---

## Future Ideas (Post-MVP)

### v1.1 — Social Layer
- User accounts (anonymous or named)
- Leaderboard: who submitted the most readings this week
- "Trending Now" section on Discover — places with rapidly rising energy scores
- Push notifications: "Your usual spot just got quiet — good time to go"

### v1.2 — Prediction Engine
- ML model trained on historical readings to predict energy at any location + time
- "Best time to visit" powered by real data, not just time-of-day priors
- "Quiet window" alerts: notify when energy at a saved place drops below a threshold

### v1.3 — Venue Intelligence
- Integration with Google Popular Times for baseline comparison
- "vs usual" indicator — is it busier or quieter than typical right now?
- Venue-specific noise thresholds (library vs bar have different "quiet" baselines)

### v1.4 — Routes
- "Quiet route" mode — navigate from A to B avoiding high-energy areas
- Powered by energy heatmap overlaid on OpenStreetMap routing
- Good for: cyclists wanting calm streets, people with sensory sensitivities

### v1.5 — Events Layer
- Community-posted events that explain energy spikes
- "Why is it busy?" — link readings to local events (game, concert, market)
- Integration with Eventbrite / Meetup APIs

### v2.0 — Platform
- Web dashboard for city-level energy analytics
- Public API for researchers and city planners
- Export heatmap data as GeoJSON
- iOS release (needs Apple Dev account + EAS Build)

---

## Running Locally

### Mobile
```bash
cd mobile
npm run android      # requires Android device or emulator
```

### Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env  # fill in API keys + DB URL
python run.py         # starts on http://localhost:8000
```

> Backend requires PostgreSQL with PostGIS extension. Run DB setup before first start.

---

## Environment Variables

### Mobile — `mobile/src/constants/config.ts`
| Variable | Description |
|---|---|
| `API_BASE_URL` | Backend URL (`http://10.0.2.2:8000` for Android emulator) |
| `GOOGLE_PLACES_API_KEY` | Google Places Nearby Search (Phase 5+) |
| `OPENWEATHER_API_KEY` | Current weather context (Phase 6+) |

### Backend — `backend/.env`
| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL async URL |
| `GOOGLE_PLACES_API_KEY` | Google Places Nearby Search |
| `OPENWEATHER_API_KEY` | OpenWeatherMap current conditions |
| `ADMIN_TOKEN` | Static token for admin endpoints |
