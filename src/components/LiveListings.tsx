"use client";

import { useEffect, useState } from "react";
import PropertyExplorer from "@/components/PropertyExplorer";
import SponsorBanner from "@/components/SponsorBanner";
import { parsePublicListings, type PublicListings } from "@/schemas/listingPersistence";

type State = { kind: "loading" } | { kind: "error" } | { kind: "ready"; data: PublicListings };

export default function LiveListings() {
  const [state, setState] = useState<State>({ kind: "loading" });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch("/api/listings", { cache: "no-store", signal: controller.signal });
        if (!response.ok) throw new Error("Unavailable");
        const data = parsePublicListings(await response.json());
        if (!data) throw new Error("Invalid response");
        if (!controller.signal.aborted) setState({ kind: "ready", data });
      } catch { if (!controller.signal.aborted) setState({ kind: "error" }); }
    }
    void load();
    return () => controller.abort();
  }, [attempt]);

  if (state.kind === "loading") return <p role="status" className="mt-5">Loading approved property listings…</p>;
  if (state.kind === "error") return <div className="mt-5">
    <p role="status">Approved property listings are temporarily unavailable.</p>
    <button type="button" className="mt-3 rounded-lg border px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600"
      onClick={() => { setState({ kind: "loading" }); setAttempt((n) => n + 1); }}>Try loading listings again</button>
  </div>;
  if (!state.data.properties.length) return <p role="status" className="mt-5">No approved property listings are available yet.</p>;
  return <>
    {state.data.sponsors.map((sponsor) => <div key={sponsor.sponsor_id} className="mt-5">
      <SponsorBanner sponsor={{ id: sponsor.sponsor_id, businessName: sponsor.business_name, websiteUrl: sponsor.website_url }} />
    </div>)}
    <PropertyExplorer properties={state.data.properties.map((p) => ({
      id: p.property_id, title: p.title, streetAddress: p.street, city: p.city,
      monthlyRentUsd: p.price, bedrooms: p.bedrooms, bathrooms: p.bathrooms,
      imagePath: p.image_path, imageAlt: p.image_alt,
    }))} />
  </>;
}
