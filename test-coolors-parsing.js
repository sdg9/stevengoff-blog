// Test script to verify Coolors.co URL parsing for 3-color palettes

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

// Test the specific URL you provided
const testUrl = 'https://coolors.co/palette/780000-c1121f-fdf0d5';
const colors = parseCoolorsUrl(testUrl);

console.log('URL:', testUrl);
console.log('Parsed colors:', colors);
console.log('Valid (3+ colors):', colors && colors.length >= 3);

if (colors && colors.length >= 3) {
  console.log('Mapping:');
  console.log('  Primary:', colors[0]);
  console.log('  Secondary:', colors[1]);
  console.log('  Accent:', colors[2]);
  console.log('  Background: #ffffff (default)');
  console.log('  Foreground: #0f172a (default)');
}
