"use client";

import * as React from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, LoaderCircle, TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";
import { services } from "@/lib/data/services";
import { doctors } from "@/lib/data/doctors";
import {
  appointmentSchema,
  timeSlots,
  type AppointmentInput,
} from "@/lib/validations/appointment";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import {
  FormErrorSummary,
  type SummaryError,
} from "@/components/ui/form-error-summary";
import { Button, ButtonLink } from "@/components/ui/button";

/** Maps a field name to the id of its rendered control. */
const controlIds: Record<string, string> = {
  fullName: "fullName",
  email: "email",
  phone: "phone",
  isNewPatient: "isNewPatient",
  department: "department",
  doctor: "doctor",
  preferredDate: "preferredDate",
  preferredTime: "preferredTime",
  reason: "reason",
  message: "message",
  consent: "consent",
};

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Appointment request form.
 *
 * The submit handler is a mock: it validates, simulates latency and returns
 * a reference. Swapping it for a real endpoint means replacing `submitRequest`
 * only — the server must re-run `appointmentSchema` before persisting, and
 * nothing entered here is written to browser storage.
 */
async function submitRequest(values: AppointmentInput): Promise<{ reference: string }> {
  await new Promise((resolve) => setTimeout(resolve, 900));

  // Simulated transport failure so the error state is reachable in review.
  if (values.email.endsWith("@fail.test")) {
    throw new Error("Request could not be delivered.");
  }

  const reference = `SOL-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  return { reference };
}

export function AppointmentForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [reference, setReference] = React.useState<string | null>(null);
  const successRef = React.useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, submitCount },
  } = useForm<AppointmentInput>({
    resolver: zodResolver(appointmentSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      department: "",
      doctor: "",
      preferredDate: "",
      reason: "",
      message: "",
    },
  });

  // `useWatch` rather than `watch()` — it subscribes to a single field and
  // returns a value, so it stays compatible with the React Compiler.
  const department = useWatch({ control, name: "department" });
  const departmentDoctors = doctors.filter(
    (doctor) => doctor.department === department,
  );

  // Move focus to the confirmation so the outcome is announced.
  React.useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const summaryErrors: SummaryError[] = Object.entries(errors)
    .filter(([, error]) => Boolean(error?.message))
    .map(([name, error]) => ({
      id: controlIds[name] ?? name,
      message: String(error?.message),
    }));

  const onSubmit = async (values: AppointmentInput) => {
    setStatus("submitting");
    try {
      const result = await submitRequest(values);
      setReference(result.reference);
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
        className="rounded-[var(--radius-card)] border border-clinic-300 bg-clinic-50 p-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clinic-600 sm:p-10"
      >
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-clinic-500 text-white">
          <CircleCheck className="size-6" aria-hidden />
        </span>

        <h2 className="type-h3 mt-6 text-ink-800">Request received</h2>
        <p className="type-body mt-3 max-w-[52ch]">
          Thank you. Our scheduling team will contact you within one working day
          to confirm a time. Your reference is{" "}
          <span className="font-semibold text-ink-800">{reference}</span>.
        </p>
        <p className="type-body mt-3 max-w-[52ch]">
          This is a request rather than a confirmed booking. If your situation
          is urgent, please call us directly, and in an emergency call the
          emergency services.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            size="md"
            onClick={() => {
              setStatus("idle");
              setReference(null);
            }}
          >
            Request another appointment
          </Button>
          <ButtonLink href="/" variant="subtle" size="md">
            Back to home
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-[var(--radius-card)] border border-ink-200 bg-white p-6 sm:p-8 lg:p-10"
    >
      {/* Only shown once a submit has been attempted, so the form never
          greets a first-time visitor with a wall of red. */}
      {submitCount > 0 ? <FormErrorSummary errors={summaryErrors} /> : null}

      {status === "error" ? (
        <div
          role="alert"
          className="mb-8 flex items-start gap-3 rounded-[var(--radius-btn)] border border-destructive/40 bg-destructive/5 p-4"
        >
          <TriangleAlert
            className="mt-0.5 size-5 shrink-0 text-destructive"
            aria-hidden
          />
          <div>
            <p className="font-sans text-[14px] font-bold text-ink-800">
              We could not send your request
            </p>
            <p className="type-body mt-1 text-[13.5px]">
              Something went wrong on our side. Please try again, or call us on{" "}
              <a
                href="tel:+15550142900"
                className="font-semibold text-brand-600 underline"
              >
                +1 (555) 0142 900
              </a>
              .
            </p>
          </div>
        </div>
      ) : null}

      <fieldset disabled={status === "submitting"} className="contents">
        <legend className="sr-only">Appointment request details</legend>

        {/* About you */}
        <h2 className="font-sans text-[13px] font-bold uppercase tracking-[0.1em] text-brand-600">
          About you
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field id="fullName" label="Full name" required error={errors.fullName?.message}>
            {(props) => (
              <Input
                {...props}
                {...register("fullName")}
                autoComplete="name"
                placeholder="Jordan Whitfield"
              />
            )}
          </Field>

          <Field id="email" label="Email address" required error={errors.email?.message}>
            {(props) => (
              <Input
                {...props}
                {...register("email")}
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
              />
            )}
          </Field>

          <Field
            id="phone"
            label="Contact number"
            required
            description="We use this to confirm your appointment time."
            error={errors.phone?.message}
          >
            {(props) => (
              <Input
                {...props}
                {...register("phone")}
                type="tel"
                autoComplete="tel"
                placeholder="+1 555 000 0000"
              />
            )}
          </Field>

          <Field
            id="isNewPatient"
            label="Have you been seen at Solis before?"
            required
            error={errors.isNewPatient?.message}
          >
            {(props) => (
              <Select {...props} {...register("isNewPatient")} defaultValue="">
                <option value="" disabled>
                  Please choose
                </option>
                <option value="no">Yes, I am an existing patient</option>
                <option value="yes">No, this is my first visit</option>
              </Select>
            )}
          </Field>
        </div>

        {/* Appointment */}
        <h2 className="mt-10 font-sans text-[13px] font-bold uppercase tracking-[0.1em] text-brand-600">
          Your appointment
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field
            id="department"
            label="Department"
            required
            error={errors.department?.message}
          >
            {(props) => (
              <Select {...props} {...register("department")}>
                <option value="">Please choose a department</option>
                {services.map((service) => (
                  <option key={service.slug} value={service.slug}>
                    {service.name}
                  </option>
                ))}
              </Select>
            )}
          </Field>

          <Field
            id="doctor"
            label="Preferred clinician"
            description={
              department
                ? "Leave as no preference and we will match you to the first available."
                : "Choose a department first to see clinicians."
            }
            error={errors.doctor?.message}
          >
            {(props) => (
              <Select {...props} {...register("doctor")} disabled={!department}>
                <option value="">No preference</option>
                {departmentDoctors.map((doctor) => (
                  <option key={doctor.slug} value={doctor.slug}>
                    {doctor.name} — {doctor.specialty}
                  </option>
                ))}
              </Select>
            )}
          </Field>

          <Field
            id="preferredDate"
            label="Preferred date"
            required
            error={errors.preferredDate?.message}
          >
            {(props) => (
              <Input {...props} {...register("preferredDate")} type="date" />
            )}
          </Field>

          <Field
            id="preferredTime"
            label="Preferred time"
            required
            error={errors.preferredTime?.message}
          >
            {(props) => (
              <Select {...props} {...register("preferredTime")} defaultValue="">
                <option value="" disabled>
                  Please choose
                </option>
                {timeSlots.map((slot) => (
                  <option key={slot.value} value={slot.value}>
                    {slot.label}
                  </option>
                ))}
              </Select>
            )}
          </Field>
        </div>

        <div className="mt-5 grid gap-5">
          <Field
            id="reason"
            label="Reason for your visit"
            required
            description="A sentence is enough. Please do not include sensitive clinical detail here."
            error={errors.reason?.message}
          >
            {(props) => (
              <Textarea
                {...props}
                {...register("reason")}
                rows={3}
                placeholder="For example: follow-up after a recent scan, or a new referral from my GP."
              />
            )}
          </Field>

          <Field
            id="message"
            label="Anything else we should know"
            description="Access requirements, interpreter needs, or scheduling constraints."
            error={errors.message?.message}
          >
            {(props) => (
              <Textarea
                {...props}
                {...register("message")}
                rows={4}
                placeholder="Optional"
              />
            )}
          </Field>
        </div>

        {/* Consent */}
        <div className="mt-8 rounded-[var(--radius-btn)] border border-ink-200 bg-ink-50 p-5">
          <div className="flex items-start gap-3">
            <input
              id="consent"
              type="checkbox"
              {...register("consent")}
              aria-describedby="consent-help"
              aria-invalid={errors.consent ? true : undefined}
              className="mt-0.5 size-[18px] shrink-0 rounded-[3px] border-ink-300 accent-brand-500"
            />
            <div>
              <label
                htmlFor="consent"
                className="font-sans text-[14px] font-semibold text-ink-800"
              >
                I am happy for Solis to contact me about this request.
              </label>
              <p id="consent-help" className="type-body mt-1.5 text-[13px]">
                We will only use these details to arrange your appointment. See
                our{" "}
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

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button
            type="submit"
            size="lg"
            disabled={status === "submitting"}
            className={cn(status === "submitting" && "cursor-progress")}
          >
            {status === "submitting" ? (
              <>
                <LoaderCircle className="size-4 animate-spin" aria-hidden />
                Sending request
              </>
            ) : (
              "Send appointment request"
            )}
          </Button>
          <p className="font-body text-[13px] text-ink-500">
            We reply within one working day.
          </p>
        </div>

        <p aria-live="polite" className="sr-only">
          {status === "submitting" ? "Sending your appointment request." : ""}
        </p>
      </fieldset>
    </form>
  );
}
