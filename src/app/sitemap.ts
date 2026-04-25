import type { MetadataRoute } from "next";

const siteUrl = "https://hamzagroup-auto-import.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${siteUrl}/catalog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9
    }
  ];
}
