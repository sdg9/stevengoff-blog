export interface ColorPalette {
  name: string;
  description: string;
  light: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    primaryForeground: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    destructive: string;
    destructiveForeground: string;
    success: string;
    successForeground: string;
    warning: string;
    warningForeground: string;
  };
  dark: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    primaryForeground: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    destructive: string;
    destructiveForeground: string;
    success: string;
    successForeground: string;
    warning: string;
    warningForeground: string;
  };
}

const lightDefaults = {
  background: '#ffffff',
  foreground: '#0f172a',
  primaryForeground: '#ffffff',
  secondaryForeground: '#ffffff',
  muted: '#f1f5f9',
  mutedForeground: '#64748b',
  border: '#e2e8f0',
  destructive: '#ef4444',
  destructiveForeground: '#ffffff',
  success: '#10b981',
  successForeground: '#ffffff',
  warning: '#f59e0b',
  warningForeground: '#ffffff',
};
const darkDefaults = {
  background: '#0f172a',
  foreground: 'rgb(247 248 248)',
  primaryForeground: '#211717',
  secondaryForeground: '#5c3939',
  muted: '#1e293b',
  mutedForeground: '#94a3b8',
  border: '#334155',
  destructive: '#ef4444',
  destructiveForeground: '#ffffff',
  success: '#10b981',
  successForeground: '#ffffff',
  warning: '#f59e0b',
  warningForeground: '#ffffff',
};

export const colorPalettes: Record<string, ColorPalette> = {
  test: {
    name: 'a',
    description: 'b',
    light: {
      ...lightDefaults,
      primary: '#6e4e00',
      secondary: '#3e4300',
      accent: '#725410',
      muted: '#ffffff',
      destructive: '#8e0c0c',
      success: '#086144',
      warning: '#634004',
    },
    dark: {
      ...darkDefaults,
      primary: '#f4b400',
      secondary: '#9aa000',
      accent: '#e6b646',
      foreground: '#f8fafc',
      primaryForeground: '#0f172a',
      muted: '#030508',
    },
  },

  default: {
    name: 'Default',
    description: 'The original blue and purple palette',
    light: {
      ...lightDefaults,
      primary: '#818cf9',
      secondary: '#2f3848',
      accent: '#f14444',
    },
    dark: {
      ...darkDefaults,
      primary: 'rgb(1 97 239)',
      secondary: 'rgb(1 84 207)',
      accent: 'rgb(109 40 217)',
    },
  },

  ocean: {
    name: 'Ocean',
    description: 'Calming blues and teals inspired by the ocean',
    light: {
      ...lightDefaults,
      primary: '#0891b2',
      secondary: '#164e63',
      accent: '#06b6d4',
      muted: '#f0f9ff',
      mutedForeground: '#475569',
      border: '#e0f2fe',
    },
    dark: {
      ...darkDefaults,
      primary: '#0ea5e9',
      secondary: '#0c4a6e',
      accent: '#22d3ee',
      background: '#0c1821',
      foreground: '#f8fafc',
      primaryForeground: '#0c1821',
    },
  },

  forest: {
    name: 'Forest',
    description: 'Natural greens and earth tones',
    light: {
      ...lightDefaults,
      primary: '#16a34a',
      secondary: '#365314',
      accent: '#84cc16',
      foreground: '#1a1a1a',
      muted: '#f7fee7',
      mutedForeground: '#525252',
      border: '#e4e4e7',
      success: '#22c55e',
      warning: '#ea580c',
    },
    dark: {
      ...darkDefaults,
      primary: '#22c55e',
      secondary: '#15803d',
      accent: '#a3e635',
      background: '#0a0a0a',
      foreground: '#fafafa',
      primaryForeground: '#0a0a0a',
      muted: '#262626',
      mutedForeground: '#a3a3a3',
      border: '#404040',
      success: '#22c55e',
      warning: '#ea580c',
    },
  },

  sunset: {
    name: 'Sunset',
    description: 'Warm oranges and reds like a beautiful sunset',
    light: {
      ...lightDefaults,
      primary: '#ea580c',
      secondary: '#7c2d12',
      accent: '#f97316',
      foreground: '#1a1a1a',
      muted: '#fff7ed',
      mutedForeground: '#525252',
      border: '#fed7aa',
      success: '#16a34a',
      warning: '#eab308',
    },
    dark: {
      ...darkDefaults,
      primary: '#f97316',
      secondary: '#ea580c',
      accent: '#fb923c',
      background: '#1a0b08',
      foreground: '#fafafa',
      primaryForeground: '#1a0b08',
      muted: '#292524',
      mutedForeground: '#a8a29e',
      border: '#44403c',
      success: '#16a34a',
      warning: '#eab308',
    },
  },

  midnight: {
    name: 'Midnight',
    description: 'Deep purples and blues for a sophisticated look',
    light: {
      ...lightDefaults,
      primary: '#7c3aed',
      secondary: '#3730a3',
      accent: '#a855f7',
      foreground: '#1e1b4b',
      muted: '#faf5ff',
      border: '#e9d5ff',
    },
    dark: {
      ...darkDefaults,
      primary: '#a855f7',
      secondary: '#7c3aed',
      accent: '#c084fc',
      background: '#0f0a1a',
      primaryForeground: '#0f0a1a',
      muted: '#1e1b4b',
      border: '#3730a3',
    },
  },

  rose: {
    name: 'Rose',
    description: 'Elegant pinks and roses for a feminine touch',
    light: {
      ...lightDefaults,
      primary: '#e11d48',
      secondary: '#881337',
      accent: '#f43f5e',
      foreground: '#1f1f1f',
      muted: '#fdf2f8',
      border: '#fce7f3',
    },
    dark: {
      ...darkDefaults,
      primary: '#f43f5e',
      secondary: '#be185d',
      accent: '#fb7185',
      background: '#1a0614',
      primaryForeground: '#1a0614',
      muted: '#2d1b2e',
      mutedForeground: '#a8a29e',
      border: '#44403c',
    },
  },

  monochrome: {
    name: 'Monochrome',
    description: 'Clean blacks, whites, and grays for a minimalist approach',
    light: {
      ...lightDefaults,
      primary: '#374151',
      secondary: '#1f2937',
      accent: '#6b7280',
      foreground: '#111827',
      muted: '#f9fafb',
      mutedForeground: '#6b7280',
      border: '#e5e7eb',
    },
    dark: {
      ...darkDefaults,
      primary: '#d1d5db',
      secondary: '#9ca3af',
      accent: '#6b7280',
      background: '#111827',
      foreground: '#f9fafb',
      primaryForeground: '#111827',
      secondaryForeground: '#111827',
      muted: '#1f2937',
      mutedForeground: '#9ca3af',
      border: '#374151',
    },
  },
};

export function generatePaletteCSS(palette: ColorPalette): string {
  return `
  :root {
    /* 5-color palette system - Core semantic tokens */
    --color-primary: ${palette.light.primary}; /* Primary brand color */
    --color-secondary: ${palette.light.secondary}; /* Secondary/supporting color */
    --color-accent: ${palette.light.accent}; /* Accent for highlights, CTAs */
    --color-background: ${palette.light.background}; /* Background color */
    --color-foreground: ${palette.light.foreground}; /* Foreground text color */

    /* Extended semantic tokens (derived from base 5) */
    --color-primary-foreground: ${palette.light.primaryForeground};
    --color-secondary-foreground: ${palette.light.secondaryForeground};
    --color-muted: ${palette.light.muted}; /* Subtle backgrounds, borders */
    --color-muted-foreground: ${palette.light.mutedForeground};
    --color-border: ${palette.light.border};

    /* System colors */
    --color-destructive: ${palette.light.destructive}; /* Error states */
    --color-destructive-foreground: ${palette.light.destructiveForeground};
    --color-success: ${palette.light.success}; /* Success states */
    --color-success-foreground: ${palette.light.successForeground};
    --color-warning: ${palette.light.warning}; /* Warning states */
    --color-warning-foreground: ${palette.light.warningForeground};

    /* Text colors */
    --color-text-heading: var(--color-foreground);
    --color-text-default: var(--color-foreground);
    --color-text-muted: var(--color-muted-foreground);

    /* Page colors */
    --color-bg-page: var(--color-background);
    --color-bg-page-dark: rgb(3 6 32);

    /* Simplified gradients */
    --gradient-hero: linear-gradient(
      135deg,
      var(--color-foreground) 0%,
      var(--color-primary) 25%,
      var(--color-secondary) 50%,
      var(--color-accent) 100%
    );

    --gradient-cta: linear-gradient(135deg, var(--color-accent), var(--color-primary));

    --gradient-subtle: linear-gradient(135deg, var(--color-muted), var(--color-primary));

    ::selection {
      background-color: color-mix(in srgb, var(--color-primary) 30%, transparent);
      color: var(--color-foreground);
    }
  }

  .dark {
    /* Dark mode adjustments to 5-color palette */
    --color-primary: ${palette.dark.primary}; /* Keep primary consistent for brand */
    --color-secondary: ${palette.dark.secondary};
    --color-accent: ${palette.dark.accent};
    --color-background: ${palette.dark.background};
    --color-foreground: ${palette.dark.foreground};

    --color-primary-foreground: ${palette.dark.primaryForeground};
    --color-secondary-foreground: ${palette.dark.secondaryForeground};
    --color-muted: ${palette.dark.muted};
    --color-muted-foreground: ${palette.dark.mutedForeground};
    --color-border: ${palette.dark.border};

    --color-text-heading: var(--color-foreground);
    --color-text-default: var(--color-foreground);
    --color-text-muted: var(--color-muted-foreground);

    /* Page colors */
    --color-bg-page: var(--color-background);
    --color-bg-page-dark: rgb(3 6 32);

    ::selection {
      background-color: color-mix(in srgb, var(--color-primary) 30%, transparent);
      color: var(--color-foreground);
    }
  }`;
}
