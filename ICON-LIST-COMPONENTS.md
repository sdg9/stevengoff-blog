# Icon List Components

Reusable Astro components for displaying lists with icons, titles, and descriptions. Perfect for therapy services, features, benefits, process steps, and more.

## Components

### IconListItem

A single list item with icon, title, and description.

```astro
<IconListItem
  icon="tabler:compass"
  title="Explore your present and your potential"
  description="Understand where you are now, clarify where you want to go, and identify what might be holding you back."
  iconColor="primary"
  size="md"
/>
```

### IconList

A container for multiple IconListItem components with grid layout support.

```astro
<IconList
  items={therapyItems}
  columns={2}
  iconColor="primary"
  size="md"
  spacing="normal"
/>
```

### IconListItemSlot

A single list item that uses slots for maximum content flexibility.

```astro
<IconListItemSlot
  icon="tabler:seedling"
  title="Custom Content Item"
  iconColor="success"
>
  <p>Your custom description with full HTML support...</p>
  <ul class="space-y-2">
    <li>Custom bullet point</li>
    <li>Another bullet point</li>
  </ul>
</IconListItemSlot>
```

### IconListItemWithSubBullets

A single list item with structured sub-bullet support.

```astro
<IconListItemWithSubBullets
  icon="tabler:seedling"
  title="Session Title"
  description="Main description"
  iconColor="primary"
  subBulletStyle="bullet"
  subBullets={[
    { text: 'First sub-bullet' },
    { text: 'Second sub-bullet' },
  ]}
/>
```

### IconListWithSubBullets

A container for multiple items with sub-bullets.

```astro
<IconListWithSubBullets
  items={sessionData}
  columns={1}
  iconColor="primary"
  subBulletStyle="bullet"
/>
```

## Props

### IconListItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `string` | `'tabler:check'` | Icon name (using astro-icon) |
| `title` | `string` | Required | Item title |
| `description` | `string` | Required | Item description (supports HTML) |
| `iconColor` | `'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'custom'` | `'primary'` | Icon color scheme |
| `iconBg` | `boolean` | `true` | Whether to show icon background |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size |
| `classes` | `object` | `{}` | Custom CSS classes |

### IconList Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `IconListItemData[]` | Required | Array of items to display |
| `columns` | `1 \| 2 \| 3` | `1` | Number of columns (responsive) |
| `iconColor` | `'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'custom'` | `'primary'` | Icon color scheme for all items |
| `iconBg` | `boolean` | `true` | Whether to show icon backgrounds |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size for all items |
| `spacing` | `'tight' \| 'normal' \| 'loose'` | `'normal'` | Spacing between items |
| `classes` | `object` | `{}` | Custom CSS classes |

## Sub-Bullet Support

### IconListItemWithSubBullets Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `string` | `'tabler:check'` | Icon name (using astro-icon) |
| `title` | `string` | Required | Item title |
| `description` | `string` | Optional | Main description (supports HTML) |
| `subBullets` | `SubBullet[]` | `[]` | Array of sub-bullet items |
| `iconColor` | `'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'custom'` | `'primary'` | Icon color scheme |
| `iconBg` | `boolean` | `true` | Whether to show icon background |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size |
| `subBulletStyle` | `'bullet' \| 'icon' \| 'dash'` | `'bullet'` | Style for sub-bullets |
| `classes` | `object` | `{}` | Custom CSS classes |

### IconListWithSubBullets Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `IconListItemWithSubBulletsData[]` | Required | Array of items with sub-bullets |
| `columns` | `1 \| 2 \| 3` | `1` | Number of columns (responsive) |
| `iconColor` | `'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'custom'` | `'primary'` | Icon color scheme for all items |
| `iconBg` | `boolean` | `true` | Whether to show icon backgrounds |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size for all items |
| `spacing` | `'tight' \| 'normal' \| 'loose'` | `'normal'` | Spacing between items |
| `subBulletStyle` | `'bullet' \| 'icon' \| 'dash'` | `'bullet'` | Style for sub-bullets |
| `classes` | `object` | `{}` | Custom CSS classes |

### IconListItemSlot Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `string` | `'tabler:check'` | Icon name (using astro-icon) |
| `title` | `string` | Required | Item title |
| `iconColor` | `'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'custom'` | `'primary'` | Icon color scheme |
| `iconBg` | `boolean` | `true` | Whether to show icon background |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size |
| `classes` | `object` | `{}` | Custom CSS classes |

## Data Structure

### IconListItemData

```typescript
interface IconListItemData {
  icon?: string;
  title: string;
  description: string;
}
```

### SubBullet

```typescript
interface SubBullet {
  text: string;
  icon?: string; // Optional custom icon for 'icon' style
}
```

### IconListItemWithSubBulletsData

```typescript
interface IconListItemWithSubBulletsData {
  icon?: string;
  title: string;
  description?: string;
  subBullets?: SubBullet[];
}
```

## Usage Examples

### Basic Single Item

```astro
---
import IconListItem from '~/components/ui/IconListItem.astro';
---

<IconListItem
  icon="tabler:heart"
  title="Process and reframe your story"
  description="Gently revisit past experiences, reframe your narrative, and create space for healing."
/>
```

### List with Multiple Items

```astro
---
import IconList from '~/components/ui/IconList.astro';

const therapyItems = [
  {
    title: 'Explore your present and your potential',
    description: 'Understand where you are now, clarify where you want to go, and identify what might be holding you back.',
    icon: 'tabler:compass',
  },
  {
    title: 'Process and reframe your story',
    description: 'Gently revisit past experiences, reframe your narrative, and create space for healing.',
    icon: 'tabler:heart',
  },
  // ... more items
];
---

<IconList
  items={therapyItems}
  columns={2}
  iconColor="primary"
  size="md"
  spacing="normal"
/>
```

### Custom Styling

```astro
<IconListItem
  icon="tabler:star"
  title="Custom Styled Item"
  description="This item has custom styling applied."
  classes={{
    container: 'bg-blue-50 p-4 rounded-lg',
    iconWrapper: 'shadow-lg',
    title: 'text-blue-900',
    description: 'text-blue-700'
  }}
/>
```

### Basic Sub-Bullets with Structured Data

```astro
---
import IconListWithSubBullets from '~/components/ui/IconListWithSubBullets.astro';

const sessionData = [
  {
    title: 'Beginner Session (30 minutes): Planting Seeds',
    description: 'Start your Human Design journey by planting the seeds of self-awareness.',
    icon: 'tabler:seedling',
    subBullets: [
      { text: 'A clear introduction to the core aspects of your chart' },
      { text: 'Simple, actionable insights to begin living your design' },
      { text: 'Guidance on how to notice your body\'s natural responses' },
    ]
  }
];
---

<IconListWithSubBullets
  items={sessionData}
  columns={1}
  iconColor="primary"
  subBulletStyle="bullet"
/>
```

### Custom Sub-Bullets with Icons

```astro
<IconListItemWithSubBullets
  icon="tabler:star"
  title="Advanced Features"
  description="Comprehensive analysis includes:"
  iconColor="primary"
  subBulletStyle="icon"
  subBullets={[
    { text: 'Chart analysis', icon: 'tabler:chart-bar' },
    { text: 'Personal insights', icon: 'tabler:lightbulb' },
    { text: 'Action steps', icon: 'tabler:target' },
  ]}
/>
```

### Flexible Content with Slots

```astro
<IconListItemSlot
  icon="tabler:seedling"
  title="Custom Formatted Content"
  iconColor="success"
>
  <p class="mb-3">
    Your main description with full HTML support, including <strong>bold text</strong> 
    and <em>italic text</em>.
  </p>
  
  <div class="bg-blue-50 dark:bg-slate-700 rounded-lg p-4">
    <h4 class="font-semibold mb-2">What's Included:</h4>
    <ul class="space-y-2">
      <li class="flex items-start gap-2">
        <span class="text-green-600 font-medium mt-0.5">✓</span>
        <span>Custom formatted bullet with checkmark</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="text-blue-600 font-medium mt-0.5">→</span>
        <span>Arrow-style bullet point</span>
      </li>
    </ul>
  </div>
</IconListItemSlot>
```

## Color Schemes

The components use CSS custom properties from `CustomStyles.astro`:

- **Primary**: `--color-primary` (Brand color)
- **Secondary**: `--color-secondary` (Supporting color)
- **Accent**: `--color-accent` (Highlights/CTAs)
- **Success**: Green color scheme
- **Warning**: Yellow color scheme
- **Custom**: No predefined colors (full control via classes)

## Responsive Behavior

### Columns
- `columns={1}`: Single column on all screen sizes
- `columns={2}`: Single column on mobile, 2 columns on md+ screens
- `columns={3}`: Single column on mobile, 2 columns on md screens, 3 columns on lg+ screens

### Sizes
- **Small (`sm`)**: Compact for dense layouts
- **Medium (`md`)**: Balanced default size
- **Large (`lg`)**: Prominent for hero sections

## Accessibility

The components are designed with accessibility in mind:
- Proper heading hierarchy (`h3` for titles)
- Semantic HTML structure
- High contrast color combinations
- Screen reader friendly markup
- Keyboard navigation support (when used with interactive elements)

## SEO Considerations

- Use descriptive titles for better content understanding
- Descriptions support HTML for rich formatting
- Proper heading structure helps with content hierarchy
- Fast loading with optimized CSS classes

## Demo Pages

Visit `/icon-list-demo` and `/therapy-example` to see the components in action with various configurations.

## When to Use Each Approach

### Structured Sub-Bullets (`IconListWithSubBullets`)

**Best for:**

- Consistent formatting across multiple items
- Data-driven content from CMS or API
- Service packages or feature lists
- Process steps with details

**Example use cases:**

- Therapy session packages
- Software feature lists
- Course curricula
- Service offerings

### Slot-Based Content (`IconListItemSlot`)

**Best for:**

- Complex custom layouts
- Mixed content types (text, images, buttons)
- Unique formatting requirements
- Rich HTML content

**Example use cases:**

- Landing page hero sections
- Product showcases
- Testimonials with custom formatting
- Call-to-action sections

### Individual Items (`IconListItemWithSubBullets`)

**Best for:**

- Single items that need sub-bullets
- Mixed layouts where only some items have sub-bullets
- Custom implementations

**Example use cases:**

- FAQ sections
- Single service descriptions
- Process step details
