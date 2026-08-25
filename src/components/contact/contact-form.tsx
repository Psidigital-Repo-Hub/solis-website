"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, LoaderCircle, TriangleAlert } from "lucide-react";

import { siteConfig } from "@/lib/site";
import {
  contactSchema,
  enquiryTopics,
  type ContactInput,
} from "@/lib/validations/contact";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

type Status = "idle" | "submitting" | "success" | "error";

/** Mock transport. Replace with a real endpoint; re-validate server-side. */
async function sendEnquiry(values: ContactInput): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 850));
  if (values.email.endsWith("@fail.test")) {
    throw new Error("Enquiry could not be delivered.");
  }
}

export function ContactForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const successRef = React.useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      topic: "",
      message: "",
    },
  });

  React.useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const onSubmit = async (values: ContactInput) => {
    setStatus("submitting");
    try {
      await sendEnquiry(values);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-[var(--radius-card)] border border-clinic-300 bg-clinic-50 p-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clinic-600"
      >
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-clinic-500 text-white">
          <CircleCheck className="size-6" aria-hidden />
        </span>
        <h2 className="type-h3 mt-6 text-ink-800">Message sent</h2>
        <p className="type-body mt-3 max-w-[50ch]">
          Thank you for getting in touch. A member of our team will reply within
          two working days. For anything urgent, please call{" "}
          <a
            href={siteConfig.contact.phoneHref}
            className="font-semibold text-brand-600"
          >
            {siteConfig.contact.phone}
          </a>
          .
        </p>
        <div className="mt-8">
          <Button variant="outline" size="md" onClick={() => setStatus("idle")}>
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-[var(--radius-card)] border border-ink-200 bg-white p-6 sm:p-8"
    >
      {status === "error" ? (
        <div
          role="alert"
          className="mb-7 flex items-start gap-3 rounded-[var(--radius-btn)] border border-destructive/40 bg-destructive/5 p-4"
        >
          <TriangleAlert
            className="mt-0.5 size-5 shrink-0 text-destructive"
            aria-hidden
          />
          <p className="type-body text-[13.5px]">
            We could not send your message. Please try again, or call{" "}
            <a
              href={siteConfig.contact.phoneHref}
              className="font-semibold text-brand-600 underline"
            >
              {siteConfig.contact.phone}
            </a>
            .
          </p>
        </div>
      ) : null}

      <fieldset disabled={status === "submitting"} className="contents">
        <legend className="sr-only">Contact details and message</legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="c-fullName" label="Full name" required error={errors.fullName?.message}>
            {(props) => (
              <Input {...props} {...register("fullName")} autoComplete="name" />
            )}
          </Field>

          <Field id="c-email" label="Email address" required error={errors.email?.message}>
            {(props) => (
              <Input
                {...props}
                {...register("email")}
                type="email"
                autoComplete="email"
              />
            )}
          </Field>

          <Field id="c-phone" label="Phone number" error={errors.phone?.message}>
            {(props) => (
              <Input {...props} {...register("phone")} type="tel" autoComplete="tel" />
            )}
          </Field>

          <Field
            id="c-topic"
            label="What is your enquiry about?"
            required
            error={errors.topic?.message}
          >
            {(props) => (
              <Select {...props} {...register("topic")}>
                <option value="">Please choose</option>
                {enquiryTopics.map((topic) => (
                  <option key={topic.value} value={topic.value}>
                    {topic.label}
                  </option>
                ))}
              </Select>
            )}
          </Field>
        </div>

        <div className="mt-5">
          <Field
            id="c-message"
            label="Your message"
            required
            description="Please do not include clinical or sensitive personal details in this form."
            error={errors.message?.message}
          >
            {(props) => (
              <Textarea {...props} {...register("message")} rows={6} />
            )}
          </Field>
        </div>

        <div className="mt-7 rounded-[var(--radius-btn)] border border-ink-200 bg-ink-50 p-5">
          <div className="flex items-start gap-3">
            <input
              id="c-consent"
              type="checkbox"
              {...register("consent")}
              aria-describedby="c-consent-help"
              aria-invalid={errors.consent ? true : undefined}
              className="mt-0.5 size-[18px] shrink-0 rounded-[3px] border-ink-300 accent-brand-500"
            />
            <div>
              <label
                htmlFor="c-consent"
                className="font-sans text-[14px] font-semibold text-ink-800"
              >
                I am happy for Solis to reply to this message.
              </label>
              <p id="c-consent-help" className="type-body mt-1.5 text-[13px]">
                Read our{" "}
                <Link href="/contact" className="text-brand-600 underline">
                  privacy notice
                </Link>
                .
              </p>
            </div>
          </div>
          {errors.consent ? (
            <p className="mt-3 font-body text-[13px] font-medium text-destructive">
              {errors.consent.message}
            </p>
          ) : null}
        </div>

        <div className="mt-7">
          <Button type="submit" size="lg" disabled={status === "submitting"}>
            {status === "submitting" ? (
              <>
                <LoaderCircle className="size-4 animate-spin" aria-hidden />
                Sending
              </>
            ) : (
              "Send message"
            )}
          </Button>
        </div>

        <p aria-live="polite" className="sr-only">
          {status === "submitting" ? "Sending your message." : ""}
        </p>
      </fieldset>
    </form>
  );
}
