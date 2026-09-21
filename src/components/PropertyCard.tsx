import Image from "next/image";
import type { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
}

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white text-slate-900 shadow-sm">
      <Image
        src={property.imageUrl}
        alt={property.imageAlt}
        width={800}
        height={600}
        unoptimized
        className="aspect-[4/3] w-full object-cover"
      />

      <div className="space-y-3 p-5">
        <div>
          <h3 className="text-xl font-semibold">{property.title}</h3>
          <p className="mt-1 text-sm text-slate-600">{property.address}</p>
        </div>

        <p className="text-lg font-semibold">{priceFormatter.format(property.price)}</p>

        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-700">
          <li>{property.bedrooms} bedrooms</li>
          <li>{property.bathrooms} bathrooms</li>
          <li>{property.squareFeet.toLocaleString("en-US")} sq ft</li>
        </ul>

        <a
          href={property.propertyUrl}
          className="inline-block rounded text-blue-700 underline underline-offset-2 hover:text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
        >
          View details for {property.title}
        </a>
      </div>
    </article>
  );
}
