import type { MetadataRoute } from "next";

const base = "https://zecamostudios.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/privacy`,
      lastModified: new Date("2026-05-23"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/terms`,
      lastModified: new Date("2026-05-23"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/cookies`,
      lastModified: new Date("2026-05-23"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
