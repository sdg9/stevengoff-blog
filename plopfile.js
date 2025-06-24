export default function (plop) {
  // Helper function to convert hex to contrasting foreground color
  function getContrastingColor(hexColor) {
    // Remove # if present
    const hex = hexColor.replace('#', '');

    // Convert to RGB
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return dark text for light backgrounds, light text for dark backgrounds
    return luminance > 0.5 ? '#0f172a' : '#ffffff';
  }

  // Helper to generate muted color (lighter/darker version)
  function generateMutedColor(hexColor, isLight = true) {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    if (isLight) {
      // Make lighter by blending with white
      const newR = Math.round(r + (255 - r) * 0.9);
      const newG = Math.round(g + (255 - g) * 0.9);
      const newB = Math.round(b + (255 - b) * 0.9);
      return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
    } else {
      // Make darker
      const newR = Math.round(r * 0.2);
      const newG = Math.round(g * 0.2);
      const newB = Math.round(b * 0.2);
      return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
    }
  }

  // Helper to generate border color
  function generateBorderColor(backgroundColor, isLight = true) {
    if (isLight) {
      return backgroundColor === '#ffffff' ? '#e2e8f0' : generateMutedColor(backgroundColor, true);
    } else {
      return backgroundColor === '#0f172a' ? '#334155' : generateMutedColor(backgroundColor, false);
    }
  }

  // Helper to parse Coolors.co URL
  function parseCoolorsUrl(url) {
    if (!url || !url.includes('coolors.co')) {
      return null;
    }

    // Handle both URL formats:
    // https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51
    // https://coolors.co/palette/780000-c1121f-fdf0d5
    let match = url.match(/coolors\.co\/(?:palette\/)?([a-fA-F0-9-]+)/);
    if (!match) return null;

    const colors = match[1].split('-').map((color) => `#${color}`);
    return colors.length >= 3 ? colors : null;
  }

  plop.setGenerator('palette', {
    description: 'Add a new color palette',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your palette?',
        validate: (input) => {
          if (!input) return 'Please enter a palette name';
          if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(input)) {
            return 'Palette name should be camelCase (e.g., oceanBreeze, forestGreen)';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'displayName',
        message: 'What is the display name? (e.g., "Ocean Breeze")',
        validate: (input) => (input ? true : 'Please enter a display name'),
      },
      {
        type: 'input',
        name: 'description',
        message: 'Describe your palette:',
        validate: (input) => (input ? true : 'Please enter a description'),
      },
      {
        type: 'list',
        name: 'inputMethod',
        message: 'How would you like to define colors?',
        choices: [
          { name: 'Enter individual colors manually', value: 'manual' },
          { name: 'Import from Coolors.co URL', value: 'coolors' },
        ],
      },
      {
        type: 'input',
        name: 'coolorsUrl',
        message:
          'Enter your Coolors.co URL:\n  Format 1: https://coolors.co/264653-2a9d8f-e9c46a\n  Format 2: https://coolors.co/palette/780000-c1121f-fdf0d5\n  URL:',
        when: (answers) => answers.inputMethod === 'coolors',
        validate: (input) => {
          const colors = parseCoolorsUrl(input);
          if (!colors) return 'Please enter a valid Coolors.co URL with at least 3 colors';
          return true;
        },
      },
      {
        type: 'input',
        name: 'primaryColor',
        message: 'Primary color (hex, e.g., #264653):',
        when: (answers) => answers.inputMethod === 'manual',
        validate: (input) =>
          /^#[a-fA-F0-9]{6}$/.test(input) ? true : 'Please enter a valid hex color (e.g., #264653)',
      },
      {
        type: 'input',
        name: 'secondaryColor',
        message: 'Secondary color (hex, e.g., #2a9d8f):',
        when: (answers) => answers.inputMethod === 'manual',
        validate: (input) => (/^#[a-fA-F0-9]{6}$/.test(input) ? true : 'Please enter a valid hex color'),
      },
      {
        type: 'input',
        name: 'accentColor',
        message: 'Accent color (hex, e.g., #e76f51):',
        when: (answers) => answers.inputMethod === 'manual',
        validate: (input) => (/^#[a-fA-F0-9]{6}$/.test(input) ? true : 'Please enter a valid hex color'),
      },
      {
        type: 'input',
        name: 'backgroundColor',
        message: 'Background color (hex, default: #ffffff):',
        when: (answers) => answers.inputMethod === 'manual',
        default: '#ffffff',
        validate: (input) => (/^#[a-fA-F0-9]{6}$/.test(input) ? true : 'Please enter a valid hex color'),
      },
      {
        type: 'input',
        name: 'foregroundColor',
        message: 'Foreground/text color (hex, default: #0f172a):',
        when: (answers) => answers.inputMethod === 'manual',
        default: '#0f172a',
        validate: (input) => (/^#[a-fA-F0-9]{6}$/.test(input) ? true : 'Please enter a valid hex color'),
      },
    ],
    actions: function (data) {
      // Parse colors from Coolors URL if needed
      if (data.inputMethod === 'coolors') {
        const colors = parseCoolorsUrl(data.coolorsUrl);
        data.primaryColor = colors[0];
        data.secondaryColor = colors[1];
        data.accentColor = colors[2];
        // For 3-color palettes, use standard background/foreground
        data.backgroundColor = colors[3] || '#ffffff';
        data.foregroundColor = colors[4] || '#0f172a';

        // If we have more than 3 colors, use them intelligently
        if (colors.length >= 4) {
          // Check if the 4th color looks like a background (very light or very dark)
          const fourthColorHex = colors[3].replace('#', '');
          const r = parseInt(fourthColorHex.substr(0, 2), 16);
          const g = parseInt(fourthColorHex.substr(2, 2), 16);
          const b = parseInt(fourthColorHex.substr(4, 2), 16);
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          // If it's very light (>0.9) or very dark (<0.1), use it as background
          if (luminance > 0.9 || luminance < 0.1) {
            data.backgroundColor = colors[3];
            data.foregroundColor = getContrastingColor(colors[3]);
          } else {
            // Otherwise, keep standard background and use 4th color as accent
            data.accentColor = colors[3];
          }
        }

        if (colors.length >= 5) {
          data.foregroundColor = colors[4];
        }
      }

      // Set flags for conditional properties (only include if different from defaults)
      data.backgroundColorCustom = data.backgroundColor !== '#ffffff';
      data.foregroundColorCustom = data.foregroundColor !== '#0f172a';

      // Generate additional colors automatically
      data.primaryForeground = getContrastingColor(data.primaryColor);
      data.secondaryForeground = getContrastingColor(data.secondaryColor);
      data.muted = generateMutedColor(data.backgroundColor, true);
      data.mutedForeground = '#6b7280'; // Standard muted text
      data.border = generateBorderColor(data.backgroundColor, true);

      // Set flags for generated colors (only include if different from defaults)
      data.mutedColorCustom = data.muted !== '#f1f5f9';
      data.borderColorCustom = data.border !== '#e2e8f0';

      // Dark mode variants
      data.darkBackground = '#0f172a';
      data.darkForeground = '#f8fafc';
      data.darkMuted = generateMutedColor(data.darkBackground, false);
      data.darkMutedForeground = '#94a3b8';
      data.darkBorder = generateBorderColor(data.darkBackground, false);
      data.darkPrimaryForeground = getContrastingColor(data.primaryColor);
      data.darkSecondaryForeground = getContrastingColor(data.secondaryColor);

      // Set flags for dark mode custom properties
      data.darkBackgroundCustom = data.darkBackground !== '#0f172a';
      data.darkForegroundCustom = data.darkForeground !== 'rgb(247 248 248)';
      data.darkPrimaryForegroundCustom = data.darkPrimaryForeground !== '#211717';
      data.darkMutedCustom = data.darkMuted !== '#1e293b';
      data.darkBorderCustom = data.darkBorder !== '#334155';

      return [
        {
          type: 'modify',
          path: 'src/utils/palettes.ts',
          pattern: /(export const colorPalettes: Record<string, ColorPalette> = {)/,
          template: `$1
  {{name}}: {
    name: '{{displayName}}',
    description: '{{description}}',
    light: {
      ...lightDefaults,
      primary: '{{primaryColor}}',
      secondary: '{{secondaryColor}}',
      accent: '{{accentColor}}',{{#if backgroundColorCustom}}
      background: '{{backgroundColor}}',{{/if}}{{#if foregroundColorCustom}}
      foreground: '{{foregroundColor}}',{{/if}}{{#if mutedColorCustom}}
      muted: '{{muted}}',{{/if}}{{#if borderColorCustom}}
      border: '{{border}}',{{/if}}
    },
    dark: {
      ...darkDefaults,
      primary: '{{primaryColor}}',
      secondary: '{{secondaryColor}}',
      accent: '{{accentColor}}',{{#if darkBackgroundCustom}}
      background: '{{darkBackground}}',{{/if}}{{#if darkForegroundCustom}}
      foreground: '{{darkForeground}}',{{/if}}{{#if darkPrimaryForegroundCustom}}
      primaryForeground: '{{darkPrimaryForeground}}',{{/if}}{{#if darkMutedCustom}}
      muted: '{{darkMuted}}',{{/if}}{{#if darkBorderCustom}}
      border: '{{darkBorder}}',{{/if}}
    },
  },
`,
        },
      ];
    },
  });

  plop.setGenerator('update-active-palette', {
    description: 'Change the active palette in CustomStyles.astro',
    prompts: [
      {
        type: 'input',
        name: 'paletteName',
        message: 'Enter the palette name you want to activate:',
        validate: (input) => {
          if (!input) return 'Please enter a palette name';
          // TODO: We could read the palettes.ts file and validate against existing palettes
          return true;
        },
      },
    ],
    actions: [
      {
        type: 'modify',
        path: 'src/components/CustomStyles.astro',
        pattern: /(const ACTIVE_PALETTE = ')[^']*(')/,
        template: '$1{{paletteName}}$2',
      },
    ],
  });
}
