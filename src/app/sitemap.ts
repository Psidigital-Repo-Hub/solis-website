import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { services } from "@/lib/data/services";
import { doctors } from "@/lib/data/doctors";
import { articles } from "@/lib/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: base, changeFrequency: "weekly", priority: 1 },
      { url: `${base}/services`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${base}/doctors`, changeFrequency: "weekly", priority: 0.9 },
      { url: `${base}/appointments`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${base}/about`, changeFrequency: "yearly", priority: 0.7 },
      { url: `${base}/facilities`, changeFrequency: "yearly", priority: 0.7 },
      { url: `${base}/articles`, changeFrequency: "weekly", priority: 0.8 },
      { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.8 },
    ] satisfies MetadataRoute.Sitemap
  ).map((entry) => ({ ...entry, lastModified: now }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${base}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const doctorRoutes: MetadataRoute.Sitemap = doctors.map((doctor) => ({
    url: `${base}/doctors/${doctor.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${base}/articles/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...doctorRoutes, ...articleRoutes];
}
