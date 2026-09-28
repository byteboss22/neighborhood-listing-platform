import type { Property, Sponsor } from "@/types";

export const properties: Property[] = [
  {
    id: "cedar-bungalow",
    propertyType: "house",
    title: "Cedar Street Bungalow",
    address: "214 Cedar Street, Brookhaven, CA",
    price: 685000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1640,
    imageUrl: "/properties/cedar-bungalow.svg",
    imageAlt: "Illustration of a single-story home with a front porch and trees",
    propertyUrl: "/properties/cedar-bungalow",
  },
  {
    id: "willow-apartment",
    propertyType: "apartment",
    title: "Willow Court Apartment",
    address: "38 Willow Court, Unit 4, Brookhaven, CA",
    price: 495000,
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 910,
    imageUrl: "/properties/willow-apartment.svg",
    imageAlt: "Illustration of a brick apartment building with balconies",
    propertyUrl: "/properties/willow-apartment",
  },
  {
    id: "oak-terrace-condo",
    propertyType: "condo",
    title: "Oak Terrace Condo",
    address: "702 Oak Terrace, Unit 12, Brookhaven, CA",
    price: 925000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1380,
    imageUrl: "/properties/oak-terrace-condo.svg",
    imageAlt: "Illustration of a modern condo building with large windows",
    propertyUrl: "/properties/oak-terrace-condo",
  },
];

export const sponsor: Sponsor = {
  id: "maple-main-coffee",
  businessName: "Maple & Main Coffee",
  message: "Stop by for locally roasted coffee and a welcoming neighborhood table.",
  url: "https://example.com",
};
