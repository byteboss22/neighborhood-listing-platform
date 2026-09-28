export interface Property {
  id: string;
  propertyType: "house" | "apartment" | "condo";
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  imageUrl: string;
  imageAlt: string;
  propertyUrl: string;
}

export interface Sponsor {
  id: string;
  businessName: string;
  message: string;
  url: string;
}
