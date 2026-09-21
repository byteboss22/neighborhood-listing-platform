export interface Property {
  id: string;
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