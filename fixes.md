Codex Fixes

Urgent

1. Public write access to `/api/config` allows anyone to overwrite campaign settings.  
File: src/worker.ts  
Fix: Require authentication or restrict allowed origins; do not allow unauthenticated PUTs.

High

1. Load failures silently fall back to defaults, risking data loss.  
File: src/services/campaignService.ts  
Fix: Surface load errors and block saving until the real config loads.

2. Defaults are shallow-cloned, so edits can mutate `defaultConfig`.  
File: src/services/campaignService.ts, src/types/campaign.ts  
Fix: Use a factory like `createDefaultConfig()` or deep clone.

3. Promo card scheduling fields are not enforced.  
File: src/App.vue  
Fix: Compute an `isPromoActive` based on start/end dates and use it for rendering.

Medium

1. End-date-only schedules are ignored for announcements.  
File: src/App.vue  
Fix: Add logic for `!startDate && endDate`.

2. Date parsing uses UTC and can be off by one day.  
File: src/App.vue  
Fix: Parse `YYYY-MM-DD` as local time (e.g., append `T00:00:00`).

3. No validation when start date is after end date.  
File: src/App.vue  
Fix: Validate and warn or auto-correct.

Low

1. Duplicate keys in announcement list can break rendering.  
File: src/App.vue  
Fix: Use index or a stable ID as the Vue `:key`.

2. `lastUpdated` changes even on failed save.  
File: src/services/campaignService.ts  
Fix: Set `lastUpdated` only after a successful save response.

3. README env variables are unused in code.  
File: README.md  
Fix: Remove from docs or wire them into the app.


