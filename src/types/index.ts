export interface Property {
  id: string;
  title: string;
  streetAddress: string;
  city: string;
  monthlyRentUsd: number;
  bedrooms: number;
  bathrooms: number;
  imagePath: string;
  imageAlt: string;
}

export interface Sponsor {
  id: string;
  businessName: string;
  websiteUrl: string;
}

export interface PropertyCardProps {
  property: Property;
}

export interface SponsorBannerProps {
  sponsor: Sponsor;
}

/**
 * Controlled draft filters: city === "" means all cities; maxRentUsd ===
 * undefined means no rent limit. Change callbacks update the draft only.
 * The future client parent applies that draft to listings in onSubmit.
 * SearchFilters must prevent the form's default navigation before onSubmit().
 */
export interface SearchFiltersProps {
  city: string;
  maxRentUsd?: number;
  onCityChange: (city: string) => void;
  onMaxRentChange: (maxRentUsd?: number) => void;
  onSubmit: () => void;
}
