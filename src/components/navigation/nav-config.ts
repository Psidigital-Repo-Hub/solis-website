import { services } from "@/lib/data/services";

export interface NavChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const primaryNav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      {
        label: "Our story",
        href: "/about",
        description: "How Solis grew from a community clinic",
      },
      {
        label: "Leadership",
        href: "/about#leadership",
        description: "The people accountable for care standards",
      },
      {
        label: "Accreditation",
        href: "/about#accreditation",
        description: "Standards we are assessed against",
      },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: services.slice(0, 6).map((service) => ({
      label: service.name,
      href: `/services/${service.slug}`,
      description: service.summary,
    })),
  },
  {
    label: "Doctors",
    href: "/doctors",
  },
  {
    label: "Facilities",
    href: "/facilities",
  },
  {
    label: "Articles",
    href: "/articles",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const footerNav = [
  {
    title: "Patients",
    links: [
      { label: "Book an appointment", href: "/appointments" },
      { label: "Our services", href: "/services" },
      { label: "Find a doctor", href: "/doctors" },
      { label: "Health articles", href: "/articles" },
    ],
  },
  {
    title: "Departments",
    links: services.slice(0, 5).map((service) => ({
      label: service.name,
      href: `/services/${service.slug}`,
    })),
  },
  {
    title: "About Solis",
    links: [
      { label: "Our story", href: "/about" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Facilities", href: "/facilities" },
      { label: "Careers", href: "/about#careers" },
    ],
  },
];
