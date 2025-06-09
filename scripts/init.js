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
    // 1. Configure Plausible Analytics
    console.log('📊 Analytics Configuration');
    const { usePlausible } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'usePlausible',
        message: 'Do you want to use Plausible Analytics?',
        default: false
      }
    ]);
    
    let plausibleConfig = {
      domain: null,
      src: null
    };

    if (usePlausible) {
      console.log('\nPlease provide your Plausible analytics snippet.');
      console.log('Example: <script defer data-domain="example.com" src="https://analytics.webtownhero.com/js/script.hash.outbound-links.js"></script>');
      
      const { snippet } = await inquirer.prompt([
        {
          type: 'input',
          name: 'snippet',
          message: 'Paste your Plausible script tag:',
          validate: (input) => {
            if (!input.trim()) return 'Please provide a script tag';
            if (!input.includes('data-domain') || !input.includes('src=')) {
              return 'Please provide a valid Plausible script tag with data-domain and src attributes';
            }
            return true;
          }
        }
      ]);
      
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
    const availablePages = [
      { name: 'About', value: 'about' },
      { name: 'Contact', value: 'contact' },
      { name: 'Pricing', value: 'pricing' },
      { name: 'Services', value: 'services' },
      { name: 'Terms', value: 'terms' },
      { name: 'Privacy', value: 'privacy' }
    ];

    const { selectedPages } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selectedPages',
        message: 'Which pages do you want to keep?',
        choices: availablePages,
        default: ['about', 'contact']
      }
    ]);
    
    console.log(`✅ Keeping pages: ${selectedPages.join(', ')}`);

    // 3. Select home page template
    console.log('\n🏠 Home Page Template Selection');
    const homeTemplates = [
      { name: 'SaaS', value: 'saas' },
      { name: 'Startup', value: 'startup' },
      { name: 'Mobile App', value: 'mobile-app' },
      { name: 'Personal', value: 'personal' },
      { name: 'Counseling', value: 'counseling' },
      { name: 'Beach Club', value: 'beach' }
    ];

    const { selectedHome } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedHome',
        message: 'Which home page template do you want to use?',
        choices: homeTemplates,
        default: 'saas'
      }
    ]);
    
    console.log(`✅ Selected home template: ${selectedHome}`);

    // 4. Apply configurations
    console.log('\n⚙️ Applying configurations...');

    // Update config.yaml with analytics settings
    const configPath = join(process.cwd(), 'src', 'config.yaml');
    const configContent = readFileSync(configPath, 'utf8');
    const config = yaml.load(configContent);
    
    config.analytics.vendors.plausible = plausibleConfig;
    
    writeFileSync(configPath, yaml.dump(config, { 
      lineWidth: -1,
      noRefs: true,
      quotingType: '"'
    }));
    console.log('✅ Updated analytics configuration');

    // Remove unwanted pages
    const pagesDir = join(process.cwd(), 'src', 'pages');
    const allPages = [
      { file: 'about.astro', key: 'about' },
      { file: 'contact.astro', key: 'contact' },
      { file: 'pricing.astro', key: 'pricing' },
      { file: 'services.astro', key: 'services' },
      { file: 'terms.md', key: 'terms' },
      { file: 'privacy.md', key: 'privacy' }
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
      join(process.cwd(), 'src', 'components', 'blog')
    ];
    
    dirsToRemove.forEach(dir => {
      deleteRecursively(dir);
      console.log(`✅ Removed ${dir.split('/').pop()} directory`);
    });

    // Update navigation.ts to remove unused links
    const navigationPath = join(process.cwd(), 'src', 'navigation.ts');
    let navigationContent = readFileSync(navigationPath, 'utf8');
    
    // Remove the Homes dropdown section
    navigationContent = navigationContent.replace(
      /{\s*text:\s*['"]Homes['"],\s*links:\s*\[[\s\S]*?\],\s*},\s*/,
      ''
    );
    
    // Remove the Landing dropdown section
    navigationContent = navigationContent.replace(
      /{\s*text:\s*['"]Landing['"],\s*links:\s*\[[\s\S]*?\],\s*},\s*/,
      ''
    );
    
    // Remove the Blog dropdown section
    navigationContent = navigationContent.replace(
      /{\s*text:\s*['"]Blog['"],\s*links:\s*\[[\s\S]*?\],\s*},\s*/,
      ''
    );

    // Remove the Widgets link
    navigationContent = navigationContent.replace(
      /{\s*text:\s*['"]Widgets['"],\s*href:\s*['"][^'"]*['"],?\s*},?\s*/,
      ''
    );
    
    // Remove unused page links from Pages section based on selected pages
    const pagesToRemove = availablePages.map(p => p.value).filter(page => !selectedPages.includes(page));
    pagesToRemove.forEach(page => {
      const pageNames = {
        'about': 'About us',
        'contact': 'Contact',
        'pricing': 'Pricing',
        'services': 'Services',
        'terms': 'Terms',
        'privacy': 'Privacy policy'
      };
      
      const pageName = pageNames[page] || page.charAt(0).toUpperCase() + page.slice(1);
      const patterns = [
        new RegExp(`\\s*{\\s*text:\\s*['"]${pageName}['"],\\s*href:[^}]*},?\\s*`, 'g'),
        new RegExp(`\\s*{\\s*text:\\s*['"]${pageName}[^'"]*['"][^}]*},?\\s*`, 'g')
      ];
      
      patterns.forEach(pattern => {
        navigationContent = navigationContent.replace(pattern, '');
      });
    });
    
    // Clean up any trailing commas in the links array
    navigationContent = navigationContent.replace(/,(\s*\])/g, '$1');
    
    writeFileSync(navigationPath, navigationContent);
    console.log('✅ Updated navigation configuration');

    // Disable blog in config if blog was removed
    config.apps.blog.isEnabled = false;
    writeFileSync(configPath, yaml.dump(config, { 
      lineWidth: -1,
      noRefs: true,
      quotingType: '"'
    }));
    console.log('✅ Disabled blog configuration');

    // Create final commit with user configurations
    console.log('\n💾 Committing your customizations...');
    if (!runGitCommand('git add .', '📁 Adding configuration changes')) {
      console.log('⚠️ Warning: Could not add changes to git');
    } else if (!runGitCommand(`git commit -m "feat: Configure project - Analytics: ${plausibleConfig.domain || 'none'}, Pages: ${selectedPages.join(',')}, Home: ${selectedHome}"`, '💾 Creating configuration commit')) {
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
