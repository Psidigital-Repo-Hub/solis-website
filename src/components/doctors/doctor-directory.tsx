"use client";

import * as React from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Doctor } from "@/types";
import { services } from "@/lib/data/services";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/field";
import { DoctorCard } from "@/components/doctors/doctor-card";

const ALL = "all";

/**
 * Client-side directory over a small, fully-loaded dataset.
 *
 * With a few hundred clinicians this stays instant and avoids a round trip
 * per keystroke. If the roster grows past that, move filtering to the server
 * and drive it from search params instead.
 */
export function DoctorDirectory({ doctors }: { doctors: Doctor[] }) {
  const [query, setQuery] = React.useState("");
  const [department, setDepartment] = React.useState(ALL);
  const [specialty, setSpecialty] = React.useState(ALL);

  const specialties = React.useMemo(
    () => Array.from(new Set(doctors.map((d) => d.specialty))).sort(),
    [doctors],
  );

  const results = React.useMemo(() => {
    const needle = query.trim().toLowerCase();

    return doctors.filter((doctor) => {
      if (department !== ALL && doctor.department !== department) return false;
      if (specialty !== ALL && doctor.specialty !== specialty) return false;
      if (!needle) return true;

      return [
        doctor.name,
        doctor.specialty,
        doctor.credentials,
        doctor.location,
        ...doctor.focusAreas,
        ...doctor.languages,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [doctors, query, department, specialty]);

  const isFiltered = query !== "" || department !== ALL || specialty !== ALL;

  const clear = () => {
    setQuery("");
    setDepartment(ALL);
    setSpecialty(ALL);
  };

  return (
    <div>
      {/* Controls */}
      <div className="rounded-[var(--radius-card)] border border-ink-200 bg-white p-5 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <label
              htmlFor="doctor-search"
              className="mb-2 block text-[13px] font-semibold text-ink-800"
            >
              Search by name, specialty or language
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-400"
                aria-hidden
              />
              <input
                id="doctor-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="For example: cardiology, Spanish, Osei"
                className={cn(
                  "h-12 w-full rounded-[var(--radius-btn)] border border-ink-200 bg-white pl-10 pr-3.5",
                  "font-body text-[15px] text-ink-800 placeholder:text-ink-400",
                  "transition-[border-color,box-shadow] duration-150",
                  "focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/12",
                )}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="doctor-department"
              className="mb-2 block text-[13px] font-semibold text-ink-800"
            >
              Department
            </label>
            <Select
              id="doctor-department"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
            >
              <option value={ALL}>All departments</option>
              {services.map((service) => (
                <option key={service.slug} value={service.slug}>
                  {service.name}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label
              htmlFor="doctor-specialty"
              className="mb-2 block text-[13px] font-semibold text-ink-800"
            >
              Specialty
            </label>
            <Select
              id="doctor-specialty"
              value={specialty}
              onChange={(event) => setSpecialty(event.target.value)}
            >
              <option value={ALL}>All specialties</option>
              {specialties.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {isFiltered ? (
          <div className="mt-5 flex items-center gap-3 border-t border-ink-100 pt-5">
            <SlidersHorizontal className="size-4 text-ink-400" aria-hidden />
            <p className="font-body text-[13.5px] text-ink-600">
              Filters applied
            </p>
            <Button variant="ghost" size="sm" onClick={clear} className="ml-auto">
              <X className="size-3.5" aria-hidden />
              Clear all
            </Button>
          </div>
        ) : null}
      </div>

      {/* Result count, announced on change */}
      <p
        aria-live="polite"
        className="mt-8 font-body text-[14px] text-ink-600"
      >
        Showing <span className="font-semibold text-ink-800">{results.length}</span>{" "}
        {results.length === 1 ? "clinician" : "clinicians"}
        {isFiltered ? " matching your filters" : ""}.
      </p>

      {/* Results */}
      {results.length > 0 ? (
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((doctor) => (
            <li key={doctor.id} className="h-full">
              <DoctorCard doctor={doctor} className="h-full" headingAs="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-[var(--radius-card)] border border-dashed border-ink-300 bg-ink-50 px-6 py-16 text-center">
          <h2 className="type-h3 text-ink-800">No clinicians match that search</h2>
          <p className="type-body mx-auto mt-3 max-w-[46ch]">
            Try a broader term, or clear the filters to see everyone. Our
            scheduling team can also help you find the right specialist.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button variant="outline" size="md" onClick={clear}>
              Clear filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
