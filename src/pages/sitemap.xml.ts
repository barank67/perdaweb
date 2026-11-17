import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { routes, languagePaths } from "../i18n/routes";

export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog")).filter((post) => !post.data.draft);
  const pairs = [
    ...routes.map(([tr, en]) => ({ tr, en })),
    ...posts.map((post) => languagePaths(`/blog/${post.id.replace(/\.md$/, "")}/`)),
  ];
  const origin = "https://perda.com.tr";
  const urls = pairs.flatMap(({ tr, en }) => [tr, en].map((path) => `
  <url>
    <loc>${origin}${path}</loc>
    <xhtml:link rel="alternate" hreflang="tr" href="${origin}${tr}" />
    <xhtml:link rel="alternate" hreflang="en" href="${origin}${en}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${origin}${tr}" />
  </url>`));
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}
</urlset>`, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
