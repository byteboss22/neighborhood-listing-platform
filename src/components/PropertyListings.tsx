"use client";

import { useState } from "react";
import type { Property } from "@/types";
import PropertyCard from "@/components/PropertyCard";
import SearchFilters, { type SearchCriteria } from "@/components/SearchFilters";

interface PropertyListingsProps {
  properties: Property[];
}

export default function PropertyListings({ properties }: PropertyListingsProps) {
  const [criteria, setCriteria] = useState<SearchCriteria>({
    propertyType: "",
    minimumBedrooms: 0,
    maximumPrice: null,
  });

  const matchingProperties = properties.filter(
    (property) =>
      (!criteria.propertyType || property.propertyType === criteria.propertyType) &&
      property.bedrooms >= criteria.minimumBedrooms &&
      (criteria.maximumPrice === null || property.price <= criteria.maximumPrice),
  );

  return (
    <>
      <div className="mt-12">
        <SearchFilters onSearch={setCriteria} />
      </div>

      <section aria-labelledby="listings-heading" className="mt-12">
        <h2 id="listings-heading" className="mb-6 text-2xl font-semibold">
          Available Properties
        </h2>
        <p aria-live="polite" className="sr-only">
          {matchingProperties.length === 1
            ? "1 property matches the selected filters."
            : `${matchingProperties.length} properties match the selected filters.`}
        </p>
        {matchingProperties.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {matchingProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-slate-200 bg-white p-5 text-slate-700">
            No properties match these filters. Try a different selection.
          </p>
        )}
      </section>
    </>
  );
}
