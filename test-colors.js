// Test script for color parsing
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
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
    const colors = colorsString.split('-')
      .map(c => c.replace(/[^a-fA-F0-9]/g, '')) // Remove non-hex characters
      .filter(c => c.length === 6) // Only keep valid 6-character hex codes
      .map(c => `#${c.toLowerCase()}`);
    
    if (colors.length < 3) return null;
    
    console.log(`Parsed colors: ${colors.join(', ')}`);
    return colors;
  } catch (error) {
    console.log(`Error parsing URL: ${error.message}`);
    return null;
  }
}

// Test cases
const testUrls = [
  'https://coolors.co/palette/ffe5ec-ffc2d1-ffb3c6',
  'https://coolors.co/ffe5ec-ffc2d1-ffb3c6',
  'https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51'
];

testUrls.forEach(url => {
  console.log(`\nTesting: ${url}`);
  const result = parseColorsUrl(url);
  if (result) {
    result.forEach((color, i) => {
      const rgb = hexToRgb(color);
      console.log(`  Color ${i + 1}: ${color} -> rgb(${rgb.r} ${rgb.g} ${rgb.b})`);
    });
  } else {
    console.log('  Failed to parse');
  }
});
