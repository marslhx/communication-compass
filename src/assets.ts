/** Vite rewrites CSS/HTML assets, but runtime JSON paths need the same base. */
export function assetUrl(url: string): string {
  return url.startsWith('/') && !url.startsWith('//')
    ? `${import.meta.env.BASE_URL}${url.slice(1)}`
    : url
}
