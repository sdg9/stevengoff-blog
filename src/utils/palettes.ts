/**
 * Represents a complete color palette configuration for both light and dark themes.
 * This interface defines all the semantic color tokens used throughout the application
 * to ensure consistent theming and accessibility across different UI states.
 *
 * @interface ColorPalette
 *
 * @property {string} name - The display name of the color palette (e.g., "Ocean Blue", "Forest Green")
 * @property {string} description - A brief description of the palette's visual characteristics and intended use
 *
 * @property {object} light - Color definitions for light theme mode
 * @property {string} light.primary - Main brand color used for primary buttons, links, and key interactive elements
 * @property {string} light.secondary - Secondary brand color used for less prominent interactive elements and accents
 * @property {string} light.accent - Highlight color used for emphasis, hover states, and decorative elements
 * @property {string} light.background - Main background color for pages and containers
 * @property {string} light.foreground - Primary text color for body text and main content
 * @property {string} light.primaryForeground - Text color that contrasts well with primary background (e.g., white text on primary button)
 * @property {string} light.secondaryForeground - Text color that contrasts well with secondary background
 * @property {string} light.muted - Subdued background color for cards, panels, and secondary containers
 * @property {string} light.mutedForeground - Subdued text color for captions, labels, and less important text
 * @property {string} light.border - Color for borders, dividers, and outline elements
 * @property {string} light.destructive - Color for error states, danger buttons, and destructive actions
 * @property {string} light.destructiveForeground - Text color that contrasts well with destructive background
 * @property {string} light.success - Color for success states, confirmation messages, and positive feedback
 * @property {string} light.successForeground - Text color that contrasts well with success background
 * @property {string} light.warning - Color for warning states, caution messages, and attention-grabbing elements
 * @property {string} light.warningForeground - Text color that contrasts well with warning background
 *
 * @property {object} dark - Color definitions for dark theme mode (mirrors light theme structure)
 * @property {string} dark.primary - Main brand color adapted for dark backgrounds
 * @property {string} dark.secondary - Secondary brand color adapted for dark backgrounds
 * @property {string} dark.accent - Highlight color adapted for dark backgrounds
 * @property {string} dark.background - Main background color for dark theme (typically dark gray or black)
 * @property {string} dark.foreground - Primary text color for dark theme (typically light gray or white)
 * @property {string} dark.primaryForeground - Text color that contrasts well with primary background in dark theme
 * @property {string} dark.secondaryForeground - Text color that contrasts well with secondary background in dark theme
 * @property {string} dark.muted - Subdued background color for dark theme containers
 * @property {string} dark.mutedForeground - Subdued text color for dark theme secondary text
 * @property {string} dark.border - Border color adapted for dark theme visibility
 * @property {string} dark.destructive - Error/danger color adapted for dark backgrounds
 * @property {string} dark.destructiveForeground - Text color that contrasts well with destructive background in dark theme
 * @property {string} dark.success - Success color adapted for dark backgrounds
 * @property {string} dark.successForeground - Text color that contrasts well with success background in dark theme
 * @property {string} dark.warning - Warning color adapted for dark backgrounds
 * @property {string} dark.warningForeground - Text color that contrasts well with warning background in dark theme
 *
 * @example
 * ```typescript
 * const oceanPalette: ColorPalette = {
 *   name: "Ocean Blue",
 *   description: "A calming blue palette inspired by ocean depths",
 *   light: {
 *     primary: "#0066cc",
 *     secondary: "#4d94ff",
 *     // ... other light theme colors
 *   },
 *   dark: {
 *     primary: "#3399ff",
 *     secondary: "#66b3ff",
 *     // ... other dark theme colors
 *   }
 * };
 * ```
 */
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
  destructiveForeground: '#ffffff',
  successForeground: '#ffffff',
  warningForeground: '#ffffff',
  destructive: '#8e0c0c',
  success: '#086144',
  warning: '#634004',
};
const darkDefaults = {
  background: '#0f172a',
  foreground: '#f7f8f8',
  primaryForeground: '#fff',
  secondaryForeground: '#fff',
  muted: '#1e293b',
  // mutedForeground: '#94a3b8',
  mutedForeground: '#b3bdcc',
  border: '#334155',
  destructiveForeground: '#ffffff',
  successForeground: '#ffffff',
  warningForeground: '#ffffff',
  destructive: '#f79c9c',
  success: '#14e8a2',
  warning: '#f7b13c',
};

export const colorPalettes: Record<string, ColorPalette> = {
  blueRainLily: {
    name: 'Blue Rain',
    description: 'TBD',
    light: {
      ...lightDefaults,
      primary: '#3c52f8da',
      secondary: '#774c52',
      accent: '#684c84',
      mutedForeground: '#444f5f',
    },
    dark: {
      ...darkDefaults,
      primary: '#dee2ff',
      secondary: '#efd3d7',
      accent: '#cbc0d3',
      foreground: '#f8fafc',
      primaryForeground: '#0f172a',
      secondaryForeground: '#0f172a',
      muted: '#030508',
    },
  },

  sand: {
    name: 'sand',
    description: 'A warm, earthy palette inspired by desert sands and natural tones',
    light: {
      ...lightDefaults,
      primary: '#6e4e00',
      secondary: '#3e4300',
      accent: '#725410',
      muted: '#ffffff',
      mutedForeground: '#595959',
    },
    dark: {
      ...darkDefaults,
      primaryForeground: '#211717',
      secondaryForeground: '#3d2525',
      primary: '#f4b400',
      secondary: '#cbd300',
      accent: '#e6b646',
      foreground: '#f8fafc',
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
      primary: '#0161ef',
      secondary: '#0154cf',
      accent: '#6d28d9',
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
      primaryForeground: '#000000',
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
      secondaryForeground: '#f5f5f5',
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

  coral: {
    name: 'Coral Reef',
    description: 'Vibrant coral and teal palette inspired by underwater reefs',
    light: {
      ...lightDefaults,
      primary: '#ff6b5a',
      secondary: '#4ecdc4',
      accent: '#45b7b8',
      foreground: '#2d3436',
      muted: '#ffeaa7',
      mutedForeground: '#636e72',
      border: '#ddd5d0',
    },
    dark: {
      ...darkDefaults,
      primary: '#fd79a8',
      secondary: '#00b894',
      accent: '#00cec9',
      background: '#1a1a2e',
      foreground: '#eee5e9',
      primaryForeground: '#2d3436',
      muted: '#16213e',
      mutedForeground: '#a29bfe',
      border: '#0f3460',
    },
  },

  tropical: {
    name: 'Tropical Paradise',
    description: 'Bright tropical colors with pink, blue, and yellow accents',
    light: {
      ...lightDefaults,
      primary: '#e84393',
      secondary: '#0984e3',
      accent: '#fdcb6e',
      foreground: '#2d3436',
      muted: '#fab1a0',
      mutedForeground: '#636e72',
      border: '#fd79a8',
    },
    dark: {
      ...darkDefaults,
      primary: '#fd79a8',
      secondary: '#74b9ff',
      accent: '#fdcb6e',
      background: '#2d3436',
      foreground: '#ddd5d0',
      primaryForeground: '#2d3436',
      muted: '#636e72',
      mutedForeground: '#b2bec3',
      border: '#74b9ff',
    },
  },

  autumn: {
    name: 'Autumn Leaves',
    description: 'Warm autumn palette with burgundy, gold, and forest green',
    light: {
      ...lightDefaults,
      primary: '#6c5ce7',
      secondary: '#a29bfe',
      accent: '#fd79a8',
      foreground: '#2d3436',
      muted: '#ddd5d0',
      mutedForeground: '#636e72',
      border: '#b2bec3',
    },
    dark: {
      ...darkDefaults,
      primary: '#a29bfe',
      secondary: '#6c5ce7',
      accent: '#fd79a8',
      background: '#2d3436',
      foreground: '#ddd5d0',
      primaryForeground: '#2d3436',
      muted: '#636e72',
      mutedForeground: '#b2bec3',
      border: '#74b9ff',
    },
  },

  desert: {
    name: 'Desert Bloom',
    description: 'Earthy desert tones with cactus green and terracotta',
    light: {
      ...lightDefaults,
      primary: '#e17055',
      secondary: '#00b894',
      accent: '#fdcb6e',
      foreground: '#2d3436',
      muted: '#fab1a0',
      mutedForeground: '#636e72',
      border: '#ddd5d0',
    },
    dark: {
      ...darkDefaults,
      primary: '#fab1a0',
      secondary: '#55efc4',
      accent: '#fdcb6e',
      background: '#2d3436',
      foreground: '#ddd5d0',
      primaryForeground: '#2d3436',
      muted: '#636e72',
      mutedForeground: '#b2bec3',
      border: '#00b894',
    },
  },

  arctic: {
    name: 'Arctic Blue',
    description: 'Cool arctic palette with ice blues and crisp whites',
    light: {
      ...lightDefaults,
      primary: '#0984e3',
      secondary: '#74b9ff',
      accent: '#00cec9',
      foreground: '#2d3436',
      muted: '#ddd5d0',
      mutedForeground: '#636e72',
      border: '#b2bec3',
    },
    dark: {
      ...darkDefaults,
      primary: '#74b9ff',
      secondary: '#0984e3',
      accent: '#00cec9',
      background: '#2d3436',
      foreground: '#ddd5d0',
      primaryForeground: '#2d3436',
      muted: '#636e72',
      mutedForeground: '#b2bec3',
      border: '#74b9ff',
    },
  },

  neon: {
    name: 'Neon Nights',
    description: 'Electric neon colors for a cyberpunk aesthetic',
    light: {
      ...lightDefaults,
      primary: '#fd79a8',
      secondary: '#6c5ce7',
      accent: '#00cec9',
      foreground: '#2d3436',
      muted: '#ddd5d0',
      mutedForeground: '#636e72',
      border: '#b2bec3',
    },
    dark: {
      ...darkDefaults,
      primary: '#ff7675',
      secondary: '#a29bfe',
      accent: '#55efc4',
      background: '#1a1a2e',
      foreground: '#eee5e9',
      primaryForeground: '#1a1a2e',
      muted: '#16213e',
      mutedForeground: '#a29bfe',
      border: '#0f3460',
    },
  },

  mint: {
    name: 'Fresh Mint',
    description: 'Refreshing mint greens with soft pastels',
    light: {
      ...lightDefaults,
      primary: '#00b894',
      secondary: '#55efc4',
      accent: '#81ecec',
      foreground: '#2d3436',
      muted: '#ddd5d0',
      mutedForeground: '#636e72',
      border: '#b2bec3',
    },
    dark: {
      ...darkDefaults,
      primary: '#55efc4',
      secondary: '#00b894',
      accent: '#81ecec',
      background: '#2d3436',
      foreground: '#ddd5d0',
      primaryForeground: '#2d3436',
      muted: '#636e72',
      mutedForeground: '#b2bec3',
      border: '#55efc4',
    },
  },

  lavender: {
    name: 'Lavender Fields',
    description: 'Soft lavender and purple tones for a calming effect',
    light: {
      ...lightDefaults,
      primary: '#a29bfe',
      secondary: '#6c5ce7',
      accent: '#fd79a8',
      foreground: '#2d3436',
      muted: '#ddd5d0',
      mutedForeground: '#636e72',
      border: '#b2bec3',
    },
    dark: {
      ...darkDefaults,
      primary: '#a29bfe',
      secondary: '#6c5ce7',
      accent: '#fd79a8',
      background: '#2d3436',
      foreground: '#ddd5d0',
      primaryForeground: '#2d3436',
      muted: '#636e72',
      mutedForeground: '#b2bec3',
      border: '#a29bfe',
    },
  },

  flame: {
    name: 'Dancing Flames',
    description: 'Fiery palette with reds, oranges, and golden yellows',
    light: {
      ...lightDefaults,
      primary: '#e17055',
      secondary: '#ff7675',
      accent: '#fdcb6e',
      foreground: '#2d3436',
      muted: '#fab1a0',
      mutedForeground: '#636e72',
      border: '#ddd5d0',
    },
    dark: {
      ...darkDefaults,
      primary: '#ff7675',
      secondary: '#e17055',
      accent: '#fdcb6e',
      background: '#2d3436',
      foreground: '#ddd5d0',
      primaryForeground: '#2d3436',
      muted: '#636e72',
      mutedForeground: '#b2bec3',
      border: '#ff7675',
    },
  },

  material: {
    name: 'Material Design',
    description: 'Google Material Design 3 inspired palette with dynamic colors',
    light: {
      ...lightDefaults,
      primary: '#6750a4',
      secondary: '#625b71',
      accent: '#7d5260',
      background: '#fffbfe',
      foreground: '#1c1b1f',
      primaryForeground: '#ffffff',
      secondaryForeground: '#ffffff',
      muted: '#f7f2fa',
      mutedForeground: '#49454f',
      border: '#cac4d0',
      success: '#146c2e',
      warning: '#8d4e00',
      destructive: '#ba1a1a',
    },
    dark: {
      ...darkDefaults,
      primary: '#d0bcff',
      secondary: '#ccc2dc',
      accent: '#efb8c8',
      background: '#1c1b1f',
      foreground: '#e6e1e5',
      primaryForeground: '#21005d',
      secondaryForeground: '#332d41',
      muted: '#2b2930',
      mutedForeground: '#cac4d0',
      border: '#49454f',
      success: '#4cdc69',
      warning: '#ffb95a',
      destructive: '#ffb4ab',
    },
  },

  github: {
    name: 'GitHub Dark',
    description: "Modern dark theme inspired by GitHub's interface",
    light: {
      ...lightDefaults,
      primary: '#0969da',
      secondary: '#6e7781',
      accent: '#8250df',
      background: '#ffffff',
      foreground: '#1f2328',
      muted: '#f6f8fa',
      mutedForeground: '#656d76',
      border: '#d1d9e0',
      success: '#1a7f37',
      warning: '#9a6700',
      destructive: '#d1242f',
    },
    dark: {
      ...darkDefaults,
      primary: '#58a6ff',
      secondary: '#8b949e',
      accent: '#a5a5ff',
      background: '#0d1117',
      foreground: '#f0f6fc',
      primaryForeground: '#0d1117',
      muted: '#21262d',
      mutedForeground: '#8b949e',
      border: '#30363d',
      success: '#3fb950',
      warning: '#d29922',
      destructive: '#f85149',
    },
  },

  discord: {
    name: 'Discord',
    description: "Gaming-focused palette inspired by Discord's brand colors",
    light: {
      ...lightDefaults,
      primary: '#5865f2',
      secondary: '#4752c4',
      accent: '#eb459e',
      background: '#ffffff',
      foreground: '#2e3338',
      muted: '#f2f3f5',
      mutedForeground: '#4e5058',
      border: '#e3e5e8',
      success: '#23a55a',
      warning: '#f0b232',
      destructive: '#ed4245',
    },
    dark: {
      ...darkDefaults,
      primary: '#5865f2',
      secondary: '#4752c4',
      accent: '#eb459e',
      background: '#313338',
      foreground: '#dbdee1',
      primaryForeground: '#ffffff',
      muted: '#2b2d31',
      mutedForeground: '#b5bac1',
      border: '#1e1f22',
      success: '#23a55a',
      warning: '#f0b232',
      destructive: '#ed4245',
    },
  },

  notion: {
    name: 'Notion',
    description: "Clean and minimal palette inspired by Notion's workspace",
    light: {
      ...lightDefaults,
      primary: '#2383e2',
      secondary: '#9b9a97',
      accent: '#d9730d',
      background: '#ffffff',
      foreground: '#37352f',
      muted: '#f7f6f3',
      mutedForeground: '#787774',
      border: '#e9e9e7',
      success: '#0f7b6c',
      warning: '#d9730d',
      destructive: '#e03e3e',
    },
    dark: {
      ...darkDefaults,
      primary: '#5b9bd5',
      secondary: '#9b9a97',
      accent: '#ffa500',
      background: '#191919',
      foreground: '#ffffff',
      primaryForeground: '#191919',
      muted: '#2f2f2f',
      mutedForeground: '#9b9a97',
      border: '#373737',
      success: '#4caf50',
      warning: '#ffa500',
      destructive: '#ff5722',
    },
  },

  spotify: {
    name: 'Spotify',
    description: "Music-inspired palette with Spotify's signature green",
    light: {
      ...lightDefaults,
      primary: '#1db954',
      secondary: '#191414',
      accent: '#1ed760',
      background: '#ffffff',
      foreground: '#191414',
      muted: '#f2f2f2',
      mutedForeground: '#535353',
      border: '#d9dadc',
      success: '#1db954',
      warning: '#ffae00',
      destructive: '#e22134',
    },
    dark: {
      ...darkDefaults,
      primary: '#1db954',
      secondary: '#535353',
      accent: '#1ed760',
      background: '#121212',
      foreground: '#ffffff',
      primaryForeground: '#000000',
      muted: '#181818',
      mutedForeground: '#a7a7a7',
      border: '#282828',
      success: '#1db954',
      warning: '#ffae00',
      destructive: '#e22134',
    },
  },

  linear: {
    name: 'Linear',
    description: "Sleek and modern palette inspired by Linear's design system",
    light: {
      ...lightDefaults,
      primary: '#5e6ad2',
      secondary: '#8993a4',
      accent: '#a855f7',
      background: '#ffffff',
      foreground: '#0c0d0e',
      muted: '#f6f6f7',
      mutedForeground: '#6f7177',
      border: '#e1e2e4',
      success: '#00d26a',
      warning: '#f59e0b',
      destructive: '#f5455c',
    },
    dark: {
      ...darkDefaults,
      primary: '#a855f7',
      secondary: '#8993a4',
      accent: '#c084fc',
      background: '#0c0d0e',
      foreground: '#ffffff',
      primaryForeground: '#0c0d0e',
      muted: '#1a1b1e',
      mutedForeground: '#8993a4',
      border: '#2c2d30',
      success: '#00d26a',
      warning: '#f59e0b',
      destructive: '#f5455c',
    },
  },

  tailwind: {
    name: 'Tailwind CSS',
    description: "Modern utility-first palette using Tailwind's brand colors",
    light: {
      ...lightDefaults,
      primary: '#0ea5e9',
      secondary: '#64748b',
      accent: '#06b6d4',
      background: '#ffffff',
      foreground: '#0f172a',
      muted: '#f8fafc',
      mutedForeground: '#64748b',
      border: '#e2e8f0',
      success: '#10b981',
      warning: '#f59e0b',
      destructive: '#ef4444',
    },
    dark: {
      ...darkDefaults,
      primary: '#38bdf8',
      secondary: '#64748b',
      accent: '#22d3ee',
      background: '#0f172a',
      foreground: '#f8fafc',
      primaryForeground: '#0f172a',
      muted: '#1e293b',
      mutedForeground: '#94a3b8',
      border: '#334155',
      success: '#34d399',
      warning: '#fbbf24',
      destructive: '#f87171',
    },
  },

  vercel: {
    name: 'Vercel',
    description: 'Minimalist black and white with subtle accent colors',
    light: {
      ...lightDefaults,
      primary: '#000000',
      secondary: '#666666',
      accent: '#0070f3',
      background: '#ffffff',
      foreground: '#000000',
      primaryForeground: '#ffffff',
      muted: '#fafafa',
      mutedForeground: '#666666',
      border: '#eaeaea',
      success: '#0070f3',
      warning: '#f5a623',
      destructive: '#ee0000',
    },
    dark: {
      ...darkDefaults,
      primary: '#ffffff',
      secondary: '#888888',
      accent: '#0070f3',
      background: '#000000',
      foreground: '#ffffff',
      primaryForeground: '#000000',
      muted: '#111111',
      mutedForeground: '#888888',
      border: '#333333',
      success: '#0070f3',
      warning: '#f5a623',
      destructive: '#ee0000',
    },
  },

  nextjs: {
    name: 'Next.js',
    description: 'Clean development-focused palette inspired by Next.js',
    light: {
      ...lightDefaults,
      primary: '#000000',
      secondary: '#0070f3',
      accent: '#7928ca',
      background: '#ffffff',
      foreground: '#000000',
      primaryForeground: '#ffffff',
      muted: '#fafafa',
      mutedForeground: '#666666',
      border: '#eaeaea',
      success: '#0070f3',
      warning: '#f5a623',
      destructive: '#ee0000',
    },
    dark: {
      ...darkDefaults,
      primary: '#ffffff',
      secondary: '#0070f3',
      accent: '#7928ca',
      background: '#000000',
      foreground: '#ffffff',
      primaryForeground: '#000000',
      muted: '#111111',
      mutedForeground: '#888888',
      border: '#333333',
      success: '#0070f3',
      warning: '#f5a623',
      destructive: '#ee0000',
    },
  },

  dracula: {
    name: 'Dracula',
    description: 'Popular dark theme with vibrant purple and pink accents',
    light: {
      ...lightDefaults,
      primary: '#6272a4',
      secondary: '#8be9fd',
      accent: '#ff79c6',
      background: '#f8f8f2',
      foreground: '#282a36',
      muted: '#f1f1f1',
      mutedForeground: '#6272a4',
      border: '#e5e5e5',
      success: '#50fa7b',
      warning: '#f1fa8c',
      destructive: '#ff5555',
    },
    dark: {
      ...darkDefaults,
      primary: '#bd93f9',
      secondary: '#8be9fd',
      accent: '#ff79c6',
      background: '#282a36',
      foreground: '#f8f8f2',
      primaryForeground: '#282a36',
      muted: '#44475a',
      mutedForeground: '#6272a4',
      border: '#6272a4',
      success: '#50fa7b',
      warning: '#f1fa8c',
      destructive: '#ff5555',
    },
  },

  catppuccin: {
    name: 'Catppuccin',
    description: 'Soothing pastel theme with warm, cozy colors',
    light: {
      ...lightDefaults,
      primary: '#8839ef',
      secondary: '#7c7f93',
      accent: '#ea76cb',
      background: '#eff1f5',
      foreground: '#4c4f69',
      primaryForeground: '#ffffff',
      muted: '#e6e9ef',
      mutedForeground: '#6c6f85',
      border: '#acb0be',
      success: '#40a02b',
      warning: '#df8e1d',
      destructive: '#d20f39',
    },
    dark: {
      ...darkDefaults,
      primary: '#cba6f7',
      secondary: '#a6adc8',
      accent: '#f5c2e7',
      background: '#1e1e2e',
      foreground: '#cdd6f4',
      primaryForeground: '#1e1e2e',
      muted: '#313244',
      mutedForeground: '#a6adc8',
      border: '#6c7086',
      success: '#a6e3a1',
      warning: '#f9e2af',
      destructive: '#f38ba8',
    },
  },

  nord: {
    name: 'Nord',
    description: 'Arctic-inspired color palette with cool blues and warm whites',
    light: {
      ...lightDefaults,
      primary: '#5e81ac',
      secondary: '#81a1c1',
      accent: '#88c0d0',
      background: '#eceff4',
      foreground: '#2e3440',
      muted: '#e5e9f0',
      mutedForeground: '#4c566a',
      border: '#d8dee9',
      success: '#a3be8c',
      warning: '#ebcb8b',
      destructive: '#bf616a',
    },
    dark: {
      ...darkDefaults,
      primary: '#88c0d0',
      secondary: '#81a1c1',
      accent: '#8fbcbb',
      background: '#2e3440',
      foreground: '#eceff4',
      primaryForeground: '#2e3440',
      muted: '#3b4252',
      mutedForeground: '#d8dee9',
      border: '#4c566a',
      success: '#a3be8c',
      warning: '#ebcb8b',
      destructive: '#bf616a',
    },
  },

  gruvbox: {
    name: 'Gruvbox',
    description: 'Retro groovy color scheme with warm earth tones',
    light: {
      ...lightDefaults,
      primary: '#458588',
      secondary: '#689d6a',
      accent: '#d79921',
      background: '#fbf1c7',
      foreground: '#3c3836',
      muted: '#f2e5bc',
      mutedForeground: '#7c6f64',
      border: '#d5c4a1',
      success: '#98971a',
      warning: '#d79921',
      destructive: '#cc241d',
    },
    dark: {
      ...darkDefaults,
      primary: '#83a598',
      secondary: '#8ec07c',
      accent: '#fabd2f',
      background: '#282828',
      foreground: '#ebdbb2',
      primaryForeground: '#282828',
      muted: '#3c3836',
      mutedForeground: '#a89984',
      border: '#504945',
      success: '#b8bb26',
      warning: '#fabd2f',
      destructive: '#fb4934',
    },
  },

  tokyoNight: {
    name: 'Tokyo Night',
    description: 'Popular VS Code theme with cyberpunk vibes and neon accents',
    light: {
      ...lightDefaults,
      primary: '#7aa2f7',
      secondary: '#7dcfff',
      accent: '#bb9af7',
      background: '#d5d6db',
      foreground: '#343b58',
      muted: '#e9e9ed',
      mutedForeground: '#6f7bb6',
      border: '#b4b5b9',
      success: '#9ece6a',
      warning: '#e0af68',
      destructive: '#f7768e',
    },
    dark: {
      ...darkDefaults,
      primary: '#7aa2f7',
      secondary: '#7dcfff',
      accent: '#bb9af7',
      background: '#1a1b26',
      foreground: '#c0caf5',
      primaryForeground: '#1a1b26',
      muted: '#24283b',
      mutedForeground: '#565f89',
      border: '#414868',
      success: '#9ece6a',
      warning: '#e0af68',
      destructive: '#f7768e',
    },
  },

  oneMonokai: {
    name: 'One Monokai',
    description: 'Dark editor theme with warm highlights and excellent readability',
    light: {
      ...lightDefaults,
      primary: '#e06c75',
      secondary: '#56b6c2',
      accent: '#c678dd',
      background: '#fafafa',
      foreground: '#383a42',
      muted: '#f0f0f1',
      mutedForeground: '#696c77',
      border: '#e5e5e6',
      success: '#98c379',
      warning: '#e5c07b',
      destructive: '#e06c75',
    },
    dark: {
      ...darkDefaults,
      primary: '#e06c75',
      secondary: '#56b6c2',
      accent: '#c678dd',
      background: '#282c34',
      foreground: '#abb2bf',
      primaryForeground: '#282c34',
      muted: '#21252b',
      mutedForeground: '#5c6370',
      border: '#3e4451',
      success: '#98c379',
      warning: '#e5c07b',
      destructive: '#e06c75',
    },
  },

  arcticIce: {
    name: 'Arctic Ice',
    description: 'Minimal design palette inspired by Figma and modern design tools',
    light: {
      ...lightDefaults,
      primary: '#0c8ce9',
      secondary: '#7b68ee',
      accent: '#ff6b6b',
      background: '#ffffff',
      foreground: '#2d3748',
      muted: '#f7fafc',
      mutedForeground: '#718096',
      border: '#e2e8f0',
      success: '#48bb78',
      warning: '#ed8936',
      destructive: '#f56565',
    },
    dark: {
      ...darkDefaults,
      primary: '#63b3ed',
      secondary: '#9f7aea',
      accent: '#fc8181',
      background: '#1a202c',
      foreground: '#f7fafc',
      primaryForeground: '#1a202c',
      muted: '#2d3748',
      mutedForeground: '#a0aec0',
      border: '#4a5568',
      success: '#68d391',
      warning: '#f6ad55',
      destructive: '#fc8181',
    },
  },

  solarized: {
    name: 'Solarized',
    description: 'Classic developer theme with precisely chosen colors for optimal readability',
    light: {
      ...lightDefaults,
      primary: '#268bd2',
      secondary: '#2aa198',
      accent: '#d33682',
      background: '#fdf6e3',
      foreground: '#657b83',
      muted: '#eee8d5',
      mutedForeground: '#93a1a1',
      border: '#eee8d5',
      success: '#859900',
      warning: '#b58900',
      destructive: '#dc322f',
    },
    dark: {
      ...darkDefaults,
      primary: '#268bd2',
      secondary: '#2aa198',
      accent: '#d33682',
      background: '#002b36',
      foreground: '#839496',
      primaryForeground: '#002b36',
      muted: '#073642',
      mutedForeground: '#586e75',
      border: '#073642',
      success: '#859900',
      warning: '#b58900',
      destructive: '#dc322f',
    },
  },

  slack: {
    name: 'Slack',
    description: "Professional workspace palette inspired by Slack's interface",
    light: {
      ...lightDefaults,
      primary: '#4a154b',
      secondary: '#36c5f0',
      accent: '#2eb67d',
      background: '#ffffff',
      foreground: '#1d1c1d',
      muted: '#f8f8f8',
      mutedForeground: '#616061',
      border: '#dddddd',
      success: '#2eb67d',
      warning: '#ecb22e',
      destructive: '#e01e5a',
    },
    dark: {
      ...darkDefaults,
      primary: '#ecb22e',
      secondary: '#36c5f0',
      accent: '#2eb67d',
      background: '#1a1d29',
      foreground: '#d1d2d3',
      primaryForeground: '#1a1d29',
      muted: '#232530',
      mutedForeground: '#ababad',
      border: '#363a47',
      success: '#2eb67d',
      warning: '#ecb22e',
      destructive: '#e01e5a',
    },
  },

  framer: {
    name: 'Framer',
    description: 'Modern design tool palette with vibrant gradients and clean aesthetics',
    light: {
      ...lightDefaults,
      primary: '#0055ff',
      secondary: '#8855ff',
      accent: '#ff0055',
      background: '#ffffff',
      foreground: '#111111',
      muted: '#f5f5f5',
      mutedForeground: '#666666',
      border: '#e5e5e5',
      success: '#00aa55',
      warning: '#ff8800',
      destructive: '#ff3333',
    },
    dark: {
      ...darkDefaults,
      primary: '#0099ff',
      secondary: '#aa77ff',
      accent: '#ff3377',
      background: '#111111',
      foreground: '#ffffff',
      primaryForeground: '#111111',
      muted: '#1a1a1a',
      mutedForeground: '#999999',
      border: '#333333',
      success: '#33cc66',
      warning: '#ffaa33',
      destructive: '#ff5555',
    },
  },

  raycast: {
    name: 'Raycast',
    description: 'Productivity app palette with subtle gradients and modern feel',
    light: {
      ...lightDefaults,
      primary: '#ff6363',
      secondary: '#30d158',
      accent: '#007aff',
      background: '#ffffff',
      foreground: '#000000',
      muted: '#f2f2f7',
      mutedForeground: '#8e8e93',
      border: '#d1d1d6',
      success: '#30d158',
      warning: '#ff9500',
      destructive: '#ff3b30',
    },
    dark: {
      ...darkDefaults,
      primary: '#ff6363',
      secondary: '#30d158',
      accent: '#007aff',
      background: '#000000',
      foreground: '#ffffff',
      primaryForeground: '#000000',
      muted: '#1c1c1e',
      mutedForeground: '#8e8e93',
      border: '#38383a',
      success: '#30d158',
      warning: '#ff9500',
      destructive: '#ff3b30',
    },
  },

  ayu: {
    name: 'Ayu',
    description: 'Simple, bright and elegant theme inspired by the Ayu editor theme',
    light: {
      ...lightDefaults,
      primary: '#36a3d9',
      secondary: '#86b300',
      accent: '#f2ae49',
      background: '#fafafa',
      foreground: '#5c6166',
      muted: '#f8f9fa',
      mutedForeground: '#828c99',
      border: '#f0f0f0',
      success: '#86b300',
      warning: '#f2ae49',
      destructive: '#f51818',
    },
    dark: {
      ...darkDefaults,
      primary: '#39bae6',
      secondary: '#c2d94c',
      accent: '#ffb454',
      background: '#0a0e14',
      foreground: '#b3b1ad',
      primaryForeground: '#0a0e14',
      muted: '#11151c',
      mutedForeground: '#4d5566',
      border: '#1f2430',
      success: '#c2d94c',
      warning: '#ffb454',
      destructive: '#ff3333',
    },
  },

  synthwave: {
    name: 'Synthwave',
    description: 'Retro-futuristic 80s inspired neon palette with cyberpunk aesthetics',
    light: {
      ...lightDefaults,
      primary: '#ff006e',
      secondary: '#8338ec',
      accent: '#3a86ff',
      background: '#f8f9fa',
      foreground: '#212529',
      muted: '#e9ecef',
      mutedForeground: '#6c757d',
      border: '#dee2e6',
      success: '#06ffa5',
      warning: '#ffbe0b',
      destructive: '#fb8500',
    },
    dark: {
      ...darkDefaults,
      primary: '#ff10f0',
      secondary: '#9d4edd',
      accent: '#4cc9f0',
      background: '#0d1117',
      foreground: '#f0f6fc',
      primaryForeground: '#0d1117',
      muted: '#161b22',
      mutedForeground: '#8b949e',
      border: '#21262d',
      success: '#06ffa5',
      warning: '#ffbe0b',
      destructive: '#fb8500',
    },
  },

  vscode: {
    name: 'VS Code',
    description: 'Official Visual Studio Code color scheme with developer-friendly aesthetics',
    light: {
      ...lightDefaults,
      primary: '#007acc',
      secondary: '#0e639c',
      accent: '#005a9e',
      background: '#ffffff',
      foreground: '#333333',
      muted: '#f3f3f3',
      mutedForeground: '#616161',
      border: '#e7e7e7',
      success: '#089000',
      warning: '#bf8803',
      destructive: '#a1260d',
    },
    dark: {
      ...darkDefaults,
      primary: '#007acc',
      secondary: '#1177bb',
      accent: '#4fc1ff',
      background: '#1e1e1e',
      foreground: '#cccccc',
      primaryForeground: '#ffffff',
      muted: '#252526',
      mutedForeground: '#969696',
      border: '#3c3c3c',
      success: '#14ce14',
      warning: '#ffcc02',
      destructive: '#f14c4c',
    },
  },

  // ...existing code...
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
    --color-bg-page-dark: #030620;

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
    --color-bg-page-dark: #030620;

    ::selection {
      background-color: color-mix(in srgb, var(--color-primary) 30%, transparent);
      color: var(--color-foreground);
    }
  }`;
}
