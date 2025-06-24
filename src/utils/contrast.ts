/**
 * Contrast ratio and accessibility utilities for color palettes
 */

export interface ContrastResult {
  ratio: number;
  level: 'DNP' | 'AA18' | 'AAA' | 'AA' | 'AA18';
  rating: 'Fail' | 'Large Text Only' | 'AA' | 'AAA';
  pass: boolean;
  score: number; // 0-100 accessibility score
}

export interface ColorRecommendation {
  originalColor: string;
  recommendedColor: string;
  originalRatio: number;
  newRatio: number;
  improvement: string;
}

export interface PaletteAccessibility {
  overallScore: number;
  rating: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
  criticalIssues: string[];
  recommendations: string[];
  contrastGrid: Record<string, Record<string, Record<string, ContrastResult>>>;
}

/**
 * Convert hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculate relative luminance of a color
 */
function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const { r, g, b } = rgb;

  // Convert to relative values
  const rs = r / 255;
  const gs = g / 255;
  const bs = b / 255;

  // Apply gamma correction
  const rLinear = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
  const gLinear = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
  const bLinear = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);

  // Calculate luminance
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Calculate contrast ratio between two colors
 */
export function calculateContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Get accessibility level for a contrast ratio
 */
export function getAccessibilityLevel(ratio: number): ContrastResult {
  let level: ContrastResult['level'];
  let rating: ContrastResult['rating'];
  let pass: boolean;
  let score: number;

  if (ratio >= 7) {
    level = 'AAA';
    rating = 'AAA';
    pass = true;
    score = 100;
  } else if (ratio >= 4.5) {
    level = 'AA';
    rating = 'AA';
    pass = true;
    score = 85;
  } else if (ratio >= 3) {
    level = 'AA18';
    rating = 'Large Text Only';
    pass = true;
    score = 60;
  } else if (ratio >= 2.5) {
    level = 'AA18';
    rating = 'Large Text Only';
    pass = false;
    score = 40;
  } else {
    level = 'DNP';
    rating = 'Fail';
    pass = false;
    score = 0;
  }

  return {
    ratio: Math.round(ratio * 100) / 100,
    level,
    rating,
    pass,
    score,
  };
}

/**
 * Analyze accessibility of a color palette
 */
export function analyzePaletteAccessibility(palette: {
  light: Record<string, string>;
  dark: Record<string, string>;
}): PaletteAccessibility {
  const criticalIssues: string[] = [];
  const recommendations: string[] = [];
  const contrastGrid: Record<string, Record<string, Record<string, ContrastResult>>> = {};

  // Key color combinations to test
  const criticalCombinations = [
    { bg: 'background', fg: 'foreground', name: 'Main text on background' },
    { bg: 'primary', fg: 'primaryForeground', name: 'Primary button text' },
    { bg: 'secondary', fg: 'secondaryForeground', name: 'Secondary button text' },
    { bg: 'background', fg: 'mutedForeground', name: 'Muted text on background' },
    { bg: 'muted', fg: 'foreground', name: 'Text on muted background' },
  ];

  // All colors to test in grid
  const colorKeys = [
    'primary',
    'secondary',
    'accent',
    'background',
    'foreground',
    'muted',
    'destructive',
    'success',
    'warning',
  ];

  let totalScore = 0;
  let totalTests = 0;

  // Test both light and dark modes
  ['light', 'dark'].forEach((mode) => {
    const colors = palette[mode as keyof typeof palette];
    contrastGrid[mode] = {};

    // Generate contrast grid
    colorKeys.forEach((bg) => {
      if (!colors[bg]) return;
      contrastGrid[mode][bg] = {};

      colorKeys.forEach((fg) => {
        if (!colors[fg] || bg === fg) return;

        const result = getAccessibilityLevel(calculateContrastRatio(colors[bg], colors[fg]));
        contrastGrid[mode][bg][fg] = result;
        totalScore += result.score;
        totalTests++;
      });
    });

    // Check critical combinations
    criticalCombinations.forEach((combo) => {
      const bgColor = colors[combo.bg];
      const fgColor = colors[combo.fg];

      if (bgColor && fgColor) {
        const result = getAccessibilityLevel(calculateContrastRatio(bgColor, fgColor));

        if (!result.pass) {
          criticalIssues.push(`${combo.name} (${mode} mode): ${result.ratio}:1 - ${result.rating}`);
        }

        if (result.ratio < 4.5) {
          recommendations.push(
            `Improve ${combo.name} contrast in ${mode} mode (current: ${result.ratio}:1, target: 4.5:1+)`
          );
        }
      }
    });
  });

  // Calculate overall score
  const overallScore = Math.round(totalScore / totalTests);

  // Determine rating
  let rating: PaletteAccessibility['rating'];
  if (overallScore >= 90) rating = 'Excellent';
  else if (overallScore >= 75) rating = 'Good';
  else if (overallScore >= 60) rating = 'Fair';
  else if (overallScore >= 40) rating = 'Poor';
  else rating = 'Critical';

  return {
    overallScore,
    rating,
    criticalIssues,
    recommendations: [...new Set(recommendations)], // Remove duplicates
    contrastGrid,
  };
}

/**
 * Get color for contrast ratio display
 */
export function getContrastRatioColor(ratio: number): string {
  if (ratio >= 7) return '#16a34a'; // Green - AAA
  if (ratio >= 4.5) return '#2563eb'; // Blue - AA
  if (ratio >= 3) return '#d97706'; // Orange - AA Large
  return '#dc2626'; // Red - Fail
}

/**
 * Get background color for contrast ratio display
 */
export function getContrastRatioBackground(ratio: number): string {
  if (ratio >= 7) return '#dcfce7'; // Light green
  if (ratio >= 4.5) return '#dbeafe'; // Light blue
  if (ratio >= 3) return '#fed7aa'; // Light orange
  return '#fecaca'; // Light red
}

/**
 * Convert RGB to hex
 */
function rgbToHex(r: number, g: number, b: number): string {
  return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
}

/**
 * Convert RGB to HSL
 */
function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number, s: number;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Convert HSL to RGB
 */
function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return { r: r * 255, g: g * 255, b: b * 255 };
}

/**
 * Convert hex to HSL
 */
function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

/**
 * Convert HSL to hex
 */
function hslToHex(h: number, s: number, l: number): string {
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

/**
 * Adjust a color's lightness to achieve the target contrast ratio while preserving hue and saturation
 */
function adjustColorForContrast(
  foregroundColor: string,
  backgroundColor: string,
  targetRatio: number = 7.0
): string {
  const fgHsl = hexToHsl(foregroundColor);
  const bgLuminance = getLuminance(backgroundColor);
  
  if (!fgHsl) return foregroundColor;

  // Keep original hue and saturation, adjust lightness
  const { h, s, l: originalL } = fgHsl;
  
  // Start with more conservative adjustments - try to stay closer to original
  const attempts: Array<{ s: number; lMin: number; lMax: number; priority: number }> = [
    // First priority: keep original saturation, small lightness adjustments
    { s: s, lMin: Math.max(0, originalL - 20), lMax: Math.min(100, originalL + 20), priority: 1 },
    // Second priority: keep original saturation, moderate adjustments  
    { s: s, lMin: Math.max(0, originalL - 40), lMax: Math.min(100, originalL + 40), priority: 2 },
    // Third priority: slight saturation reduction, broader lightness range
    { s: Math.max(0, s - 15), lMin: 0, lMax: 100, priority: 3 },
    // Fourth priority: more saturation reduction
    { s: Math.max(0, s - 30), lMin: 0, lMax: 100, priority: 4 },
    // Last resort: any saturation
    { s: 0, lMin: 0, lMax: 100, priority: 5 }
  ];

  let bestColor = foregroundColor;
  let bestRatio = calculateContrastRatio(backgroundColor, foregroundColor);
  let bestPriority = 10;

  for (const attempt of attempts) {
    // Binary search for the right lightness value within this attempt's range
    let minL = attempt.lMin;
    let maxL = attempt.lMax;
    
    for (let i = 0; i < 30; i++) { // 30 iterations for good precision
      const testL = (minL + maxL) / 2;
      const testColor = hslToHex(h, attempt.s, testL);
      const ratio = calculateContrastRatio(backgroundColor, testColor);
      
      // If we achieve the target ratio with better priority, use it
      if (ratio >= targetRatio && attempt.priority < bestPriority) {
        bestColor = testColor;
        bestRatio = ratio;
        bestPriority = attempt.priority;
        break; // Found a good solution, move to next attempt for potentially better one
      }
      
      // Update best even if we don't hit target, for fallback
      if (ratio > bestRatio || (ratio === bestRatio && attempt.priority < bestPriority)) {
        bestColor = testColor;
        bestRatio = ratio;
        bestPriority = attempt.priority;
      }
      
      // Adjust search range based on contrast direction needed
      if (ratio < targetRatio) {
        // Need more contrast
        if (bgLuminance > 0.5) {
          // Light background, make foreground darker
          maxL = testL;
        } else {
          // Dark background, make foreground lighter  
          minL = testL;
        }
      } else {
        // Already have enough contrast, could go closer to original
        if (bgLuminance > 0.5) {
          // Light background, could be slightly lighter
          minL = testL;
        } else {
          // Dark background, could be slightly darker
          maxL = testL;
        }
      }
      
      // Early termination if we're very close to target
      if (Math.abs(ratio - targetRatio) < 0.05) {
        break;
      }
    }
    
    // If we found a good solution with this priority level, we can stop
    if (bestRatio >= targetRatio && attempt.priority <= 2) {
      break;
    }
  }
  
  return bestColor;
}

/**
 * Generate a foreground color recommendation that achieves AAA contrast while preserving the original color character
 */
export function generateAAAForegroundColor(backgroundColor: string, originalForeground?: string): { light: string; dark: string } {
  if (originalForeground) {
    // Try to preserve the original color character
    const adjustedColor = adjustColorForContrast(originalForeground, backgroundColor, 7.0);
    const ratio = calculateContrastRatio(backgroundColor, adjustedColor);
    
    if (ratio >= 7.0) {
      // Success! Return the adjusted color
      const bgLuminance = getLuminance(backgroundColor);
      if (bgLuminance > 0.5) {
        return { light: '#ffffff', dark: adjustedColor };
      } else {
        return { light: adjustedColor, dark: '#000000' };
      }
    }
  }
  
  // Fallback to high contrast colors if adjustment fails
  const bgLuminance = getLuminance(backgroundColor);
  const targetRatio = 7.0;

  // Calculate required luminance for AAA contrast
  const lightFgLuminance = Math.min(1, targetRatio * (bgLuminance + 0.05) - 0.05);
  const darkFgLuminance = Math.max(0, (bgLuminance + 0.05) / targetRatio - 0.05);

  // Convert luminance back to RGB (simplified approach)
  let lightColor = '#ffffff';
  if (lightFgLuminance >= 0 && lightFgLuminance <= 1) {
    const lightValue = Math.pow(lightFgLuminance / 0.2126, 1 / 2.4) * 255;
    lightColor = rgbToHex(lightValue, lightValue, lightValue);
  }

  let darkColor = '#000000';
  if (darkFgLuminance >= 0 && darkFgLuminance <= 1) {
    const darkValue = Math.pow(darkFgLuminance / 0.2126, 1 / 2.4) * 255;
    darkColor = rgbToHex(darkValue, darkValue, darkValue);
  }

  return { light: lightColor, dark: darkColor };
}

/**
 * Generate color recommendations for failing contrast combinations
 */
export interface ColorRecommendation {
  originalColor: string;
  recommendedColor: string;
  originalRatio: number;
  newRatio: number;
  improvement: string;
}

export function generateColorRecommendations(
  backgroundColor: string,
  foregroundColor: string,
  _targetRatio: number = 7.0
): ColorRecommendation {
  const originalRatio = calculateContrastRatio(backgroundColor, foregroundColor);
  
  // Try to adjust the original color to achieve AAA contrast
  const adjustedColor = adjustColorForContrast(foregroundColor, backgroundColor, 7.0);
  const adjustedRatio = calculateContrastRatio(backgroundColor, adjustedColor);
  
  // If adjustment worked well, use it; otherwise fall back to high contrast alternatives
  let recommendedColor = adjustedColor;
  let newRatio = adjustedRatio;
  
  if (adjustedRatio < 7.0) {
    // If we still can't achieve AAA, try a fallback approach
    const bgLuminance = getLuminance(backgroundColor);
    const fgHsl = hexToHsl(foregroundColor);
    
    if (fgHsl) {
      // Try with reduced saturation but same hue
      const { h } = fgHsl;
      const fallbackColor = hslToHex(h, 20, bgLuminance > 0.5 ? 15 : 85);
      const fallbackRatio = calculateContrastRatio(backgroundColor, fallbackColor);
      
      if (fallbackRatio > newRatio) {
        recommendedColor = fallbackColor;
        newRatio = fallbackRatio;
      }
    }
    
    // Final fallback to high contrast if still not good enough
    if (newRatio < 4.5) {
      recommendedColor = bgLuminance > 0.5 ? '#1a1a1a' : '#f5f5f5';
      newRatio = calculateContrastRatio(backgroundColor, recommendedColor);
    }
  }

  let improvement: string;
  if (newRatio >= 7) {
    improvement = 'Achieves AAA compliance';
  } else if (newRatio >= 4.5) {
    improvement = 'Achieves AA compliance';
  } else {
    improvement = 'Partial improvement';
  }

  return {
    originalColor: foregroundColor,
    recommendedColor,
    originalRatio,
    newRatio,
    improvement,
  };
}

/**
 * Generate AAA-compliant colors across the full hue spectrum for a given background
 */
export interface AccessibleColorOption {
  hue: number;
  saturation: number;
  lightness: number;
  hex: string;
  contrastRatio: number;
}

export function generateAccessibleColorWheel(
  backgroundColor: string,
  targetRatio: number = 7.0,
  hueSteps: number = 24,
  saturationLevels: number[] = [100, 80, 60, 40, 20]
): AccessibleColorOption[] {
  const accessibleColors: AccessibleColorOption[] = [];
  
  // First, add grayscale options (hue doesn't matter, saturation = 0)
  const grayscaleLightness = generateLightnessRange();
  for (const l of grayscaleLightness) {
    const testColor = hslToHex(0, 0, l); // Hue and saturation don't matter for grayscale
    const ratio = calculateContrastRatio(backgroundColor, testColor);
    
    if (ratio >= targetRatio) {
      accessibleColors.push({
        hue: -1, // Special value to indicate grayscale
        saturation: 0,
        lightness: l,
        hex: testColor,
        contrastRatio: ratio
      });
    }
  }
  
  // Then add colored options across the hue spectrum
  for (let h = 0; h < 360; h += 360 / hueSteps) {
    for (const s of saturationLevels) {
      // Skip very low saturation for colored section since we have grayscale
      if (s < 15) continue;
      
      const lightnessAttempts = generateLightnessRange();
      
      for (const l of lightnessAttempts) {
        const testColor = hslToHex(h, s, l);
        const ratio = calculateContrastRatio(backgroundColor, testColor);
        
        if (ratio >= targetRatio) {
          accessibleColors.push({
            hue: h,
            saturation: s,
            lightness: l,
            hex: testColor,
            contrastRatio: ratio
          });
          break; // Found a good lightness for this hue/saturation combo
        }
      }
    }
  }
  
  return accessibleColors;
}

/**
 * Generate a range of lightness values to test, prioritizing mid-range values
 */
function generateLightnessRange(): number[] {
  const values: number[] = [];
  
  // Start with mid-range values that are most likely to work
  for (let l = 30; l <= 70; l += 5) {
    values.push(l);
  }
  
  // Add darker values
  for (let l = 25; l >= 5; l -= 5) {
    values.push(l);
  }
  
  // Add lighter values
  for (let l = 75; l <= 95; l += 5) {
    values.push(l);
  }
  
  return values;
}

/**
 * Find the closest accessible color to a given target color
 */
export function findClosestAccessibleColor(
  targetColor: string,
  backgroundColor: string,
  targetRatio: number = 7.0
): AccessibleColorOption | null {
  const targetHsl = hexToHsl(targetColor);
  if (!targetHsl) return null;
  
  const accessibleColors = generateAccessibleColorWheel(backgroundColor, targetRatio);
  
  if (accessibleColors.length === 0) return null;
  
  // Find the color with the closest hue to the target
  let closestColor = accessibleColors[0];
  let smallestHueDifference = Math.abs(targetHsl.h - accessibleColors[0].hue);
  
  for (const color of accessibleColors) {
    const hueDifference = Math.min(
      Math.abs(targetHsl.h - color.hue),
      360 - Math.abs(targetHsl.h - color.hue) // Account for hue wrapping around
    );
    
    if (hueDifference < smallestHueDifference) {
      smallestHueDifference = hueDifference;
      closestColor = color;
    }
  }
  
  return closestColor;
}
