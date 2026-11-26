"use client";

import { useEffect, useRef, useState } from "react";
import { sponsorDecisionSchema } from "@/schemas/sponsorTransport";
import type { SponsorDecision } from "@/lib/selectSponsor";

export default function SponsorPlacement({ propertyId, propertyTitle, placement }: { propertyId: string; propertyTitle: string; placement: "property-card" | "property-detail" }) {
  const [state, setState] = useState<SponsorDecision | "loading" | "error">("loading");
  const region = useRef<HTMLElement>(null);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const query = new URLSearchParams({ property_id: propertyId, placement });
        const response = await fetch(`/api/sponsor-placement?${query}`, { cache: "no-store", signal: controller.signal });
        if (!response.ok) throw new Error("Unavailable");
        const decision = sponsorDecisionSchema.parse(await response.json());
        if (!controller.signal.aborted) setState(decision);
      } catch { if (!controller.signal.aborted) setState("error"); }
    }
    void load();
    return () => controller.abort();
  }, [propertyId, placement]);
  useEffect(() => {
    if (typeof state !== "object" || state.kind !== "sponsor" || !region.current) return;
    const sponsorId = state.sponsor_id;
    let sent = false;
    const observer = new IntersectionObserver((entries) => {
      if (sent || !entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.5)) return;
      sent = true;
      observer.disconnect();
      void fetch("/api/sponsor-impressions", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event_id: crypto.randomUUID(), sponsor_id: sponsorId, property_id: propertyId, placement }),
      }).catch(() => { /* Telemetry failure must not break reading/navigation. */ });
    }, { threshold: 0.5 });
    observer.observe(region.current);
    return () => observer.disconnect();
  }, [state, propertyId, placement]);

  return <aside ref={region} aria-label={`Local information for ${propertyTitle}${placement === "property-detail" ? " — details" : ""}`} className="mt-5 rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
    {state === "loading" ? <p role="status">Loading local sponsor…</p>
      : state === "error" ? <p role="status">Local sponsor information is temporarily unavailable.</p>
      : state.kind === "house" ? <p>{state.message}</p>
      : <>
        <p className="text-sm font-semibold uppercase tracking-wide">Sponsored</p>
        <p className="mt-2 font-semibold">{state.business_name}</p>
        <a className="mt-2 inline-block underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600"
          rel="noreferrer" href={`/api/sponsor-click?${new URLSearchParams({ property_id: propertyId, placement, sponsor_id: state.sponsor_id })}`}>
          Visit {state.business_name}
        </a>
      </>}
  </aside>;
}
