"use client";

import { useId } from "react";

const selectClassName =
  "mt-1 w-full min-w-0 rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus-visible:outline-4 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-blue-900";

export default function SearchFilters() {
  const id = useId();

  return (
    <form
      role="search"
      aria-label="Property search filters"
      onSubmit={(event) => event.preventDefault()}
      className="grid grid-cols-1 gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <div className="min-w-0">
        <label htmlFor={`${id}-property-type`} className="block text-sm font-medium text-slate-900">
          Property type
        </label>
        <select id={`${id}-property-type`} name="propertyType" className={selectClassName}>
          <option value="">All property types</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
        </select>
      </div>

      <div className="min-w-0">
        <label htmlFor={`${id}-minimum-bedrooms`} className="block text-sm font-medium text-slate-900">
          Minimum bedrooms
        </label>
        <select id={`${id}-minimum-bedrooms`} name="minimumBedrooms" className={selectClassName}>
          <option value="">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </div>

      <div className="min-w-0">
        <label htmlFor={`${id}-maximum-price`} className="block text-sm font-medium text-slate-900">
          Maximum price
        </label>
        <select id={`${id}-maximum-price`} name="maximumPrice" className={selectClassName}>
          <option value="">No maximum</option>
          <option value="500000">$500,000</option>
          <option value="750000">$750,000</option>
          <option value="1000000">$1,000,000</option>
          <option value="1500000">$1,500,000</option>
        </select>
      </div>

      <button
        type="submit"
        className="min-w-0 self-end rounded-md bg-blue-700 px-4 py-2 text-white hover:bg-blue-800 focus-visible:outline-4 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-blue-900"
      >
        Search properties
      </button>
    </form>
  );
}
