export interface GradientStyle {
  type: 'solid' | 'radial';
  startColor: string;
  endColor: string;
}

export interface Announcement {
  text: string;
  url?: string;
}

export interface CampaignConfig {
  version: string;
  lastUpdated: string;
  announcementBar: {
    active: boolean;
    announcements: Announcement[];
    startDate: string;
    endDate: string;
    style: {
      background: GradientStyle;
      textColor: string;
    };
  };
  promoCard: {
    active: boolean;
    title: string;
    description: string;
    buttonText?: string;
    buttonUrl?: string;
    startDate: string;
    endDate: string;
    style: {
      position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
      background: GradientStyle;
      textColor: string;
      buttonColor: string;
      buttonTextColor: string;
    };
  };
}

export const defaultConfig: CampaignConfig = {
  version: '1.0',
  lastUpdated: new Date().toISOString(),
  announcementBar: {
    active: false,
    announcements: [
      { text: '🎉 Winter Sale is fully live! Keep shopping.' },
      { text: 'Get 5% off on orders above ₹999 and 10% off on orders above ₹1999' },
      { text: 'Win Loyalty Points & Encash discounts on each order' }
    ],
    startDate: '',
    endDate: '',
    style: {
      background: {
        type: 'solid',
        startColor: '#dc2626',
        endColor: '#dc2626',
      },
      textColor: '#ffffff',
    },
  },
  promoCard: {
    active: false,
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    style: {
      position: 'bottom-right',
      background: {
        type: 'solid',
        startColor: '#ffffff',
        endColor: '#ffffff',
      },
      textColor: '#111827',
      buttonColor: '#6366f1',
      buttonTextColor: '#ffffff',
    },
  },
};
