import { z } from "zod";

export const enquiryTopics = [
  { value: "general", label: "General enquiry" },
  { value: "appointment", label: "Appointment or scheduling" },
  { value: "referral", label: "Referral (healthcare professionals)" },
  { value: "records", label: "Medical records request" },
  { value: "billing", label: "Billing and insurance" },
  { value: "feedback", label: "Feedback or a concern" },
] as const;

export const contactSchema = z.object({
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
    .max(24, "Please use 24 characters or fewer.")
    .optional()
    .or(z.literal("")),

  topic: z.enum(
    enquiryTopics.map((topic) => topic.value) as [string, ...string[]],
    { message: "Please choose what your enquiry is about." },
  ),

  message: z
    .string()
    .trim()
    .min(20, "Please give us a little more detail — at least 20 characters.")
    .max(2000, "Please use 2000 characters or fewer."),

  consent: z.literal(true, {
    message: "Please confirm you are happy for us to reply.",
  }),
});

export type ContactInput = z.infer<typeof contactSchema>;
