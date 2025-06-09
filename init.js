#!/usr/bin/env node

import { readFileSync, writeFileSync, unlinkSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Helper function to ask questions
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Helper function to ask multiple choice questions
async function askMultipleChoice(question, choices, allowMultiple = false) {
  console.log(`\n${question}`);
  choices.forEach((choice, index) => {
    console.log(`${index + 1}. ${choice}`);
  });

  const prompt = allowMultiple
    ? `Enter numbers separated by commas (e.g., 1,3,4): `
    : `Enter your choice (1-${choices.length}): `;

  const answer = await askQuestion(prompt);

  if (allowMultiple) {
    return answer
      .split(',')
      .map((num) => parseInt(num.trim()) - 1)
      .filter((num) => num >= 0 && num < choices.length);
  } else {
    const choice = parseInt(answer) - 1;
    return choice >= 0 && choice < choices.length ? choice : 0;
  }
}

// Helper function to delete files and directories recursively
function deleteRecursively(path) {
  try {
    const stats = statSync(path);
    if (stats.isDirectory()) {
      const files = readdirSync(path);
      files.forEach((file) => {
        deleteRecursively(join(path, file));
      });
      // Remove the directory itself (this will fail silently if not empty)
      try {
        unlinkSync(path);
      } catch (e) {
        // Directory might not be empty, that's okay
      }
    } else {
      unlinkSync(path);
    }
  } catch (err) {
    console.log(`Note: Could not delete ${path} - ${err.message}`);
  }
}

async function main() {
  console.log('🚀 Welcome to AstroWind Setup!');
  console.log('This script will help you configure your new Astro project.\n');

  try {
    // 1. Configure Plausible Analytics
    console.log('📊 Analytics Configuration');
    const usePlausible = await askQuestion('Do you want to use Plausible Analytics? (y/n): ');

    let plausibleConfig = {
      domain: null,
      src: null,
    };

    if (usePlausible.toLowerCase() === 'y' || usePlausible.toLowerCase() === 'yes') {
      console.log('\nPlease provide your Plausible analytics snippet.');
      console.log(
        'Example: <script defer data-domain="example.com" src="https://analytics.webtownhero.com/js/script.hash.outbound-links.js"></script>'
      );

      const snippet = await askQuestion('Paste your Plausible script tag: ');

      // Extract domain and src from the snippet
      const domainMatch = snippet.match(/data-domain="([^"]+)"/);
      const srcMatch = snippet.match(/src="([^"]+)"/);

      if (domainMatch && srcMatch) {
        plausibleConfig.domain = domainMatch[1];
        plausibleConfig.src = srcMatch[1];
        console.log(`✅ Configured Plausible for domain: ${plausibleConfig.domain}`);
      } else {
        console.log('❌ Could not parse the script tag. Skipping Plausible configuration.');
      }
    }

    // 2. Select pages to keep
    console.log('\n📄 Page Configuration');
    const availablePages = ['about', 'contact', 'pricing', 'services', 'terms', 'privacy'];
    const selectedPageIndexes = await askMultipleChoice(
      'Which pages do you want to keep? (Select multiple)',
      availablePages,
      true
    );

    const pagesToKeep = selectedPageIndexes.map((index) => availablePages[index]);
    console.log(`✅ Keeping pages: ${pagesToKeep.join(', ')}`);

    // 3. Select home page template
    console.log('\n🏠 Home Page Template Selection');
    const homeTemplates = ['saas', 'startup', 'mobile-app', 'personal', 'counseling', 'beach'];
    const selectedHomeIndex = await askMultipleChoice(
      'Which home page template do you want to use?',
      homeTemplates.map((t) => t.charAt(0).toUpperCase() + t.slice(1).replace('-', ' ')),
      false
    );

    const selectedHome = homeTemplates[selectedHomeIndex];
    console.log(`✅ Selected home template: ${selectedHome}`);

    // 4. Apply configurations
    console.log('\n⚙️ Applying configurations...');

    // Update config.yaml with analytics settings
    const configPath = join(process.cwd(), 'src', 'config.yaml');
    const configContent = readFileSync(configPath, 'utf8');
    const config = yaml.load(configContent);

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
    const allPages = ['about.astro', 'contact.astro', 'pricing.astro', 'services.astro', 'terms.md', 'privacy.md'];

    allPages.forEach((page) => {
      const pageBase = page.replace(/\.(astro|md)$/, '');
      if (!pagesToKeep.includes(pageBase)) {
        const pagePath = join(pagesDir, page);
        try {
          unlinkSync(pagePath);
          console.log(`✅ Removed ${page}`);
        } catch (err) {
          console.log(`⚠️ Could not remove ${page}: ${err.message}`);
        }
      }
    });

    // Replace index.astro with selected home template
    const selectedHomePath = join(pagesDir, 'homes', `${selectedHome}.astro`);
    const indexPath = join(pagesDir, 'index.astro');

    if (statSync(selectedHomePath).isFile()) {
      const homeContent = readFileSync(selectedHomePath, 'utf8');
      writeFileSync(indexPath, homeContent);
      console.log(`✅ Replaced index.astro with ${selectedHome} template`);
    }

    // Remove homes directory and blog directory
    const homesDir = join(pagesDir, 'homes');
    const blogDir = join(pagesDir, '[...blog]');
    const landingDir = join(pagesDir, 'landing');

    deleteRecursively(homesDir);
    console.log('✅ Removed homes directory');

    deleteRecursively(blogDir);
    console.log('✅ Removed blog directory');

    deleteRecursively(landingDir);
    console.log('✅ Removed landing directory');

    // Update navigation.ts to remove unused links
    const navigationPath = join(process.cwd(), 'src', 'navigation.ts');
    let navigationContent = readFileSync(navigationPath, 'utf8');

    // Remove the Homes dropdown section
    navigationContent = navigationContent.replace(/{\s*text:\s*'Homes',\s*links:\s*\[[\s\S]*?\],\s*},\s*/, '');

    // Remove the Landing dropdown section
    navigationContent = navigationContent.replace(/{\s*text:\s*'Landing',\s*links:\s*\[[\s\S]*?\],\s*},\s*/, '');

    // Remove the Blog dropdown section
    navigationContent = navigationContent.replace(/{\s*text:\s*'Blog',\s*links:\s*\[[\s\S]*?\],\s*},\s*/, '');

    // Remove unused page links from Pages section based on selected pages
    const pagesToRemove = availablePages.filter((page) => !pagesToKeep.includes(page));
    pagesToRemove.forEach((page) => {
      const patterns = [
        new RegExp(
          `\\s*{\\s*text:\\s*'${page.charAt(0).toUpperCase() + page.slice(1)}[^']*',\\s*href:[^}]*},?\\s*`,
          'i'
        ),
        new RegExp(`\\s*{\\s*text:\\s*'${page.charAt(0).toUpperCase() + page.slice(1)}[^']*'[^}]*},?\\s*`, 'i'),
      ];

      patterns.forEach((pattern) => {
        navigationContent = navigationContent.replace(pattern, '');
      });
    });

    writeFileSync(navigationPath, navigationContent);
    console.log('✅ Updated navigation configuration');

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

    console.log('\n🎉 Setup complete!');
    console.log('\nYour Astro project has been configured with:');
    if (plausibleConfig.domain) {
      console.log(`📊 Plausible Analytics: ${plausibleConfig.domain}`);
    }
    console.log(`📄 Pages: ${pagesToKeep.join(', ')}`);
    console.log(`🏠 Home template: ${selectedHome}`);

    console.log('\nNext steps:');
    console.log('1. Run `pnpm install` to install dependencies');
    console.log('2. Run `pnpm dev` to start the development server');
    console.log('3. Customize your content and styling as needed');
  } catch (error) {
    console.error('❌ An error occurred during setup:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();
