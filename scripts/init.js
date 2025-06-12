#!/usr/bin/env node

import { readFileSync, writeFileSync, unlinkSync, statSync, rmSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import inquirer from 'inquirer';
import yaml from 'js-yaml';

// Helper function to handle prompts with defaults when -y flag is used
function promptWithDefaults(questions, useDefaults) {
  if (useDefaults) {
    // Return an object with default values for all questions
    const defaults = {};
    questions.forEach((question) => {
      if (question.type === 'checkbox') {
        // For checkboxes, use the default array if provided, otherwise select checked items
        if (question.default && Array.isArray(question.default)) {
          defaults[question.name] = question.default;
        } else {
          defaults[question.name] = question.choices.filter((choice) => choice.checked).map((choice) => choice.value);
        }
      } else {
        defaults[question.name] = question.default !== undefined ? question.default : '';
      }
    });
    return Promise.resolve(defaults);
  }
  return inquirer.prompt(questions);
}

// Helper function to run git commands
function runGitCommand(command, description = '') {
  try {
    console.log(description ? `${description}...` : `Running: ${command}`);
    execSync(command, { cwd: process.cwd(), stdio: 'pipe' });
    return true;
  } catch (error) {
    console.log(`❌ Failed to ${description || 'run git command'}: ${error.message}`);
    return false;
  }
}

// Helper function to delete files and directories recursively
function deleteRecursively(path) {
  try {
    rmSync(path, { recursive: true, force: true });
  } catch (err) {
    console.log(`Note: Could not delete ${path} - ${err.message}`);
  }
}

// Safety mechanism to prevent running on the original template repository
function isTemplateRepository() {
  try {
    // Check for .template-repo marker file (primary safety check)
    const templateMarkerPath = join(process.cwd(), '.template-repo');
    try {
      statSync(templateMarkerPath);
      return true; // File exists, this is the template repository
    } catch {
      // File doesn't exist, continue with other checks
    }
    return false;
  } catch {
    console.log('Warning: Could not determine if this is a template repository');
    return false;
  }
}

async function main() {
  // Check for -y flag to accept all defaults
  const useDefaults = process.argv.includes('-y') || process.argv.includes('--yes');

  console.log('🚀 Welcome to AstroWind Setup!');
  console.log('This script will help you configure your new Astro project.\n');

  if (useDefaults) {
    console.log('🏃 Running with default settings (using -y flag)\n');
  }

  // Safety check to prevent running on the original template repository
  if (isTemplateRepository()) {
    console.log('🛑 SAFETY CHECK FAILED');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('This appears to be the original AstroWind template repository.');
    console.log('The init script should only be run on a copy/fork of the template,');
    console.log('not on the template itself to avoid accidental modifications.');
    console.log('');
    console.log('To use this template:');
    console.log('1. Fork or download this repository');
    console.log('2. Create a new directory for your project');
    console.log('3. Copy the template files to your new directory');
    console.log('4. Run the init script in your new project directory');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('');

    const { forceRun } = useDefaults
      ? { forceRun: false } // Always decline when using defaults for safety
      : await inquirer.prompt([
          {
            type: 'confirm',
            name: 'forceRun',
            message: '⚠️  Are you absolutely sure you want to continue? This will modify the template repository.',
            default: false,
          },
        ]);

    if (!forceRun) {
      console.log('✅ Good choice! Setup cancelled to protect the template repository.');
      process.exit(0);
    }

    console.log('🔥 Proceeding with template repository modification...\n');
  }

  try {
    // 1. Git Initialization
    console.log('🔄 Initializing Git Repository');

    // Check if we're in a git repo and if .git exists
    let gitExists = false;
    try {
      gitExists = statSync(join(process.cwd(), '.git')).isDirectory();
    } catch {
      // .git directory doesn't exist, which is fine
    }

    if (gitExists) {
      console.log('Removing existing git history...');
      deleteRecursively(join(process.cwd(), '.git'));
    }

    // Initialize new git repo
    if (!runGitCommand('git init', '📦 Initializing new git repository')) {
      throw new Error('Failed to initialize git repository');
    }

    // Add all files for initial commit
    if (!runGitCommand('git add .', '📁 Adding all files to git')) {
      throw new Error('Failed to add files to git');
    }

    // Create initial commit
    if (!runGitCommand('git commit -m "Initial commit: AstroWind template"', '💾 Creating initial commit')) {
      throw new Error('Failed to create initial commit');
    }

    console.log('✅ Git repository initialized with initial commit\n');

    // 1. Site Configuration
    console.log('🌐 Site Configuration');
    const siteConfig = await promptWithDefaults(
      [
        {
          type: 'input',
          name: 'name',
          message: 'What is your site name?',
          default: 'My Awesome Site',
          validate: (input) => (input.trim() ? true : 'Site name is required'),
        },
        {
          type: 'input',
          name: 'site',
          message: 'What is your site URL? (e.g., https://example.com)',
          default: 'https://example.com',
          validate: (input) => {
            try {
              new URL(input);
              return true;
            } catch {
              return 'Please enter a valid URL (including https://)';
            }
          },
        },
        {
          type: 'input',
          name: 'description',
          message: 'Enter a brief description of your site:',
          default: 'A modern, fast, and accessible website built with Astro and Tailwind CSS.',
          validate: (input) => (input.trim() ? true : 'Description is required'),
        },
        {
          type: 'input',
          name: 'twitterHandle',
          message: 'Twitter handle (optional, e.g., @yourusername):',
          default: '',
          filter: (input) => {
            if (!input.trim()) return '';
            return input.startsWith('@') ? input : `@${input}`;
          },
        },
        {
          type: 'input',
          name: 'googleSiteVerificationId',
          message: 'Google Site Verification ID (optional):',
          default: '',
        },
      ],
      useDefaults
    );

    console.log(`✅ Site configured: ${siteConfig.name} at ${siteConfig.site}\n`);

    // 2. Contact Information Configuration
    console.log('📞 Contact Information Configuration');
    const contactInfo = await promptWithDefaults(
      [
        {
          type: 'input',
          name: 'address',
          message: 'Business address (optional):',
          default: '',
        },
        {
          type: 'input',
          name: 'phone',
          message: 'Phone number (optional):',
          default: '',
        },
        {
          type: 'input',
          name: 'email',
          message: 'Contact email (optional):',
          default: '',
        },
      ],
      useDefaults
    );

    console.log(`✅ Contact information configured\n`);

    // 3. Configure Plausible Analytics
    console.log('📊 Analytics Configuration');
    const { usePlausible } = await promptWithDefaults(
      [
        {
          type: 'confirm',
          name: 'usePlausible',
          message: 'Do you want to use Plausible Analytics?',
          default: false,
        },
      ],
      useDefaults
    );

    let plausibleConfig = {
      domain: null,
      src: null,
    };

    if (usePlausible) {
      // Ask for domain
      const { domain } = await promptWithDefaults(
        [
          {
            type: 'input',
            name: 'domain',
            message: 'Enter your Plausible domain (e.g., bluerainlily.com):',
            default: 'example.com',
            validate: (input) => {
              if (!input.trim()) return 'Please provide a domain';
              // Basic domain validation
              if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.trim())) {
                return 'Please provide a valid domain (e.g., example.com)';
              }
              return true;
            },
          },
        ],
        useDefaults
      );

      // Ask for optional measurements
      const { measurements } = await promptWithDefaults(
        [
          {
            type: 'checkbox',
            name: 'measurements',
            message: 'Select optional measurements to track:',
            choices: [
              { name: 'Outbound links', value: 'outbound-links', checked: true },
              { name: 'File downloads', value: 'file-downloads', checked: false },
              { name: '404 error pages', value: '404-errors', checked: true },
              { name: 'Hashed page paths', value: 'hash', checked: true },
              { name: 'Custom events', value: 'tagged-events', checked: false },
              { name: 'Custom properties', value: 'pageview-props', checked: false },
              { name: 'Ecommerce revenue', value: 'revenue', checked: false },
            ],
          },
        ],
        useDefaults
      );

      // Build the script src based on selected measurements
      const baseUrl = 'https://analytics.webtownhero.com/js/script';
      let scriptExtensions = [];

      // Map measurement values to script extensions
      const extensionMap = {
        'outbound-links': 'outbound-links',
        'file-downloads': 'file-downloads',
        '404-errors': null, // This adds the window.plausible script instead
        hash: 'hash',
        'tagged-events': 'tagged-events',
        'pageview-props': 'pageview-props',
        revenue: 'revenue',
      };

      measurements.forEach((measurement) => {
        const extension = extensionMap[measurement];
        if (extension) {
          scriptExtensions.push(extension);
        }
      });

      // Build the script URL
      let scriptSrc = baseUrl;
      if (scriptExtensions.length > 0) {
        scriptSrc += '.' + scriptExtensions.join('.') + '.js';
      } else {
        scriptSrc += '.js';
      }

      plausibleConfig.domain = domain.trim();
      plausibleConfig.src = scriptSrc;

      // Check if 404 error pages tracking is enabled (requires window.plausible)
      plausibleConfig.needs404Script = measurements.includes('404-errors');

      console.log(`✅ Configured Plausible for domain: ${plausibleConfig.domain}`);
      console.log(`📊 Script URL: ${plausibleConfig.src}`);
      if (plausibleConfig.needs404Script) {
        console.log(`📊 Including 404 error tracking script`);
      }
    }

    console.log(`✅ Configured analytics: ${plausibleConfig.domain || 'None'}\n`);

    // 3. Color Palette Configuration
    console.log('🎨 Color Palette Configuration');

    // Helper functions for color manipulation
    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    }

    function rgbToHsl(r, g, b) {
      r /= 255;
      g /= 255;
      b /= 255;
      const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      let h,
        s,
        l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }
      return { h: h * 360, s: s * 100, l: l * 100 };
    }

    function hslToRgb(h, s, l) {
      h /= 360;
      s /= 100;
      l /= 100;
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      if (s === 0) {
        return { r: l * 255, g: l * 255, b: l * 255 };
      }

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      return {
        r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
        g: Math.round(hue2rgb(p, q, h) * 255),
        b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
      };
    }

    function adjustColorForDarkTheme(hex) {
      const rgb = hexToRgb(hex);
      if (!rgb) return hex;

      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      // For dark theme: increase lightness if too dark, maintain saturation
      if (hsl.l < 40) {
        hsl.l = Math.min(hsl.l + 30, 70);
      }

      const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
      return `#${Math.round(newRgb.r).toString(16).padStart(2, '0')}${Math.round(newRgb.g).toString(16).padStart(2, '0')}${Math.round(newRgb.b).toString(16).padStart(2, '0')}`;
    }

    function parseColorsUrl(url) {
      try {
        // Handle different Coolors URL formats
        let match = url.match(/coolors\.co\/(.+)$/);
        if (!match) return null;

        let colorsString = match[1];

        // Remove any path prefixes like 'palette/' or 'u/'
        colorsString = colorsString.replace(/^(palette\/|u\/[^/]+\/)/, '');

        // Split colors and clean them
        const colors = colorsString
          .split('-')
          .map((c) => c.replace(/[^a-fA-F0-9]/g, '')) // Remove non-hex characters
          .filter((c) => c.length === 6) // Only keep valid 6-character hex codes
          .map((c) => `#${c.toLowerCase()}`);

        if (colors.length < 3) return null;

        console.log(`Parsed colors: ${colors.join(', ')}`);
        return colors;
      } catch (error) {
        console.log(`Error parsing URL: ${error.message}`);
        return null;
      }
    }

    const { useCustomColors } = await promptWithDefaults(
      [
        {
          type: 'confirm',
          name: 'useCustomColors',
          message: 'Do you want to customize your color palette?',
          default: false,
        },
      ],
      useDefaults
    );

    let colorConfig = {
      // Default colors
      primary: '#0161ef',
      secondary: '#0154cf',
      accent: '#6d28d9',
      lightBg: '#ffffff',
      darkBg: '#030620',
      lightText: '#101010',
      darkText: '#e5ecf6',
      lightTextMuted: 'rgb(16 16 16 / 66%)',
      darkTextMuted: 'rgb(229 236 246 / 66%)',
    };

    if (useCustomColors) {
      console.log('\nYou can generate a color palette at https://coolors.co');
      console.log('Example: https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51');

      const { colorInput } = await promptWithDefaults(
        [
          {
            type: 'input',
            name: 'colorInput',
            message: 'Paste your Coolors.co URL or leave blank to use defaults:',
            default: '',
          },
        ],
        useDefaults
      );

      if (colorInput.trim()) {
        const parsedColors = parseColorsUrl(colorInput.trim());
        if (parsedColors && parsedColors.length >= 3) {
          colorConfig.primary = parsedColors[0];
          colorConfig.secondary = parsedColors[1];
          colorConfig.accent = parsedColors[2];

          // Validate hex colors
          const isValidHex = (hex) => /^#[0-9a-fA-F]{6}$/.test(hex);
          if (
            !isValidHex(colorConfig.primary) ||
            !isValidHex(colorConfig.secondary) ||
            !isValidHex(colorConfig.accent)
          ) {
            console.log('❌ Invalid hex colors detected. Using defaults.');
            colorConfig = {
              primary: '#0161ef',
              secondary: '#0154cf',
              accent: '#6d28d9',
              lightBg: '#ffffff',
              darkBg: '#030620',
              lightText: '#101010',
              darkText: '#e5ecf6',
              lightTextMuted: 'rgb(16 16 16 / 66%)',
              darkTextMuted: 'rgb(229 236 246 / 66%)',
            };
          } else {
            // Auto-generate dark theme variants
            const primaryDark = adjustColorForDarkTheme(parsedColors[0]);
            const secondaryDark = adjustColorForDarkTheme(parsedColors[1]);
            const accentDark = adjustColorForDarkTheme(parsedColors[2]);

            console.log(`✅ Parsed ${parsedColors.length} colors from palette`);
            console.log(`   Primary: ${colorConfig.primary} (dark: ${primaryDark})`);
            console.log(`   Secondary: ${colorConfig.secondary} (dark: ${secondaryDark})`);
            console.log(`   Accent: ${colorConfig.accent} (dark: ${accentDark})`);

            // Store dark variants for later use
            colorConfig.primaryDark = primaryDark;
            colorConfig.secondaryDark = secondaryDark;
            colorConfig.accentDark = accentDark;
          }
        } else {
          console.log('❌ Could not parse Coolors.co URL. Please check the format.');
          console.log('   Expected format: https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51');
          console.log('   Using default colors.');
        }
      }
    }

    console.log(`✅ Color palette configured\n`);

    // 4. Social Links Configuration
    console.log('🔗 Social Links Configuration');
    console.log('Enter just your handle/username for each platform (e.g., "webtownhero")');

    const socialHandles = await promptWithDefaults(
      [
        {
          type: 'input',
          name: 'twitter',
          message: 'X (Twitter) handle (optional):',
          default: '',
          validate: (input) => {
            if (!input.trim()) return true;
            // Remove @ if present and validate as username
            const handle = input.replace('@', '').trim();
            if (!/^[a-zA-Z0-9_]+$/.test(handle)) {
              return 'Please enter a valid handle (letters, numbers, and underscores only)';
            }
            return true;
          },
          filter: (input) => input.replace('@', '').trim(), // Remove @ if present
        },
        {
          type: 'input',
          name: 'instagram',
          message: 'Instagram handle (optional):',
          default: '',
          validate: (input) => {
            if (!input.trim()) return true;
            const handle = input.replace('@', '').trim();
            if (!/^[a-zA-Z0-9_.]+$/.test(handle)) {
              return 'Please enter a valid handle (letters, numbers, dots, and underscores only)';
            }
            return true;
          },
          filter: (input) => input.replace('@', '').trim(),
        },
        {
          type: 'input',
          name: 'linkedin',
          message: 'LinkedIn company handle (optional):',
          default: '',
          validate: (input) => {
            if (!input.trim()) return true;
            const handle = input.trim();
            if (!/^[a-zA-Z0-9-]+$/.test(handle)) {
              return 'Please enter a valid company handle (letters, numbers, and hyphens only)';
            }
            return true;
          },
          filter: (input) => input.trim(),
        },
        {
          type: 'input',
          name: 'facebook',
          message: 'Facebook page handle (optional):',
          default: '',
          validate: (input) => {
            if (!input.trim()) return true;
            const handle = input.trim();
            if (!/^[a-zA-Z0-9.]+$/.test(handle)) {
              return 'Please enter a valid page handle (letters, numbers, and dots only)';
            }
            return true;
          },
          filter: (input) => input.trim(),
        },
        {
          type: 'input',
          name: 'github',
          message: 'GitHub username (optional):',
          default: '',
          validate: (input) => {
            if (!input.trim()) return true;
            const handle = input.trim();
            if (!/^[a-zA-Z0-9-]+$/.test(handle)) {
              return 'Please enter a valid username (letters, numbers, and hyphens only)';
            }
            return true;
          },
          filter: (input) => input.trim(),
        },
        {
          type: 'confirm',
          name: 'includeRss',
          message: 'Include RSS feed link?',
          default: false,
        },
      ],
      useDefaults
    );

    // Build full URLs from handles
    const socialLinksConfig = {
      twitter: socialHandles.twitter ? `https://x.com/${socialHandles.twitter}` : '',
      instagram: socialHandles.instagram ? `https://www.instagram.com/${socialHandles.instagram}/` : '',
      linkedin: socialHandles.linkedin ? `https://www.linkedin.com/company/${socialHandles.linkedin}/` : '',
      facebook: socialHandles.facebook ? `https://www.facebook.com/${socialHandles.facebook}` : '',
      github: socialHandles.github ? `https://github.com/${socialHandles.github}` : '',
      includeRss: socialHandles.includeRss,
    };

    console.log(`✅ Social links configured\n`);

    // 5. Select pages to keep
    console.log('\n📄 Page Configuration');
    const availablePages = [
      { name: 'About', value: 'about' },
      { name: 'Contact', value: 'contact' },
      { name: 'Pricing', value: 'pricing' },
      { name: 'Services', value: 'services' },
    ];

    const { selectedPages } = await promptWithDefaults(
      [
        {
          type: 'checkbox',
          name: 'selectedPages',
          message: 'Which pages do you want to keep?',
          choices: availablePages,
          default: ['about', 'contact'],
        },
      ],
      useDefaults
    );

    console.log(`✅ Keeping pages: ${selectedPages.join(', ')}`);

    // 5b. Select footer-only pages
    console.log('\n📄 Footer-Only Page Configuration');
    const footerOnlyPages = [
      { name: 'Terms of Service', value: 'terms' },
      { name: 'Privacy Policy', value: 'privacy' },
    ];

    const { selectedFooterPages } = await promptWithDefaults(
      [
        {
          type: 'checkbox',
          name: 'selectedFooterPages',
          message: 'Which footer-only pages do you want to include? (These will only appear in footer navigation)',
          choices: footerOnlyPages,
          default: ['terms', 'privacy'],
        },
      ],
      useDefaults
    );

    console.log(`✅ Footer-only pages: ${selectedFooterPages.join(', ')}`);

    // Combine all selected pages for file management
    const allSelectedPages = [...selectedPages, ...selectedFooterPages];

    // 6. Select home page template
    console.log('\n🏠 Home Page Template Selection');
    const homeTemplates = [
      // { name: 'SaaS', value: 'saas' },
      // { name: 'Startup', value: 'startup' },
      // { name: 'Mobile App', value: 'mobile-app' },
      // { name: 'Personal', value: 'personal' },
      { name: 'Counseling', value: 'counseling' },
      { name: 'Beach Club', value: 'beach' },
    ];

    const { selectedHome } = await promptWithDefaults(
      [
        {
          type: 'list',
          name: 'selectedHome',
          message: 'Which home page template do you want to use?',
          choices: homeTemplates,
          default: 'counseling',
        },
      ],
      useDefaults
    );

    console.log(`✅ Selected home template: ${selectedHome}`);

    // 7. Apply configurations
    console.log('\n⚙️ Applying configurations...');

    // Update config.yaml with site and analytics settings
    const configPath = join(process.cwd(), 'src', 'config.yaml');
    const configContent = readFileSync(configPath, 'utf8');
    const config = yaml.load(configContent);

    // Update site configuration
    config.site.name = siteConfig.name;
    config.site.site = siteConfig.site;
    config.site.googleSiteVerificationId = siteConfig.googleSiteVerificationId || '';

    // Add contact information to config
    config.site.contact = {
      address: contactInfo.address || '',
      phone: contactInfo.phone || '',
      email: contactInfo.email || '',
    };

    // Update metadata
    config.metadata.title.default = siteConfig.name;
    config.metadata.title.template = `%s — ${siteConfig.name}`;
    config.metadata.description = siteConfig.description;
    config.metadata.openGraph.site_name = siteConfig.name;

    // Update Twitter handle if provided
    if (siteConfig.twitterHandle) {
      config.metadata.twitter.handle = siteConfig.twitterHandle;
      config.metadata.twitter.site = siteConfig.twitterHandle;
    }

    // Update analytics configuration
    config.analytics.vendors.plausible = plausibleConfig;

    writeFileSync(
      configPath,
      yaml.dump(config, {
        lineWidth: -1,
        noRefs: true,
        quotingType: '"',
      })
    );
    console.log('✅ Updated site configuration and analytics');

    // Update CustomStyles.astro with color palette
    const customStylesPath = join(process.cwd(), 'src', 'components', 'CustomStyles.astro');
    let customStylesContent = readFileSync(customStylesPath, 'utf8');

    // Helper function to convert hex to rgb format
    function hexToRgbString(hex) {
      const result = hexToRgb(hex);
      return result ? `rgb(${result.r} ${result.g} ${result.b})` : `rgb(1 97 239)`; // fallback
    }

    // Replace color values in the :root section (light theme)
    customStylesContent = customStylesContent.replace(
      /(--color-primary:\s*)rgb\([^)]+\)(;)/,
      `$1${hexToRgbString(colorConfig.primary)}$2`
    );
    customStylesContent = customStylesContent.replace(
      /(--color-secondary:\s*)rgb\([^)]+\)(;)/,
      `$1${hexToRgbString(colorConfig.secondary)}$2`
    );
    customStylesContent = customStylesContent.replace(
      /(--color-accent:\s*)rgb\([^)]+\)(;)/,
      `$1${hexToRgbString(colorConfig.accent)}$2`
    );

    // Replace color values in the .dark section using a more targeted approach
    const darkSectionRegex = /(\.dark\s*{[^}]*)(--color-primary:\s*)rgb\([^)]+\)(;[^}]*})/s;
    if (colorConfig.primaryDark && darkSectionRegex.test(customStylesContent)) {
      customStylesContent = customStylesContent.replace(
        darkSectionRegex,
        `$1$2${hexToRgbString(colorConfig.primaryDark)}$3`
      );
    }

    const darkSecondarySectionRegex = /(\.dark\s*{[^}]*)(--color-secondary:\s*)rgb\([^)]+\)(;[^}]*})/s;
    if (colorConfig.secondaryDark && darkSecondarySectionRegex.test(customStylesContent)) {
      customStylesContent = customStylesContent.replace(
        darkSecondarySectionRegex,
        `$1$2${hexToRgbString(colorConfig.secondaryDark)}$3`
      );
    }

    const darkAccentSectionRegex = /(\.dark\s*{[^}]*)(--color-accent:\s*)rgb\([^)]+\)(;[^}]*})/s;
    if (colorConfig.accentDark && darkAccentSectionRegex.test(customStylesContent)) {
      customStylesContent = customStylesContent.replace(
        darkAccentSectionRegex,
        `$1$2${hexToRgbString(colorConfig.accentDark)}$3`
      );
    }

    writeFileSync(customStylesPath, customStylesContent);
    console.log('✅ Updated color palette in CustomStyles.astro');

    // Remove unwanted pages
    const pagesDir = join(process.cwd(), 'src', 'pages');
    const allPages = [
      { file: 'about.astro', key: 'about' },
      { file: 'contact.astro', key: 'contact' },
      { file: 'pricing.astro', key: 'pricing' },
      { file: 'services.astro', key: 'services' },
      { file: 'terms.md', key: 'terms' },
      { file: 'privacy.md', key: 'privacy' },
    ];

    allPages.forEach(({ file, key }) => {
      if (!allSelectedPages.includes(key)) {
        const pagePath = join(pagesDir, file);
        try {
          unlinkSync(pagePath);
          console.log(`✅ Removed ${file}`);
        } catch (err) {
          console.log(`⚠️ Could not remove ${file}: ${err.message}`);
        }
      }
    });

    // Replace index.astro with selected home template
    const selectedHomePath = join(pagesDir, 'homes', `${selectedHome}.astro`);
    const indexPath = join(pagesDir, 'index.astro');

    try {
      if (statSync(selectedHomePath).isFile()) {
        const homeContent = readFileSync(selectedHomePath, 'utf8');
        writeFileSync(indexPath, homeContent);
        console.log(`✅ Replaced index.astro with ${selectedHome} template`);
      }
    } catch (err) {
      console.log(`⚠️ Could not replace index.astro: ${err.message}`);
    }

    // Remove directories that are no longer needed
    const dirsToRemove = [
      join(pagesDir, 'homes'),
      join(pagesDir, '[...blog]'),
      join(pagesDir, 'landing'),
      join(process.cwd(), 'src', 'components', 'blog'),
    ];

    dirsToRemove.forEach((dir) => {
      deleteRecursively(dir);
      console.log(`✅ Removed ${dir.split('/').pop()} directory`);
    });

    // Update navigation.ts to create flattened navigation
    const navigationPath = join(process.cwd(), 'src', 'navigation.ts');
    let navigationContent = readFileSync(navigationPath, 'utf8');

    // Build flattened navigation links with only selected pages
    const pageConfigs = {
      about: { text: 'About', href: "getPermalink('/about')" },
      contact: { text: 'Contact', href: "getPermalink('/contact')" },
      pricing: { text: 'Pricing', href: "getPermalink('/pricing')" },
      services: { text: 'Services', href: "getPermalink('/services')" },
      terms: { text: 'Terms', href: "getPermalink('/terms')" },
      privacy: { text: 'Privacy', href: "getPermalink('/privacy')" },
    };

    // Start with Home as first item
    let flattenedLinks = [
      `    {
      text: 'Home',
      href: getPermalink('/'),
    }`,
    ];

    // Add selected pages
    selectedPages.forEach((page) => {
      if (pageConfigs[page]) {
        flattenedLinks.push(`    {
      text: '${pageConfigs[page].text}',
      href: ${pageConfigs[page].href},
    }`);
      }
    });

    // Replace the entire headerData structure with flattened version
    const newHeaderData = `export const headerData = {
  links: [
${flattenedLinks.join(',\n')}
  ]
};`;

    // Replace the headerData export
    navigationContent = navigationContent.replace(/export const headerData = {[\s\S]*?};/, newHeaderData);

    writeFileSync(navigationPath, navigationContent);
    console.log('✅ Updated navigation configuration');

    // Update social links in navigation
    navigationContent = readFileSync(navigationPath, 'utf8');

    // Build social links array based on user input
    let socialLinks = [];

    if (socialLinksConfig.twitter) {
      socialLinks.push(`    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '${socialLinksConfig.twitter}' }`);
    }
    if (socialLinksConfig.instagram) {
      socialLinks.push(
        `    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '${socialLinksConfig.instagram}' }`
      );
    }
    if (socialLinksConfig.linkedin) {
      socialLinks.push(
        `    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: '${socialLinksConfig.linkedin}' }`
      );
    }
    if (socialLinksConfig.facebook) {
      socialLinks.push(
        `    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '${socialLinksConfig.facebook}' }`
      );
    }
    if (socialLinksConfig.includeRss) {
      socialLinks.push(`    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') }`);
    }
    if (socialLinksConfig.github) {
      socialLinks.push(`    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: '${socialLinksConfig.github}' }`);
    }

    // Replace the socialLinks array
    if (socialLinks.length > 0) {
      const newSocialLinks = `  socialLinks: [
${socialLinks.join(',\n')}
  ],`;

      navigationContent = navigationContent.replace(/socialLinks:\s*\[[\s\S]*?\],/, newSocialLinks);
    } else {
      // Remove socialLinks entirely if none configured
      navigationContent = navigationContent.replace(/socialLinks:\s*\[[\s\S]*?\],\s*/, '');
    }

    writeFileSync(navigationPath, navigationContent);
    console.log('✅ Updated social links configuration');

    // Update footer data to include header links and remove extra sections
    navigationContent = readFileSync(navigationPath, 'utf8');

    // Build footer links structure with header links
    let footerLinksArray = [];

    // Create "Pages" section with header links
    if (selectedPages.length > 0) {
      let pageLinks = [];

      // Add home link
      pageLinks.push("{ text: 'Home', href: getPermalink('/') }");

      // Add selected pages
      selectedPages.forEach((page) => {
        if (pageConfigs[page]) {
          pageLinks.push(`{ text: '${pageConfigs[page].text}', href: ${pageConfigs[page].href} }`);
        }
      });

      footerLinksArray.push(`    {
      title: 'Pages',
      links: [
        ${pageLinks.join(',\n        ')}
      ]
    }`);
    }

    // Build Legal section for footer if legal pages are selected
    if (selectedFooterPages.includes('terms') || selectedFooterPages.includes('privacy')) {
      let legalLinks = [];
      if (selectedFooterPages.includes('terms')) {
        legalLinks.push("{ text: 'Terms', href: getPermalink('/terms') }");
      }
      if (selectedFooterPages.includes('privacy')) {
        legalLinks.push("{ text: 'Privacy Policy', href: getPermalink('/privacy') }");
      }

      footerLinksArray.push(`    {
      title: 'Legal',
      links: [
        ${legalLinks.join(',\n        ')}
      ]
    }`);
    }

    // Build footer secondary links - keeping empty for now since legal moved to main links
    let footerSecondaryLinks = [];

    // Build social links array based on user input
    let footerSocialLinks = [];
    if (socialLinksConfig.twitter) {
      footerSocialLinks.push(`{ ariaLabel: 'X', icon: 'tabler:brand-x', href: '${socialLinksConfig.twitter}' }`);
    }
    if (socialLinksConfig.instagram) {
      footerSocialLinks.push(
        `{ ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '${socialLinksConfig.instagram}' }`
      );
    }
    if (socialLinksConfig.linkedin) {
      footerSocialLinks.push(
        `{ ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: '${socialLinksConfig.linkedin}' }`
      );
    }
    if (socialLinksConfig.facebook) {
      footerSocialLinks.push(
        `{ ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '${socialLinksConfig.facebook}' }`
      );
    }
    if (socialLinksConfig.github) {
      footerSocialLinks.push(
        `{ ariaLabel: 'Github', icon: 'tabler:brand-github', href: '${socialLinksConfig.github}' }`
      );
    }
    if (socialLinksConfig.includeRss) {
      footerSocialLinks.push(`{ ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') }`);
    }

    // Create complete footer data structure
    const newFooterData = `export const footerData = {
  links: [
${footerLinksArray.join(',\n')}
  ],
  secondaryLinks: [
    ${footerSecondaryLinks.join(',\n    ')}
  ],
  socialLinks: [
    ${footerSocialLinks.join(',\n    ')}
  ],
  footNote: \`\`,
};`;

    // Replace the entire footerData export
    navigationContent = navigationContent.replace(/export const footerData = {[\s\S]*?};/, newFooterData);

    writeFileSync(navigationPath, navigationContent);
    console.log('✅ Updated footer data with header links');

    // Disable blog in config if blog was removed
    config.apps.blog.isEnabled = false;
    writeFileSync(
      configPath,
      yaml.dump(config, {
        lineWidth: -1,
        noRefs: true,
        quotingType: '"',
      })
    );
    console.log('✅ Disabled blog configuration');

    // Create final commit with user configurations
    console.log('\n💾 Committing your customizations...');
    if (!runGitCommand('git add .', '📁 Adding configuration changes')) {
      console.log('⚠️ Warning: Could not add changes to git');
    } else if (
      !runGitCommand(
        `git commit -m "feat: Configure project - Site: ${siteConfig.name}, Analytics: ${plausibleConfig.domain || 'none'}, Pages: ${selectedPages.join(',')}, Home: ${selectedHome}"`,
        '💾 Creating configuration commit'
      )
    ) {
      console.log('⚠️ Warning: Could not create configuration commit');
    } else {
      console.log('✅ Configuration changes committed to git');
    }

    console.log('\n🎉 Setup complete!');
    console.log('\nYour Astro project has been configured with:');
    console.log(`🌐 Site: ${siteConfig.name} (${siteConfig.site})`);

    // Show configured contact information
    const configuredContact = [];
    if (contactInfo.address) configuredContact.push('Address');
    if (contactInfo.phone) configuredContact.push('Phone');
    if (contactInfo.email) configuredContact.push('Email');

    if (configuredContact.length > 0) {
      console.log(`📞 Contact Info: ${configuredContact.join(', ')}`);
    }

    if (plausibleConfig.domain) {
      console.log(`📊 Plausible Analytics: ${plausibleConfig.domain}`);
    }
    if (colorConfig.primary !== '#0161ef') {
      console.log(
        `🎨 Custom Color Palette: Primary ${colorConfig.primary}, Secondary ${colorConfig.secondary}, Accent ${colorConfig.accent}`
      );
    }

    // Show configured social links
    const configuredSocial = [];
    if (socialLinksConfig.twitter) configuredSocial.push('X');
    if (socialLinksConfig.instagram) configuredSocial.push('Instagram');
    if (socialLinksConfig.linkedin) configuredSocial.push('LinkedIn');
    if (socialLinksConfig.facebook) configuredSocial.push('Facebook');
    if (socialLinksConfig.github) configuredSocial.push('GitHub');
    if (socialLinksConfig.includeRss) configuredSocial.push('RSS');

    if (configuredSocial.length > 0) {
      console.log(`🔗 Social Links: ${configuredSocial.join(', ')}`);
    }

    console.log(`📄 Pages: ${selectedPages.join(', ')}`);
    if (selectedFooterPages.length > 0) {
      console.log(`📄 Footer-only pages: ${selectedFooterPages.join(', ')}`);
    }
    console.log(`🏠 Home template: ${selectedHome}`);

    console.log('\nNext steps:');
    console.log('1. Run `pnpm install` to install dependencies');
    console.log('2. Run `pnpm dev` to start the development server');
    console.log('3. Customize your content and styling as needed');
  } catch (error) {
    console.error('❌ An error occurred during setup:', error.message);
    process.exit(1);
  }
}

main();
