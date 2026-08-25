import type { Metadata, Viewport } from "next";
import { Manrope, Open_Sans } from "next/font/google";

import "./globals.css";
import { siteConfig, fullAddress } from "@/lib/site";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

/**
 * Manrope carries the brand voice across headings and UI; Open Sans is the
 * humanist companion used for long-form reading. Both are self-hosted by
 * `next/font` with `display: swap` to avoid invisible text on slow links.
 */
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "hospital",
    "medical center",
    "specialist care",
    "appointments",
    "diagnostics",
    "emergency care",
  ],
  authors: [{ name: siteConfig.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

/**
 * Organisation-level structured data. Scoped deliberately to facts the site
 * actually states — no ratings or credentials are asserted here.
 */
const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${siteConfig.contact.address.line1}, ${siteConfig.contact.address.line2}`,
    addressLocality: siteConfig.contact.address.city,
    addressRegion: siteConfig.contact.address.region,
    postalCode: siteConfig.contact.address.postalCode,
    addressCountry: siteConfig.contact.address.country,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "07:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "08:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "09:00",
      closes: "14:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${openSans.variable}`}>
      <body className="min-h-screen bg-white antialiased">
        <a
          href="#main"
          className="sr-only rounded-[var(--radius-btn)] bg-brand-500 px-5 py-3 font-sans text-[13px] font-bold uppercase tracking-[0.08em] text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
        >
          Skip to main content
        </a>

        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />

        <script
          type="application/ld+json"
          // Static, author-controlled JSON — no user input is interpolated.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              ...organisationSchema,
              location: fullAddress,
            }),
          }}
        />
      </body>
    </html>
  );
}
