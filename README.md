# 🚀 AstroWind Fork

[Original Readme](https://github.com/onwidget/astrowind/blob/main/README.md)

## Quick Start

1. Clone this repository (for private template usage):

   ```bash
   git clone https://github.com/Web-Town-Hero/astrowind-fork.git my-project-name
   cd my-project-name
   ```

   Or create a new project using this template:

   ```bash
   pnpm create astro@latest my-project-name -- --template Web-Town-Hero/astrowind
   cd my-project-name
   ```

   Or in one go

   ```
   rm -rf brl && git clone https://github.com/Web-Town-Hero/astrowind-fork brl && cd brl && pnpm i && pnpm run init

   cd .. && rm -rf brl && git clone https://github.com/Web-Town-Hero/astrowind-fork brl && cd brl && pnpm i && pnpm run init -y && pnpm dev
   ```

2. Run the initialization script:

   ```bash
   pnpm run init
   ```

3. Pick up latest changes from the template repo:

   ```bash
   pnpm update-template
   ```

The initialization script will:

1. **Git Setup**: Remove existing git history and create a fresh repository with an initial commit
2. **Site Configuration**: Set your site name, URL, description, and metadata
3. **Analytics Setup**: Configure Plausible Analytics with domain and optional tracking features
4. **Color Palette**: Customize your color scheme using Coolors.co URLs or defaults
5. **Social Links**: Configure X (Twitter), Instagram, Facebook, GitHub, and RSS links
6. **Page Selection**: Choose which pages to keep using an interactive checklist
7. **Home Template**: Select from available home page templates using a dropdown menu
8. **Final Commit**: Create a second commit with all your customizations

The script will automatically:

- Update your analytics configuration
- Remove unused pages and navigation links
- Replace the home page with your selected template
- Clean up unused template files and blog components
- Create a clean git history with two commits: initial template and your configurations

### Commands

All commands are run from the root of the project, from a terminal:

| Command             | Action                                             |
| :------------------ | :------------------------------------------------- |
| `pnpm run init`      | Run interactive setup script (for new projects)   |
| `pnpm install`       | Installs dependencies                              |
| `pnpm run dev`       | Starts local dev server at `localhost:4321`        |
| `pnpm run build`     | Build your production site to `./dist/`            |
| `pnpm run preview`   | Preview your build locally, before deploying       |
| `pnpm run check`     | Check your project for errors                      |
| `pnpm run fix`       | Run Eslint and format codes with Prettier          |
| `pnpm run astro ...` | Run CLI commands like `astro add`, `astro preview` |

<br>

### Configuration

Basic configuration file: `./src/config.yaml`

```yaml
site:
  name: 'Example'
  site: 'https://example.com'
  base: '/' # Change this if you need to deploy to Github Pages, for example
  trailingSlash: false # Generate permalinks with or without "/" at the end

  googleSiteVerificationId: false # Or some value,

# Default SEO metadata
metadata:
  title:
    default: 'Example'
    template: '%s — Example'
  description: 'This is the default meta description of Example website'
  robots:
    index: true
    follow: true
  openGraph:
    site_name: 'Example'
    images:
      - url: '~/assets/images/default.png'
        width: 1200
        height: 628
    type: website
  twitter:
    handle: '@twitter_user'
    site: '@twitter_user'
    cardType: summary_large_image

i18n:
  language: en
  textDirection: ltr

apps:
  blog:
    isEnabled: true # If the blog will be enabled
    postsPerPage: 6 # Number of posts per page

    post:
      isEnabled: true
      permalink: '/blog/%slug%' # Variables: %slug%, %year%, %month%, %day%, %hour%, %minute%, %second%, %category%
      robots:
        index: true

    list:
      isEnabled: true
      pathname: 'blog' # Blog main path, you can change this to "articles" (/articles)
      robots:
        index: true

    category:
      isEnabled: true
      pathname: 'category' # Category main path /category/some-category, you can change this to "group" (/group/some-category)
      robots:
        index: true

    tag:
      isEnabled: true
      pathname: 'tag' # Tag main path /tag/some-tag, you can change this to "topics" (/topics/some-category)
      robots:
        index: false

    isRelatedPostsEnabled: true # If a widget with related posts is to be displayed below each post
    relatedPostsCount: 4 # Number of related posts to display

analytics:
  vendors:
    googleAnalytics:
      id: null # or "G-XXXXXXXXXX"
    plausible:
      domain: null # or "yourdomain.com"
      src: null # or "https://plausible.io/js/script.js" or your custom plausible instance

ui:
  theme: 'system' # Values: "system" | "light" | "dark" | "light:only" | "dark:only"
```

# Color Palette tools

- <https://coolors.co/>
- <https://contrast-grid.eightshapes.com/>

# If using Google Analytics with region banner

See middleware.ts JSDocs, as this relies on cloudflare's SSR rather than static generation.
