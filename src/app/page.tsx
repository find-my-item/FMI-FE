const Page = () => {
  return (
    <div className="min-h-screen bg-light-bg-default dark:bg-dark-bg-default transition-colors duration-200 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Typography Example */}
        <h1 className="text-4xl font-bold mb-6 text-light-fg-default dark:text-dark-fg-default">
          Design System Showcase
        </h1>

        {/* Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-light-fg-default dark:text-dark-fg-default">
            Colors
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
              <div
                key={`blue-${shade}`}
                className="p-4 rounded-lg"
                style={{ backgroundColor: `var(--core-colors-blue-${shade})` }}
              >
                <span className="text-sm font-mono">blue-{shade}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Spacing */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-light-fg-default dark:text-dark-fg-default">
            Spacing
          </h2>
          <div className="space-y-4">
            {["xs", "sm", "md", "lg", "xl"].map((size) => (
              <div key={size} className="flex items-center">
                <div
                  className="bg-light-accent-default"
                  style={{
                    width: `var(--core-spacing-${size})`,
                    height: "20px",
                  }}
                />
                <span className="ml-2 text-light-fg-muted dark:text-dark-fg-muted">
                  {size} ({`var(--core-spacing-${size})`})
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-light-fg-default dark:text-dark-fg-default">
            Typography
          </h2>
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-light-fg-default dark:text-dark-fg-default">
              Heading 1
            </h1>
            <h2 className="text-3xl font-bold text-light-fg-default dark:text-dark-fg-default">
              Heading 2
            </h2>
            <h3 className="text-2xl font-bold text-light-fg-default dark:text-dark-fg-default">
              Heading 3
            </h3>
            <p className="text-base text-light-fg-default dark:text-dark-fg-default">
              This is a paragraph of text that shows the body font in action. It includes some
              <span className="font-bold"> bold text </span>
              and a{" "}
              <a href="#" className="text-light-accent-default hover:underline">
                link
              </a>
              .
            </p>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-light-fg-default dark:text-dark-fg-default">
            Buttons
          </h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-2 rounded-lg bg-light-accent-default text-light-accent-onaccent hover:opacity-90 transition-opacity">
              Primary Button
            </button>
            <button className="px-6 py-2 rounded-lg border border-light-fg-muted text-light-fg-default hover:bg-light-bg-muted transition-colors dark:border-dark-fg-muted dark:text-dark-fg-default dark:hover:bg-dark-bg-muted">
              Secondary Button
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
