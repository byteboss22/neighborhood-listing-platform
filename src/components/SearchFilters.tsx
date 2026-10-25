import { useState, type FormEvent } from "react";
import type { SearchFiltersProps } from "@/types";

function parseRent(value: string): number | undefined {
  const trimmedValue = value.trim();

  if (trimmedValue === "") {
    return undefined;
  }

  const rent = Number(trimmedValue);
  return Number.isFinite(rent) && rent >= 0 ? rent : undefined;
}

export default function SearchFilters({
  cities,
  city,
  maxRentUsd,
  onCityChange,
  onMaxRentChange,
  onSubmit,
  onClear,
}: SearchFiltersProps) {
  const [rentInput, setRentInput] = useState(
    maxRentUsd === undefined ? "" : String(maxRentUsd),
  );
  const [rentError, setRentError] = useState("");
  const rentHintId = "maximum-rent-hint";
  const rentErrorId = "maximum-rent-error";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const rent = parseRent(rentInput);

    if (rentInput.trim() !== "" && rent === undefined) {
      setRentError("Enter a valid monthly rent of zero or more.");
      return;
    }

    setRentError("");
    onMaxRentChange(rent);
    onSubmit();
  }

  function handleRentChange(value: string) {
    setRentInput(value);
    const rent = parseRent(value);

    if (value.trim() === "" || rent !== undefined) {
      setRentError("");
      onMaxRentChange(rent);
    }
  }

  function handleClear() {
    setRentInput("");
    setRentError("");
    onClear();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 grid gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:grid-cols-2 sm:items-start"
    >
      <div>
        <label
          htmlFor="property-city"
          className="mb-2 block font-semibold"
        >
          City
        </label>
        <select
          id="property-city"
          value={city}
          onChange={(event) => onCityChange(event.target.value)}
          className="min-h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus-visible:outline-emerald-300"
        >
          <option value="">All cities</option>
          {cities.map((availableCity) => (
            <option key={availableCity} value={availableCity}>
              {availableCity}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="maximum-monthly-rent"
          className="mb-2 block font-semibold"
        >
          Maximum monthly rent (USD)
        </label>
        <input
          id="maximum-monthly-rent"
          type="text"
          inputMode="decimal"
          value={rentInput}
          onChange={(event) => handleRentChange(event.target.value)}
          aria-invalid={rentError ? true : undefined}
          aria-describedby={
            rentError ? `${rentHintId} ${rentErrorId}` : rentHintId
          }
          className="min-h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus-visible:outline-emerald-300"
        />
        <p
          id={rentHintId}
          className="mt-2 text-sm text-zinc-600 dark:text-zinc-300"
        >
          Optional. Enter a maximum amount per month.
        </p>
        {rentError && (
          <p
            id={rentErrorId}
            role="alert"
            className="mt-2 text-sm font-medium text-red-700 dark:text-red-300"
          >
            {rentError}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
        <button
          type="submit"
          className="min-h-11 rounded-lg bg-emerald-800 px-4 py-2 font-semibold text-white hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 dark:bg-emerald-300 dark:text-zinc-950 dark:hover:bg-emerald-200 dark:focus-visible:outline-emerald-300"
        >
          Apply filters
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="min-h-11 rounded-lg border border-zinc-400 px-4 py-2 font-semibold hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 dark:border-zinc-600 dark:hover:bg-zinc-800 dark:focus-visible:outline-emerald-300"
        >
          Clear filters
        </button>
      </div>
    </form>
  );
}
