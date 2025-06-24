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
