# Color Palette System with Plop & Accessibility Analysis

This project includes a powerful color palette system with automated palette generation using Plop and comprehensive accessibility analysis inspired by [contrast-grid.eightshapes.com](https://contrast-grid.eightshapes.com/).

## ✨ New Accessibility Features

- **📊 Contrast Grid Analysis** - Visual matrix showing all color contrast ratios
- **🏆 Accessibility Ratings** - Overall scores (Excellent/Good/Fair/Poor/Critical) 
- **⚠️ Critical Issue Detection** - Identifies WCAG compliance failures
- **💡 Smart Recommendations** - Specific suggestions for improving accessibility
- **🎯 WCAG Compliance** - Tested against AA and AAA standards

## Quick Commands

```bash
# Add a new palette interactively
pnpm palette:add

# Switch the active palette
pnpm palette:switch

# Show all Plop generators
pnpm palette

# View accessibility analysis
# Visit /color-palettes in your browser
```

## Adding New Palettes

### Method 1: From Coolors.co (Recommended)

1. Go to [Coolors.co](https://coolors.co) and create a palette
2. Copy the URL (e.g., `https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51`)
3. Run `pnpm palette:add`
4. Choose "Import from Coolors.co URL"
5. Paste your URL

The generator will automatically:
- Extract colors from the URL
- Generate contrasting foreground colors
- Create muted variants and borders
- Set up dark mode variants
- Add the palette to `src/utils/palettes.ts`

### Method 2: Manual Entry

1. Run `pnpm palette:add`
2. Choose "Enter individual colors manually"
3. Provide your colors in hex format
4. The generator handles the rest automatically

## Switching Palettes

### Quick Switch
```bash
pnpm palette:switch
```
Enter the palette name (e.g., `ocean`, `forest`, `myCustomPalette`) to instantly update your active palette.

### Manual Switch
Edit `src/components/CustomStyles.astro` and change:
```javascript
const ACTIVE_PALETTE = 'yourPaletteName';
```

## Available Palettes

- **default** - The original blue and purple palette
- **ocean** - Calming blues and teals inspired by the ocean
- **forest** - Natural greens and earth tones
- **sunset** - Warm oranges and reds like a beautiful sunset
- **midnight** - Deep purples and blues for a sophisticated look
- **rose** - Elegant pinks and roses for a feminine touch
- **monochrome** - Clean blacks, whites, and grays for a minimalist approach

## Examples

### Adding a Coolors.co Palette
```bash
$ pnpm palette:add
? What is the name of your palette? tropicalVibes
? What is the display name? Tropical Vibes
? Describe your palette: Bright tropical colors inspired by paradise
? How would you like to define colors? Import from Coolors.co URL
? Enter your Coolors.co URL: https://coolors.co/06ffa5-16537e-103778-fefae0-e63946
✔ Palette added successfully!
```

### Switching Palettes
```bash
$ pnpm palette:switch
? Enter the palette name you want to activate: tropicalVibes
✔ Active palette updated to tropicalVibes!
```

## Color Structure

Each palette includes:

### Core Colors (from your input)
- **Primary** - Main brand color
- **Secondary** - Supporting color
- **Accent** - Highlights and CTAs
- **Background** - Page background
- **Foreground** - Text color

### Auto-Generated Colors
- **Primary/Secondary Foreground** - Contrasting text colors
- **Muted** - Subtle backgrounds and borders
- **Border** - Border colors
- **System Colors** - Success, error, warning (standardized)

### Dark Mode Variants
All colors get dark mode versions automatically generated.

## Technical Details

### File Structure
- `plopfile.js` - Plop configuration and generators
- `src/utils/palettes.ts` - All palette definitions
- `src/components/CustomStyles.astro` - Active palette selector
- `src/components/ui/PalettePreview.astro` - Visual palette preview
- `src/pages/color-palettes.astro` - Demo page

### Color Variables
All colors are available as CSS custom properties:
```css
.my-component {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
  border: 1px solid var(--color-border);
}
```

### Automatic Features
- **Contrast calculation** - Ensures readable text colors
- **Muted color generation** - Creates subtle variants
- **Dark mode adaptation** - Generates appropriate dark variants
- **System color consistency** - Keeps error/success colors standard

## Advanced Usage

### Custom Color Logic
The Plop generators include helper functions you can customize:
- `getContrastingColor()` - Calculates readable text colors
- `generateMutedColor()` - Creates lighter/darker variants
- `generateBorderColor()` - Generates appropriate border colors

### Validation
The system validates:
- Palette names (camelCase)
- Hex color formats
- Coolors.co URL formats
- Required fields

## Troubleshooting

### "Palette not found" errors
Make sure the palette name in `CustomStyles.astro` matches exactly the key in `palettes.ts`.

### Colors look wrong
Check that your hex colors are valid 6-character format (e.g., `#264653`, not `#264`).

### Coolors.co import not working
Ensure your URL includes at least 3 colors and follows the format: `coolors.co/color1-color2-color3`
