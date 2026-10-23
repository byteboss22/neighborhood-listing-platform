const features = [
  {
    title: "Listings",
    description:
      "Neighbors will be able to discover and share local items, services, and community opportunities.",
  },
  {
    title: "Neighborhood Sponsors",
    description:
      "Local businesses and organizations will be highlighted for supporting the neighborhood and its residents.",
  },
  {
    title: "Voice Help",
    description:
      "A future voice help feature will aim to make finding information easier. Voice functionality is not available in this lab.",
  },
];

export default function Home() {
  return (
    <main className="flex-1 bg-slate-50 px-6 py-12 font-sans text-slate-900 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-teal-800">
            CIS 3610 · Lab 1
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
            Neighborhood Listing Platform
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            This project aims to connect neighbors with local listings, community
            sponsors, and accessible help. This initial app shell introduces
            planned features for a more connected neighborhood.
          </p>
        </header>

        <section aria-label="Planned features" className="mt-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-xl font-semibold text-slate-900">
                  {feature.title}
                </h2>
                <p className="mt-3 leading-7 text-slate-700">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
