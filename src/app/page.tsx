export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header Region */}
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
            Neighborhood Listing Platform
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A community-driven hub connecting residents with local listings, trusted neighborhood sponsors, and accessible voice assistance.
          </p>
        </header>

        {/* Feature Cards Region */}
        <main>
          <section aria-labelledby="features-heading">
            <h2 id="features-heading" className="sr-only">
              Platform Features
            </h2>

            <ul role="list" className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <li className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
                <h3 className="text-xl font-semibold text-slate-800">
                  Listings
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-normal">
                  Explore available properties, local homes, and community rental listings.
                </p>
              </li>

              <li className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
                <h3 className="text-xl font-semibold text-slate-800">
                  Neighborhood Sponsors
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-normal">
                  Connect with local businesses and community sponsors supporting our area.
                </p>
              </li>

              <li className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
                <h3 className="text-xl font-semibold text-slate-800">
                  Voice Help
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-normal">
                  Access hands-free voice support and audio navigation assistance for platform services.
                </p>
              </li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}