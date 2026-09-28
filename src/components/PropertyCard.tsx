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
  const address = [
    property.address.line_1,
    property.address.line_2,
    `${property.address.city}, ${property.address.state} ${property.address.zip_code}`,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white text-slate-900 shadow-sm">
      <Image
        src={property.image_url}
        alt={property.image_alt}
        width={800}
        height={600}
        unoptimized
        className="aspect-[4/3] w-full object-cover"
      />

      <div className="space-y-3 p-5">
        <div>
          <h3 className="text-xl font-semibold">{property.title}</h3>
          <p className="mt-1 text-sm text-slate-600">{address}</p>
        </div>

        <p className="text-lg font-semibold">{priceFormatter.format(property.price)}</p>

        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-700">
          <li>
            {property.bedrooms} {property.bedrooms === 1 ? "bedroom" : "bedrooms"}
          </li>
          <li>
            {property.bathrooms} {property.bathrooms === 1 ? "bathroom" : "bathrooms"}
          </li>
          <li>{property.square_feet.toLocaleString("en-US")} sq ft</li>
        </ul>

        <a
          href={property.property_url}
          className="inline-block rounded text-blue-700 underline underline-offset-2 hover:text-blue-900 focus-visible:outline-4 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-blue-900"
        >
          View details for {property.title}
        </a>
      </div>
    </article>
  );
}
