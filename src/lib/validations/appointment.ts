import { z } from "zod";

import { serviceSlugs } from "@/lib/data/services";

/**
 * Appointment request schema.
 *
 * This is a *request*, not a booking, and it deliberately does not collect
 * clinical detail: the reason field is a free-text prompt for context only.
 * Whichever backend consumes it must re-validate with this same schema on
 * the server before persisting anything.
 */

const today = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};

const maxDate = () => {
  const limit = new Date();
  limit.setMonth(limit.getMonth() + 9);
  return limit;
};

export const timeSlots = [
  { value: "morning", label: "Morning (08:00 – 12:00)" },
  { value: "afternoon", label: "Afternoon (12:00 – 16:00)" },
  { value: "evening", label: "Evening (16:00 – 19:30)" },
] as const;

export const appointmentSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "Please use 80 characters or fewer."),

  email: z
    .string()
    .trim()
    .min(1, "Please enter an email address.")
    .email("Please enter a valid email address, for example name@example.com."),

  phone: z
    .string()
    .trim()
    .min(7, "Please enter a contact number of at least 7 digits.")
    .max(24, "Please use 24 characters or fewer.")
    .regex(
      /^[+()\d\s-]+$/,
      "Use digits, spaces and the characters + ( ) - only.",
    ),

  department: z
    .string()
    .refine(
      (value) => serviceSlugs.includes(value as (typeof serviceSlugs)[number]),
      "Please choose a department.",
    ),

  doctor: z.string().optional(),

  preferredDate: z
    .string()
    .min(1, "Please choose a preferred date.")
    .refine((value) => !Number.isNaN(Date.parse(value)), "Please choose a valid date.")
    .refine((value) => new Date(value) >= today(), "Please choose today or a later date.")
    .refine(
      (value) => new Date(value) <= maxDate(),
      "Please choose a date within the next nine months.",
    ),

  preferredTime: z.enum(["morning", "afternoon", "evening"], {
    message: "Please choose a preferred time.",
  }),

  reason: z
    .string()
    .trim()
    .min(10, "Please give us at least a sentence so we can route your request.")
    .max(500, "Please use 500 characters or fewer."),

  message: z
    .string()
    .trim()
    .max(1000, "Please use 1000 characters or fewer.")
    .optional(),

  isNewPatient: z.enum(["yes", "no"], {
    message: "Please tell us whether you have been seen here before.",
  }),

  consent: z.literal(true, {
    message: "Please confirm you are happy for us to contact you.",
  }),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
