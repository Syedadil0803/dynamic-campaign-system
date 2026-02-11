import type { CampaignConfig } from '../types/campaign';
import { defaultConfig } from '../types/campaign';

const API_URL = '/api/config';

// Load config from R2 via the Worker API
export async function loadConfig(): Promise<CampaignConfig> {
  try {
    const response = await fetch(API_URL);

    if (response.ok) {
      const data = await response.json();
      return data as CampaignConfig;
    }

    // If no config exists yet in R2 (404), return defaults
    if (response.status === 404) {
      return { ...defaultConfig };
    }

    console.error('Failed to load config:', response.statusText);
  } catch (error) {
    console.error('Failed to load config:', error);
  }

  return { ...defaultConfig };
}

// Save config to R2 via the Worker API
export async function saveConfig(config: CampaignConfig): Promise<boolean> {
  try {
    config.lastUpdated = new Date().toISOString();

    const response = await fetch(API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config, null, 2),
    });

    if (response.ok) {
      return true;
    }

    console.error('Failed to save config:', response.statusText);
    return false;
  } catch (error) {
    console.error('Failed to save config:', error);
    return false;
  }
}
