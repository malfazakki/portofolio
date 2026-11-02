/**
 * Parse project images field which can be:
 * - A JSON array string: '["https://...", "https://..."]'
 * - A single string URL: 'https://...'
 * - Empty string or null
 */
export function parseProjectImages(imageField: string | null | undefined): string[] {
  if (!imageField || imageField.trim() === "") return [];

  const trimmed = imageField.trim();

  // Try parsing as JSON array
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed
          .filter((item): item is string => typeof item === "string" && item.trim() !== "")
          .map((s) => s.trim());
      }
    } catch {
      // Fallback below
    }
  }

  // Handle single URL
  return [trimmed];
}

/**
 * Get primary cover image for a project
 */
export function getPrimaryImage(imageField: string | null | undefined): string | null {
  const images = parseProjectImages(imageField);
  return images.length > 0 ? images[0] : null;
}

