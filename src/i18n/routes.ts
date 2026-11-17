export const routes = [
  ["/", "/en/"],
  ["/fiyatlar/", "/en/pricing/"],
  ["/kocluk-konulari/", "/en/coaching-topics/"],
  ["/blog/", "/en/blog/"],
  ["/kvkk/", "/en/data-protection/"],
  ["/gizlilik-politikasi/", "/en/privacy-policy/"],
] as const;

export function languagePaths(pathname: string) {
  const path = pathname.replace(/\/+$/, "") + "/";
  const match = routes.find(([tr, en]) => path === tr || path === en);
  if (match) return { tr: match[0], en: match[1] };
  // Blog translations share stable article IDs for direct language switching.
  const tr = path.startsWith("/en/") ? path.slice(3) : path;
  return { tr, en: `/en${tr}` };
}
