#!/usr/bin/env node

import { readFileSync, writeFileSync, unlinkSync, statSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import inquirer from 'inquirer';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

async function main() {
  console.log('🚀 Welcome to AstroWind Setup!');
  console.log('This script will help you configure your new Astro project.\n');

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
    const siteConfig = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your site name?',
        default: 'My Awesome Site',
        validate: (input) => input.trim() ? true : 'Site name is required'
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
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter a brief description of your site:',
        default: 'A modern, fast, and accessible website built with Astro and Tailwind CSS.',
        validate: (input) => input.trim() ? true : 'Description is required'
      },
      {
        type: 'input',
        name: 'twitterHandle',
        message: 'Twitter handle (optional, e.g., @yourusername):',
        default: '',
        filter: (input) => {
          if (!input.trim()) return '';
          return input.startsWith('@') ? input : `@${input}`;
        }
      },
      {
        type: 'input',
        name: 'googleSiteVerificationId',
        message: 'Google Site Verification ID (optional):',
        default: ''
      }
    ]);

    console.log(`✅ Site configured: ${siteConfig.name} at ${siteConfig.site}\n`);

    // 2. Configure Plausible Analytics
    console.log('📊 Analytics Configuration');
    const { usePlausible } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'usePlausible',
        message: 'Do you want to use Plausible Analytics?',
        default: false,
      },
    ]);

    let plausibleConfig = {
      domain: null,
      src: null,
    };

    if (usePlausible) {
      // Ask for domain
      const { domain } = await inquirer.prompt([
        {
          type: 'input',
          name: 'domain',
          message: 'Enter your Plausible domain (e.g., bluerainlily.com):',
          validate: (input) => {
            if (!input.trim()) return 'Please provide a domain';
            // Basic domain validation
            if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.trim())) {
              return 'Please provide a valid domain (e.g., example.com)';
            }
            return true;
          },
        },
      ]);

      // Ask for optional measurements
      const { measurements } = await inquirer.prompt([
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
      ]);

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

    // 3. Select pages to keep
    console.log('\n📄 Page Configuration');
    const availablePages = [
      { name: 'About', value: 'about' },
      { name: 'Contact', value: 'contact' },
      { name: 'Pricing', value: 'pricing' },
      { name: 'Services', value: 'services' },
      { name: 'Terms', value: 'terms' },
      { name: 'Privacy', value: 'privacy' },
    ];

    const { selectedPages } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selectedPages',
        message: 'Which pages do you want to keep?',
        choices: availablePages,
        default: ['about', 'contact'],
      },
    ]);

    console.log(`✅ Keeping pages: ${selectedPages.join(', ')}`);

    // 4. Select home page template
    console.log('\n🏠 Home Page Template Selection');
    const homeTemplates = [
      { name: 'SaaS', value: 'saas' },
      { name: 'Startup', value: 'startup' },
      { name: 'Mobile App', value: 'mobile-app' },
      { name: 'Personal', value: 'personal' },
      { name: 'Counseling', value: 'counseling' },
      { name: 'Beach Club', value: 'beach' },
    ];

    const { selectedHome } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedHome',
        message: 'Which home page template do you want to use?',
        choices: homeTemplates,
        default: 'saas',
      },
    ]);

    console.log(`✅ Selected home template: ${selectedHome}`);

    // 5. Apply configurations
    console.log('\n⚙️ Applying configurations...');

    // Update config.yaml with site and analytics settings
    const configPath = join(process.cwd(), 'src', 'config.yaml');
    const configContent = readFileSync(configPath, 'utf8');
    const config = yaml.load(configContent);

    // Update site configuration
    config.site.name = siteConfig.name;
    config.site.site = siteConfig.site;
    config.site.googleSiteVerificationId = siteConfig.googleSiteVerificationId || '';

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
    console.log('✅ Updated analytics configuration');

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
      if (!selectedPages.includes(key)) {
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

    // Update footer secondaryLinks to only include selected pages
    navigationContent = readFileSync(navigationPath, 'utf8');

    // Build footer secondary links based on selected pages
    let footerSecondaryLinks = [];
    if (selectedPages.includes('terms')) {
      footerSecondaryLinks.push("{ text: 'Terms', href: getPermalink('/terms') }");
    }
    if (selectedPages.includes('privacy')) {
      footerSecondaryLinks.push("{ text: 'Privacy Policy', href: getPermalink('/privacy') }");
    }

    // Update the secondaryLinks in footerData
    if (footerSecondaryLinks.length > 0) {
      const newSecondaryLinks = `  secondaryLinks: [
    ${footerSecondaryLinks.join(',\n    ')}
  ],`;

      navigationContent = navigationContent.replace(/secondaryLinks:\s*\[[\s\S]*?\],/, newSecondaryLinks);
    } else {
      // Remove secondaryLinks entirely if no terms/privacy pages
      navigationContent = navigationContent.replace(/secondaryLinks:\s*\[[\s\S]*?\],\s*/, '');
    }

    writeFileSync(navigationPath, navigationContent);
    console.log('✅ Updated footer navigation configuration');

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
    if (plausibleConfig.domain) {
      console.log(`📊 Plausible Analytics: ${plausibleConfig.domain}`);
    }
    console.log(`📄 Pages: ${selectedPages.join(', ')}`);
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
