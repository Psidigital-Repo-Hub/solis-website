/**
 * Single source of truth for organisation-level content.
 *
 * NOTE: This is demonstration content for a fictional hospital. Contact
 * details, accreditations and outcome figures are placeholders and must be
 * replaced with verified information before any public deployment.
 */

export const siteConfig = {
  name: "Solis Medical Center",
  shortName: "Solis",
  tagline: "Complete care for every stage of life",
  description:
    "Solis Medical Center brings specialist teams, modern diagnostics and coordinated follow-up together so patients and families receive attentive, connected care.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://solis-medical.example",
  locale: "en_GB",
  contact: {
    phone: "+1 (555) 0142 900",
    phoneHref: "tel:+15550142900",
    emergency: "+1 (555) 0142 911",
    emergencyHref: "tel:+15550142911",
    email: "hello@solis-medical.example",
    emailHref: "mailto:hello@solis-medical.example",
    address: {
      line1: "480 Waverley Avenue",
      line2: "Suite 1100",
      city: "Ridgemont",
      region: "CA",
      postalCode: "94042",
      country: "United States",
    },
  },
  hours: [
    { days: "Monday – Friday", time: "07:00 – 20:00" },
    { days: "Saturday", time: "08:00 – 17:00" },
    { days: "Sunday", time: "09:00 – 14:00" },
    { days: "Emergency department", time: "Open 24 hours, every day" },
  ],
  social: [
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  ],
  accreditations: [
    "Accredited Care Standard",
    "Patient Safety Charter",
    "Quality Network Member",
  ],
} as const;

export const fullAddress = [
  siteConfig.contact.address.line1,
  siteConfig.contact.address.line2,
  `${siteConfig.contact.address.city}, ${siteConfig.contact.address.region} ${siteConfig.contact.address.postalCode}`,
].join(", ");
