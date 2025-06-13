# Dynamic Color Token Customizer

This project includes components that allow you to dynamically change CSS custom properties (design tokens) from your `CustomStyles.astro` at runtime. This is perfect for testing different color schemes and seeing how they affect your components in real-time.

## Available Components

### 1. `AdvancedColorCustomizer.astro` 
The full-featured color customizer with:
- Modal interface with overlay
- Color picker + hex input for each token
- Live preview of colors
- Preset color schemes (Blue, Green, Purple, Orange themes)
- Export CSS variables
- Save custom presets
- LocalStorage persistence
- Responsive design

### 2. `ColorTokenCustomizer.astro`
A lightweight, minimal version with:
- Floating button interface
- Quick color adjustments for primary tokens
- Copy CSS functionality
- Reset to defaults
- Small footprint

## Usage

### Add to Any Page

Simply import and add the component to any Astro page:

```astro
---
import AdvancedColorCustomizer from '~/components/ui/AdvancedColorCustomizer.astro';
// or
import ColorTokenCustomizer from '~/components/ui/ColorTokenCustomizer.astro';
---

<Layout>
  <!-- Your page content -->
  
  <!-- Add the customizer -->
  <AdvancedColorCustomizer />
  <!-- or -->
  <ColorTokenCustomizer />
</Layout>
```

### Positioning Options

The `AdvancedColorCustomizer` accepts props for positioning:

```astro
<AdvancedColorCustomizer 
  position="top-left" 
  title="My Custom Title"
  minimized={false}
/>
```

Available positions: `top-right`, `top-left`, `bottom-right`, `bottom-left`

## Features

### Real-time Updates
- Changes are applied immediately to the page
- All components using the CSS custom properties will update instantly
- No page refresh required

### Supported Tokens
Currently supports these design tokens from `CustomStyles.astro`:
- `--color-primary` - Primary brand color
- `--color-secondary` - Secondary/supporting color  
- `--color-accent` - Accent for highlights, CTAs
- `--color-background` - Background color
- `--color-foreground` - Foreground text color

### Persistence
The `AdvancedColorCustomizer` automatically saves your changes to localStorage and restores them when you reload the page.

### Export Functionality
Both components allow you to export your color choices as CSS variables that you can copy and paste into your `CustomStyles.astro` file:

```css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #1e40af;
  --color-accent: #ef4444;
}
```

## Implementation Details

### How It Works
1. The components use JavaScript to modify CSS custom properties on the `:root` element
2. Changes override the values defined in `CustomStyles.astro` at runtime
3. All components that reference these CSS variables automatically update

### CSS Custom Properties Modified
```css
document.documentElement.style.setProperty('--color-primary', '#new-color');
```

### Browser Compatibility
- Modern browsers with CSS custom properties support
- Chrome, Firefox, Safari, Edge
- Color input type support recommended

## Best Practices

1. **Testing Color Schemes**: Use this tool to test different color combinations before committing changes to your CSS
2. **Client Presentations**: Great for showing clients different color options in real-time
3. **Design System Development**: Experiment with token values during design system creation
4. **Accessibility Testing**: Test color contrast ratios with different combinations

## Development Mode Only?

While these components work in production, you might want to only include them in development:

```astro
---
import AdvancedColorCustomizer from '~/components/ui/AdvancedColorCustomizer.astro';
const isDev = import.meta.env.DEV;
---

<Layout>
  <!-- Your content -->
  
  {isDev && <AdvancedColorCustomizer />}
</Layout>
```

## Extending

To add more color tokens:

1. Add the token to your `CustomStyles.astro`
2. Add a new control object to the component's token array:

```typescript
const tokens = [
  // existing tokens...
  { id: 'my-new-color', cssVar: '--my-new-color', default: '#123456' }
];
```

3. Add the corresponding HTML controls in the component template

## Examples

Check out the `components.astro` page which includes the `AdvancedColorCustomizer` component to see it in action with all the UI components and widgets.
