/**
 * Separates background classes from container classes to enable full-width backgrounds
 * while maintaining constrained content layout.
 * 
 * @param containerClasses - The classes string that may contain background classes
 * @param bgClass - Optional explicit background class to use instead
 * @returns Object with separated background and non-background classes
 */
export function separateBackgroundClasses(containerClasses: string = '', bgClass: string = '') {
  // Extract background classes (bg-*, dark:bg-*)
  const bgClasses = containerClasses.match(/bg-\S+|dark:bg-\S+/g)?.join(' ') || bgClass;
  
  // Remove background classes from container classes
  const nonBgClasses = containerClasses.replace(/bg-\S+|dark:bg-\S+/g, '').trim();
  
  return {
    bgClasses,
    nonBgClasses,
  };
}
