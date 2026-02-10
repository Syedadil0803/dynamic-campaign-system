import type { CampaignConfig } from '../types/campaign';
import { defaultConfig } from '../types/campaign';

const STORAGE_KEY = 'campaign_config';

export function loadConfig(): CampaignConfig {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load config:', error);
  }
  return { ...defaultConfig };
}

export function saveConfig(config: CampaignConfig): boolean {
  try {
    config.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config, null, 2));
    return true;
  } catch (error) {
    console.error('Failed to save config:', error);
    return false;
  }
}
