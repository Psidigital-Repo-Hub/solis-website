/**
 * Domain types for the Solis Medical Center site.
 *
 * Content is currently served from typed modules in `src/lib/data`. These
 * shapes are intentionally the same ones a CMS or Supabase table would
 * return, so swapping the source later is a change of loader, not of view.
 */

export type ServiceSlug =
  | "cardiology"
  | "pediatrics"
  | "orthopedics"
  | "neurology"
  | "general-surgery"
  | "emergency-care"
  | "maternity"
  | "diagnostic-imaging"
  | "laboratory-services";

export interface Service {
  id: string;
  slug: ServiceSlug;
  name: string;
  /** Card-level summary. One or two lines. */
  summary: string;
  /** Detail-page opening paragraph. */
  description: string;
  /** Lucide icon name resolved by the icon registry. */
  icon: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  conditions: string[];
  procedures: string[];
  /** Departmental phone extension, formatted for display. */
  extension: string;
}

export interface Doctor {
  id: string;
  slug: string;
  name: string;
  /** Post-nominal credentials, e.g. "MD, FACC". */
  credentials: string;
  specialty: string;
  department: ServiceSlug;
  image: string;
  bio: string;
  qualifications: string[];
  focusAreas: string[];
  languages: string[];
  experience: number;
  location: string;
}

export type ArticleCategory =
  | "Preventive Health"
  | "Heart & Vascular"
  | "Family Care"
  | "Nutrition"
  | "Patient Stories"
  | "Research & Innovation";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  image: string;
  imageAlt: string;
  /** ISO-8601 date. */
  publishedAt: string;
  readingTime: number;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  /** Markdown-lite blocks rendered by the article renderer. */
  body: ArticleBlock[];
}

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; title: string; text: string };

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  imageAlt: string;
}

export interface Stat {
  id: string;
  /** Numeric portion, animated by the counter. */
  value: number;
  /** Rendered before the number, e.g. "$". */
  prefix?: string;
  /** Rendered after the number, e.g. "%" or "+". */
  suffix?: string;
  label: string;
  icon: string;
}

export interface AudienceLink {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: string;
}
