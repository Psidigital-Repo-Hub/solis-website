import type { AudienceLink, Facility, Stat, Testimonial } from "@/types";

/**
 * Cross-cutting demonstration content: audience entry points, outcome
 * figures, facilities and patient voices.
 *
 * The figures below are illustrative placeholders for layout purposes and
 * are not published outcome data.
 */

export const audienceLinks: AudienceLink[] = [
  {
    id: "aud-patients",
    label: "Patients & families",
    description: "Prepare for a visit, find a clinic and manage appointments.",
    href: "/services",
    icon: "heart-pulse",
  },
  {
    id: "aud-referrers",
    label: "Referring clinicians",
    description: "Refer a patient and track the pathway through to discharge.",
    href: "/contact",
    icon: "stethoscope",
  },
  {
    id: "aud-employers",
    label: "Employers & insurers",
    description: "Occupational health and coordinated corporate programmes.",
    href: "/contact",
    icon: "briefcase-medical",
  },
  {
    id: "aud-community",
    label: "Community partners",
    description: "Outreach clinics, screening events and health education.",
    href: "/about",
    icon: "users",
  },
  {
    id: "aud-careers",
    label: "Clinicians joining us",
    description: "Current openings across medical, nursing and allied teams.",
    href: "/about#careers",
    icon: "graduation-cap",
  },
];

export const outcomeStats: Stat[] = [
  {
    id: "stat-satisfaction",
    value: 96,
    suffix: "%",
    label: "Patients who would recommend our outpatient service",
    icon: "heart-pulse",
  },
  {
    id: "stat-wait",
    value: 24,
    suffix: "h",
    label: "Typical time to a first specialist assessment after referral",
    icon: "clock",
  },
  {
    id: "stat-specialists",
    value: 180,
    suffix: "+",
    label: "Consultants and specialist practitioners across the campus",
    icon: "stethoscope",
  },
  {
    id: "stat-departments",
    value: 32,
    label: "Clinical departments working from one shared record",
    icon: "building-2",
  },
];

export const trustStats: Stat[] = [
  {
    id: "trust-years",
    value: 28,
    label: "Years serving the Ridgemont region",
    icon: "calendar-days",
  },
  {
    id: "trust-patients",
    value: 240,
    suffix: "k",
    label: "Patient visits supported each year",
    icon: "users",
  },
  {
    id: "trust-emergency",
    value: 24,
    suffix: "/7",
    label: "Emergency department, open every day",
    icon: "ambulance",
  },
];

export const facilities: Facility[] = [
  {
    id: "fac-emergency",
    name: "Emergency Department",
    description:
      "Resuscitation bays, a separate paediatric area and senior triage on arrival, with imaging on the same floor.",
    icon: "ambulance",
    image: "/images/facility-emergency.jpg",
    imageAlt: "An intravenous drip stand beside a hospital bed",
  },
  {
    id: "fac-imaging",
    name: "Imaging Centre",
    description:
      "MRI, CT, ultrasound and digital X-ray, reported on site by subspecialist radiologists.",
    icon: "scan-line",
    image: "/images/facility-imaging.jpg",
    imageAlt: "An X-ray image of a forearm displayed on a lightbox",
  },
  {
    id: "fac-theatre",
    name: "Surgical Suite",
    description:
      "Eight theatres with laminar flow, supported by a dedicated recovery unit and pre-admission clinic.",
    icon: "stethoscope",
    image: "/images/facility-theatre.jpg",
    imageAlt: "An empty operating theatre prepared for surgery",
  },
  {
    id: "fac-maternity",
    name: "Maternity Centre",
    description:
      "Birthing rooms with partner accommodation, alongside a neonatal team available at all hours.",
    icon: "heart-handshake",
    image: "/images/facility-maternity.jpg",
    imageAlt: "A newborn baby resting, arms outstretched",
  },
  {
    id: "fac-rehab",
    name: "Rehabilitation Gym",
    description:
      "Cardiac, pulmonary and musculoskeletal rehabilitation delivered in supervised group and individual sessions.",
    icon: "activity",
    image: "/images/facility-rehab.jpg",
    imageAlt: "A person exercising on a mat during a supervised session",
  },
  {
    id: "fac-pharmacy",
    name: "Outpatient Pharmacy",
    description:
      "On-site dispensing with pharmacist-led medication reviews before you leave the building.",
    icon: "pill",
    image: "/images/facility-pharmacy.jpg",
    imageAlt: "Medication packets, capsules and a thermometer arranged on a flat surface",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    quote:
      "What stayed with me was how little I had to repeat myself. Every clinician I met already knew the history, so the appointments were about what came next rather than starting again from the beginning.",
    name: "Marianne D.",
    role: "Cardiology outpatient",
    avatar: "/images/avatar-patient-1.jpg",
  },
  {
    id: "test-2",
    quote:
      "The paediatric team explained everything to my daughter directly, at her level, before they explained it to me. She left far less anxious than she arrived, which I did not expect.",
    name: "Joseph A.",
    role: "Parent, Children's Wing",
    avatar: "/images/avatar-patient-2.jpg",
  },
  {
    id: "test-3",
    quote:
      "I was given a written recovery plan before the operation, not after it. Knowing in advance what week two was supposed to feel like made the whole thing far less worrying.",
    name: "Priyanka S.",
    role: "Orthopaedic surgery patient",
    avatar: "/images/avatar-patient-3.jpg",
  },
];

export const leadershipQuote = {
  quote:
    "Good hospitals are built from unglamorous things: clear handovers, records that follow the patient, and enough time in an appointment to answer the question that was actually asked. That is what we hold ourselves to.",
  name: "Dr Helena Marsh",
  role: "Chief Medical Officer",
  avatar: "/images/avatar-leader-1.jpg",
};

export const partners = [
  { name: "Northvale Health", logo: "/images/logos/northvale-health.svg" },
  { name: "Beacon Care", logo: "/images/logos/beacon-care.svg" },
  { name: "Cedarline", logo: "/images/logos/cedarline.svg" },
  { name: "Meridian Group", logo: "/images/logos/meridian-group.svg" },
  { name: "Harbourpoint", logo: "/images/logos/harbourpoint.svg" },
  { name: "Alder & Rowe", logo: "/images/logos/alder-rowe.svg" },
];

export const values = [
  {
    id: "val-1",
    title: "Clarity over jargon",
    description:
      "Patients leave appointments able to explain their own plan. If they cannot, we have not finished the conversation.",
    icon: "message-circle",
  },
  {
    id: "val-2",
    title: "One connected record",
    description:
      "Every department writes into the same record, so care does not restart each time a patient changes team.",
    icon: "layers",
  },
  {
    id: "val-3",
    title: "Time where it counts",
    description:
      "Appointment lengths are set by clinical need rather than by a single standard slot for every specialty.",
    icon: "clock",
  },
  {
    id: "val-4",
    title: "Measured, then improved",
    description:
      "Outcomes and patient feedback are reviewed department by department and published internally each quarter.",
    icon: "line-chart",
  },
];

export const timeline = [
  {
    year: "1997",
    title: "Doors open on Waverley Avenue",
    description:
      "Solis begins as a twelve-bed community clinic serving the Ridgemont district.",
  },
  {
    year: "2006",
    title: "Emergency department established",
    description:
      "Round-the-clock emergency care begins, with imaging relocated to the same floor.",
  },
  {
    year: "2014",
    title: "Cardiovascular Institute opens",
    description:
      "Specialist cardiac assessment, rehabilitation and follow-up are brought under one roof.",
  },
  {
    year: "2021",
    title: "Single shared patient record",
    description:
      "All departments move onto one record, ending repeated history-taking between teams.",
  },
  {
    year: "2025",
    title: "Children's Wing expansion",
    description:
      "Paediatric outpatients doubles in size, with dedicated family consultation spaces.",
  },
];
