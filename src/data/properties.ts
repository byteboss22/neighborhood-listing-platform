import type { Property } from "@/types";

// Fictional demonstration listings, cities, addresses, and prices; not rentals.
export const properties: Property[] = [
  {
    id: "maple-court-apartment",
    title: "Maple Court Apartment",
    streetAddress: "120 Example Maple Lane",
    city: "Maplehaven",
    monthlyRentUsd: 1850,
    bedrooms: 2,
    bathrooms: 1,
    imagePath: "/images/maple-court.svg",
    imageAlt:
      "Original illustration of a terracotta apartment building with blue windows and a tree beside the entrance.",
  },
  {
    id: "cedar-window-studio",
    title: "Cedar Window Studio",
    streetAddress: "24 Example Cedar Walk",
    city: "Cedarbrook Heights",
    monthlyRentUsd: 1250,
    bedrooms: 0,
    bathrooms: 1,
    imagePath: "/images/cedar-studio.svg",
    imageAlt:
      "Original illustration of a cream studio building with a wide blue window, a green door, and two planters.",
  },
  {
    id: "willow-porch-house",
    title: "Willow Porch House",
    streetAddress: "86 Example Willow Way",
    city: "Maplehaven",
    monthlyRentUsd: 2600,
    bedrooms: 3,
    bathrooms: 2,
    imagePath: "/images/willow-house.svg",
    imageAlt:
      "Original illustration of a blue house with a dark pitched roof, a front porch, and a yellow door.",
  },
];
