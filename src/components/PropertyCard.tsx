"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { PropertyCardProps } from "@/types";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export default function PropertyCard({ property }: PropertyCardProps) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();

  return (
    <article className="min-w-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <Image
        src={property.imagePath}
        alt={property.imageAlt}
        width={800}
        height={500}
        className="aspect-[8/5] h-auto w-full object-cover"
      />
      <div className="p-6">
        <h3 className="text-2xl font-semibold tracking-tight">{property.title}</h3>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">
          {property.streetAddress}
          <br />
          {property.city}
        </p>
        <p className="mt-4 text-xl font-semibold">
          {usd.format(property.monthlyRentUsd)}{" "}
          <span className="text-base font-normal text-zinc-600 dark:text-zinc-300">
            per month (USD)
          </span>
        </p>
        <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
          <div>
            <dt className="text-sm text-zinc-600 dark:text-zinc-300">Bedrooms</dt>
            <dd className="font-medium">
              {property.bedrooms === 0 ? "Studio" : property.bedrooms}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-zinc-600 dark:text-zinc-300">Bathrooms</dt>
            <dd className="font-medium">{property.bathrooms}</dd>
          </div>
        </dl>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={detailsId}
          onClick={() => setExpanded((previous) => !previous)}
          className="mt-6 min-h-11 w-full rounded-lg bg-emerald-800 px-4 py-3 text-left font-semibold text-white hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 dark:bg-emerald-300 dark:text-zinc-950 dark:hover:bg-emerald-200 dark:focus-visible:outline-emerald-300"
        >
          {expanded ? "Hide" : "Show"} details for {property.title}
        </button>
        <div
          id={detailsId}
          hidden={!expanded}
          className="mt-5 border-t border-zinc-200 pt-4 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
        >
          <p>
            Twelve months of rent at the listed rate:{" "}
            {usd.format(property.monthlyRentUsd * 12)}. This estimate covers rent
            only; deposits and utilities are not included.
          </p>
          <p className="mt-3">
            This is a fictional demonstration listing, not an available rental.
            The illustration does not depict a real property.
          </p>
        </div>
      </div>
    </article>
  );
}
