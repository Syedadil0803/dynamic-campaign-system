export interface CampaignConfig {
  version: string;
  lastUpdated: string;
  announcementBar: {
    active: boolean;
    announcements: string[];
    startDate: string;
    endDate: string;
    style: {
      backgroundColor: string;
      textColor: string;
    };
  };
  promoCard: {
    active: boolean;
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
    imageUrl: string;
    startDate: string;
    endDate: string;
    style: {
      position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
      backgroundColor: string;
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
      '🎉 Winter Sale is fully live! Keep shopping.',
      'Get 5% off on orders above ₹999 and 10% off on orders above ₹1999',
      'Win Loyalty Points & Encash discounts on each order'
    ],
    startDate: '',
    endDate: '',
    style: {
      backgroundColor: '#dc2626',
      textColor: '#ffffff',
    },
  },
  promoCard: {
    active: false,
    title: '',
    description: '',
    buttonText: 'Get Started',
    buttonUrl: '',
    imageUrl: '',
    startDate: '',
    endDate: '',
    style: {
      position: 'bottom-right',
      backgroundColor: '#ffffff',
      textColor: '#111827',
      buttonColor: '#6366f1',
      buttonTextColor: '#ffffff',
    },
  },
};
