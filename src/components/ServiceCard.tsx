"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import type { PublicService } from "@/schemas/service";

const focus = "focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 dark:focus-visible:ring-emerald-300 dark:focus-visible:ring-offset-zinc-900";
const inputClass = `mt-1 w-full rounded-lg border border-zinc-400 bg-white p-3 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 ${focus}`;
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function ServiceCard({ service }: { service: PublicService }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const email = useRef<HTMLInputElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  async function book(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    setState("sending");
    try {
      const response = await fetch("/api/bookings", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service_id: service.id, client_email: fields.get("email"),
          requested_date: fields.get("date"), notes: fields.get("notes") }),
      });
      setState(response.ok ? "sent" : "error");
    } catch { setState("error"); }
  }

  return (
    <article className="min-w-0 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <header><h3 className="text-2xl font-semibold">{service.title}</h3></header>
      <ul className="my-5 list-inside list-disc space-y-2 text-zinc-700 dark:text-zinc-200">
        <li>{currency.format(service.hourly_rate)} per hour</li>
        <li>{service.duration_minutes} minutes</li>
        <li>{service.coverage_radius_miles} mile coverage radius</li>
      </ul>
      <button ref={button} type="button" aria-label={`Book appointment for ${service.title}`}
        aria-expanded={open} aria-controls={id}
        onClick={() => { setOpen(true); requestAnimationFrame(() => email.current?.focus()); }}
        className={`min-h-11 rounded-lg bg-emerald-800 px-4 py-3 font-semibold text-white hover:bg-emerald-900 dark:bg-emerald-300 dark:text-zinc-950 ${focus}`}>
        Book appointment
      </button>
      <div id={id} hidden={!open}>
        <form onSubmit={book} aria-label={`Request appointment for ${service.title}`} className="mt-5 space-y-4">
          <label className="block" htmlFor={`${id}-email`}>Your email
            <input ref={email} id={`${id}-email`} name="email" autoComplete="email" type="email" required className={inputClass} />
          </label>
          <label className="block" htmlFor={`${id}-date`}>Requested date
            <input id={`${id}-date`} name="date" type="date" required className={inputClass} />
          </label>
          <label className="block" htmlFor={`${id}-notes`}>Appointment notes (at least 10 characters)
            <textarea id={`${id}-notes`} name="notes" minLength={10} required rows={3} className={inputClass} />
          </label>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">Your email and notes are shared with this provider and platform administrators. A request does not confirm an appointment.</p>
          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={state === "sending" || state === "sent"}
              className={`min-h-11 rounded-lg bg-emerald-800 px-4 py-3 font-semibold text-white disabled:opacity-60 dark:bg-emerald-300 dark:text-zinc-950 ${focus}`}>
              {state === "sending" ? "Sending…" : state === "sent" ? "Request received" : "Request appointment"}
            </button>
            <button type="button" onClick={() => { setOpen(false); button.current?.focus(); }}
              className={`min-h-11 rounded-lg border border-zinc-400 px-4 py-3 ${focus}`}>Close form</button>
          </div>
          <p role="status">{state === "sent" ? "Your request was received. The provider will contact you to confirm availability." : state === "sending" ? "Sending your request…" : ""}</p>
          {state === "error" && <p role="alert">We could not submit your request. Check your details and try again.</p>}
        </form>
      </div>
    </article>
  );
}
