import { Container } from "@/components/layout/container";

/**
 * Route-level loading state.
 *
 * A skeleton in the shape of a typical interior page, so the transition
 * reads as the page arriving rather than as a blank screen.
 */
export default function Loading() {
  return (
    <div className="animate-pulse" role="status" aria-label="Loading page">
      <section className="bg-gradient-to-b from-[#eef3fb] via-[#f6f8fc] to-white pb-16 pt-14 lg:pb-20 lg:pt-16">
        <Container className="flex flex-col items-center gap-5">
          <div className="h-3 w-32 rounded-full bg-ink-200" />
          <div className="h-11 w-[min(30rem,90%)] rounded-lg bg-ink-200" />
          <div className="h-11 w-[min(22rem,70%)] rounded-lg bg-ink-200" />
          <div className="mt-3 h-4 w-[min(38rem,95%)] rounded-full bg-ink-100" />
          <div className="h-4 w-[min(30rem,80%)] rounded-full bg-ink-100" />
          <div className="mt-5 h-[52px] w-56 rounded bg-ink-200" />
        </Container>
      </section>

      <section className="bg-white pb-20">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="rounded-[var(--radius-card)] border border-ink-200 p-7"
              >
                <div className="size-14 rounded-full bg-ink-200" />
                <div className="mt-6 h-5 w-2/3 rounded bg-ink-200" />
                <div className="mt-4 h-3.5 w-full rounded-full bg-ink-100" />
                <div className="mt-2 h-3.5 w-4/5 rounded-full bg-ink-100" />
                <div className="mt-6 h-3 w-1/3 rounded-full bg-ink-200" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <span className="sr-only">Loading, please wait.</span>
    </div>
  );
}
