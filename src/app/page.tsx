const Page = () => {
  const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100 font-heading">
          Design System Showcase
        </h1>

        {/* Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Colors</h2>

          {/* Example: blue scale from theme.colors.blue[100..900] */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {shades.map((shade) => (
              <div key={`blue-${shade}`} className={`p-4 rounded-lg bg-blue-${shade}` as const}>
                <span className="text-sm font-mono text-gray-900/80 dark:text-gray-900">
                  blue-{shade}
                </span>
              </div>
            ))}
          </div>

          {/* Teal scale */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {shades.map((shade) => (
              <div key={`teal-${shade}`} className={`p-4 rounded-lg bg-teal-${shade}` as const}>
                <span className="text-sm font-mono text-gray-900/80 dark:text-gray-900">
                  teal-{shade}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Spacing (uses theme.extend.spacing xs, sm, md, lg, xl) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Spacing</h2>
          <div className="space-y-4">
            {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
              <div key={size} className="flex items-center">
                <div className={`bg-blue-400 dark:bg-blue-500 h-5`} style={{ width: undefined }}>
                  {/* box purely sized by padding utility for visual width */}
                </div>
                <div className={`bg-purple-400 h-5 w-0 p-${size}`} />
                <span className="ml-2 text-gray-700 dark:text-gray-300 font-mono">{`p-${size}`}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius (sm / lg / xl) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Border Radius
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-sm">rounded-sm</div>
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">rounded-lg</div>
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl">rounded-xl</div>
          </div>
        </section>

        {/* Opacity (low / md / high from theme.extend.opacity) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Opacity</h2>
          <div className="flex items-center gap-4">
            <div className="w-24 h-10 bg-purple-500 opacity-low rounded" />
            <div className="w-24 h-10 bg-purple-500 opacity-md rounded" />
            <div className="w-24 h-10 bg-purple-500 opacity-high rounded" />
          </div>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">low / md / high</div>
        </section>

        {/* Typography (font families & sizes if configured) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Typography</h2>
          <div className="space-y-3">
            <p className="font-heading text-4xl text-gray-900 dark:text-gray-100">
              Heading (font-heading)
            </p>
            <p className="font-body text-base text-gray-800 dark:text-gray-200">
              Body (font-body). The quick brown fox jumps over the lazy dog.
            </p>
            <p className="tracking-increased text-gray-700 dark:text-gray-300">
              Tracking increased
            </p>
            <p className="tracking-decreased text-gray-700 dark:text-gray-300">
              Tracking decreased
            </p>
          </div>
        </section>

        {/* Buttons (accent) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-2 rounded-lg bg-purple-400 text-white hover:opacity-90 transition-opacity">
              Primary Button
            </button>
            <button className="px-6 py-2 rounded-lg border border-gray-400 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              Secondary Button
            </button>
          </div>
        </section>

        {/* Cards (shadow & radius demo) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Card</h2>
          <div className="p-md bg-white dark:bg-gray-800 rounded-lg shadow-[5px_5px_5px_3px_rgba(26,32,44,0.15),_4px_4px_5px_6px_#00000033]">
            <p className="text-gray-800 dark:text-gray-200">
              Custom boxShadow from theme.extend.boxShadow.default applied.
            </p>
          </div>
          <p className="bg-gray-900 text-white p-2">test</p>
        </section>
      </div>
    </div>
  );
};

export default Page;
