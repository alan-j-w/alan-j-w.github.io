export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Returns an asset path prefixed with the basePath (if any).
 * Handles relative or absolute paths, external URLs, and mailto links.
 */
export function getAssetPath(path: string): string {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("mailto:") ||
    path.startsWith("#")
  ) {
    return path;
  }

  // Already prefixed with BASE_PATH
  if (BASE_PATH && (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`))) {
    return path;
  }

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${cleanPath}`;
}
