export interface GradientStyle {
  type: 'solid' | 'linear' | 'radial';
  startColor: string;
  endColor: string;
  direction?: string; // for linear gradients: 'to right', 'to bottom', etc.
  midpoint?: number; // 0-100, controls where colors meet (default 50)
}

export interface Announcement {
  text: string;
  url?: string;
  richText?: boolean;
}

export interface PromoCard {
  active: boolean;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  startDate: string;
  endDate: string;
  showTimer: boolean;
  timerText?: string;
  style: {
    position: 'bottom-right' | 'bottom-left';
    background: GradientStyle;
    textColor: string;
    buttonColor: string;
    buttonTextColor: string;
    titleStyle: {
      background: GradientStyle;
      textColor: string;
      textAlign?: 'left' | 'center' | 'right';
    };
    subheadingStyle: {
      background: GradientStyle;
      textColor: string;
      textAlign?: 'left' | 'center' | 'right';
    };
    descriptionStyle: {
      background: GradientStyle;
      textColor: string;
    };
    dateStyle: {
      background: GradientStyle;
      textColor: string;
      textAlign?: 'left' | 'center' | 'right';
    };
  };
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
  promoCard: PromoCard;
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
        type: 'linear',
        startColor: '#dc2626',
        endColor: '#dc2626',
        direction: 'to right',
        midpoint: 50,
      },
      textColor: '#ffffff',
    },
  },
  promoCard: {
    active: false,
    title: '',
    subtitle: '',
    description: '',
    buttonText: 'Shop Now',
    buttonUrl: '',
    startDate: '',
    endDate: '',
    showTimer: true,
    timerText: 'Ends in hh:mm:ss',
    style: {
      position: 'bottom-right',
      background: {
        type: 'linear',
        startColor: '#ffffff',
        endColor: '#ffffff',
        direction: 'to right',
        midpoint: 50,
      },
      textColor: '#111827',
      buttonColor: '#6366f1',
      buttonTextColor: '#ffffff',
      titleStyle: {
        background: {
          type: 'solid',
          startColor: '#111827',
          endColor: '#111827',
          midpoint: 50,
        },
        textColor: '#ffffff',
        textAlign: 'center',
      },
      subheadingStyle: {
        background: {
          type: 'solid',
          startColor: '#374151',
          endColor: '#374151',
          midpoint: 50,
        },
        textColor: '#ffffff',
        textAlign: 'center',
      },
      descriptionStyle: {
        background: {
          type: 'solid',
          startColor: '#374151',
          endColor: '#374151',
          midpoint: 50,
        },
        textColor: '#ffffff',
      },
      dateStyle: {
        background: {
          type: 'solid',
          startColor: '#6b7280',
          endColor: '#6b7280',
          midpoint: 50,
        },
        textColor: '#ffffff',
        textAlign: 'center',
      },
    },
  },
};
