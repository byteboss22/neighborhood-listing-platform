import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import seed from "../../../data/generated/ai-studio-attempt-01.json";
import { listingView } from "@/lib/listingView";

export default function SponsorDemo() {
  const result = listingView(seed);
  const ids = ["maple-court-apartment", "cedar-window-studio", "cedar-garden-townhouse"];
  return <main className="mx-auto max-w-6xl px-6 py-12 text-zinc-950 dark:text-zinc-50">
    <h1 className="text-3xl font-semibold">Fictional neighborhood sponsors</h1>
    <p className="mt-4">Three fictional properties demonstrate a ZIP match, a nearby match and an ordinary house message. No real property location or business offer is represented.</p>
    <section aria-labelledby="fictional-properties-heading">
    <h2 id="fictional-properties-heading" className="sr-only">Fictional property examples</h2>
    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {result.success ? result.properties.filter((p) => ids.includes(p.id)).map((p) => <PropertyCard key={p.id} property={p} />) : <p role="status">Sample properties are unavailable.</p>}
    </div>
    </section>
    <Link href="/" className="mt-8 inline-block underline focus-visible:outline-2 focus-visible:outline-offset-4">Back to listings</Link>
  </main>;
}
