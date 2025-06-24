# Color Palette System

This project includes a flexible color palette system that allows you to easily switch between different professionally crafted color schemes.

## Quick Start

To change your site's color palette:

1. Open `src/components/CustomStyles.astro`
2. Find the line: `const ACTIVE_PALETTE = 'default';`
3. Change `'default'` to any of the available palette names
4. Save the file - your site will update automatically!

## Available Palettes

- **default** - The original blue and purple palette
- **ocean** - Calming blues and teals inspired by the ocean
- **forest** - Natural greens and earth tones
- **sunset** - Warm oranges and reds like a beautiful sunset
- **midnight** - Deep purples and blues for a sophisticated look
- **rose** - Elegant pinks and roses for a feminine touch
- **monochrome** - Clean blacks, whites, and grays for a minimalist approach

## View All Palettes

Visit `/color-palettes` on your site to see a visual preview of all available palettes.

## Technical Details

### File Structure

- `src/utils/palettes.ts` - Contains all palette definitions and utility functions
- `src/components/CustomStyles.astro` - Main styling component that applies the selected palette
- `src/components/ui/PalettePreview.astro` - Component for previewing palettes
- `src/pages/color-palettes.astro` - Demo page showing all available palettes

### Color Variables

Each palette defines the following color tokens:

#### Core Colors
- `--color-primary` - Primary brand color
- `--color-secondary` - Secondary/supporting color  
- `--color-accent` - Accent for highlights, CTAs
- `--color-background` - Background color
- `--color-foreground` - Foreground text color

#### Extended Colors
- `--color-primary-foreground` - Text color for primary backgrounds
- `--color-secondary-foreground` - Text color for secondary backgrounds
- `--color-muted` - Subtle backgrounds, borders
- `--color-muted-foreground` - Muted text color
- `--color-border` - Border color

#### System Colors
- `--color-destructive` - Error states
- `--color-success` - Success states  
- `--color-warning` - Warning states

### Dark Mode Support

Each palette automatically includes dark mode variants. All colors are defined for both light and dark themes.

## Creating Custom Palettes

To add your own custom palette:

1. Open `src/utils/palettes.ts`
2. Add a new entry to the `colorPalettes` object:

```typescript
myCustomPalette: {
  name: 'My Custom Palette',
  description: 'A unique color scheme',
  light: {
    primary: '#your-primary-color',
    secondary: '#your-secondary-color',
    accent: '#your-accent-color',
    background: '#ffffff',
    foreground: '#000000',
    // ... define all other required colors
  },
  dark: {
    primary: '#your-dark-primary',
    secondary: '#your-dark-secondary',
    // ... define dark mode variants
  },
}
```

3. Use your new palette by setting `ACTIVE_PALETTE = 'myCustomPalette'` in CustomStyles.astro

## Using Colors in Components

You can use the palette colors in your components via CSS custom properties:

```css
.my-component {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
  border: 1px solid var(--color-border);
}
```

Or with Tailwind CSS (if configured with the custom properties):

```html
<div class="bg-primary text-primary-foreground border-border">
  Content here
</div>
```

## Benefits

- **Consistency** - All colors are centrally managed and semantically named
- **Dark Mode** - Automatic support for light and dark themes
- **Flexibility** - Easy to switch between complete color schemes
- **Maintainability** - Single source of truth for all color definitions
- **Professional** - Hand-crafted palettes designed for web applications
