# Property-Card Component Architecture Audit

## 1. Semantic Root & Headings

### Question

Paste lines 1–15 of your component JSX. State which HTML5 semantic wrapper tag you chose (for example, `<article>` or `<li>`) and cite the exact heading level (`<h1>`–`<h6>`) used for the property title, explaining your document outline hierarchy.

### Answer

The first 15 lines of the component's JSX are:

```tsx
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
```

I used `<article>` as the semantic root because each property card is a self-contained listing that could stand independently.

The property title uses `<h3>`. This follows the document hierarchy:

- `<h1>`: “Neighborhood Listing Platform”
- `<h2>`: “Available Properties”
- `<h3>`: Individual property title

## 2. Dynamic Image Alternative

### Question

Paste the `<Image />` or `<img>` JSX element. Explain how your `alt` attribute dynamically interpolates property data (for example, ``alt={`${property.address} - ${property.city}`}``) to avoid generic text such as “property image.”

### Answer

```tsx
<Image
  src={property.imageUrl}
  alt={property.imageAlt}
  width={800}
  height={600}
  unoptimized
  className="aspect-[4/3] w-full object-cover"
/>
```

The `alt` attribute dynamically reads `property.imageAlt` from each property object. For example, the Cedar Street property supplies:

```tsx
imageAlt: "Illustration of a single-story home with a front porch and trees"
```

Therefore, every image receives a specific description instead of generic text such as “property image.”

## 3. Interactive Controls & Event Handlers

### Question

List every interactive element inside the card, such as a “Favorite” button, “Call Agent” button, or card click-through link. Paste the JSX for one button showing its `onClick` handler and its accessible name through an `aria-label` or visible text.

### Answer

There is one interactive element inside each current card:

- A “View details” link for the property

```tsx
<a
  href={property.propertyUrl}
  className="inline-block rounded text-blue-700 underline underline-offset-2 hover:text-blue-900 focus-visible:outline-4 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-blue-900"
>
  View details for {property.title}
</a>
```

Its accessible name comes from its visible text, such as “View details for Cedar Street Bungalow.” It uses the native `href` navigation behavior, so no `onClick` handler is necessary.

The current implementation contains no button or JavaScript `onClick` handler. If the assignment specifically requires a button handler, the repository does not presently meet that requirement.

## 4. Keyboard Navigation Trace

### Question

Tab into your card on `localhost`. List the exact tab sequence (Element 1 → Element 2 → Element 3). State what CSS class handles the `:focus-visible` ring.

### Answer

Each card contains only one focusable control. The `<article>` itself, image, heading, property information, and feature list are not in the Tab order.

Moving through the three rendered cards follows this order:

**Element 1:** “View details for Cedar Street Bungalow”  
→ **Element 2:** “View details for Willow Court Apartment”  
→ **Element 3:** “View details for Oak Terrace Condo”

Immediately before the first card link, focus is on the search form's “Search properties” button. After the third card link, focus moves to the sponsor link.

The focus ring is provided by these Tailwind variants:

```text
focus-visible:outline-4
focus-visible:outline-solid
focus-visible:outline-offset-4
focus-visible:outline-blue-900
```

This ordering matches the manual Chrome keyboard retest recorded in `docs/accessibility-testing.md`. That retest used Tab and Shift+Tab and confirmed the focus indicator after the focus-style fix.

## 5. Responsive CSS Rules

### Question

Paste the Tailwind classes or CSS block governing card layout across viewports. Identify the exact breakpoint, such as `md:` or `lg:`, where the layout transitions from a vertical stack to a horizontal grid.

### Answer

The responsive listing layout is controlled by the parent listings container:

```tsx
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
```

The layout behavior is:

- Default/mobile: one-column vertical stack
- `md:` at 48rem/768px: two-column grid
- `lg:` at 64rem/1024px: three-column grid

The first transition from a vertical stack to a horizontal multi-column grid occurs at the `md:` breakpoint.

The content inside each individual card remains vertically arranged at every breakpoint; only the surrounding property-card grid changes column count.
