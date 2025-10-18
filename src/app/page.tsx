import GlassMorphism from "@/design/GlassMorphism/GlassMorphism";
import GlassMorphismButton from "@/design/GlassMorphism/GlassMorphismButton";

const Page = () => {
  const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900];

  return (
    <div className="min-h-screen bg-white p-8 transition-colors duration-200 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        {/* Title */}
        <h1 className="font-heading mb-6 text-4xl font-bold text-gray-900 dark:text-gray-100">
          Design System Showcase
        </h1>
        <div className="fixed max-w-[390px] gap-2 flex-col-center">
          <GlassMorphismButton isDisabled={false}>다음</GlassMorphismButton>
          <GlassMorphismButton isDisabled={true}>대기중</GlassMorphismButton>
          <GlassMorphismButton isDisabled={true}>로그인</GlassMorphismButton>
          <GlassMorphism />
        </div>

        {/* Colors */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Colors</h2>

          {/* Example: blue scale from theme.colors.blue[100..900] */}
          <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-5">
            {shades.map((shade) => (
              <div key={`blue-${shade}`} className={`rounded-lg p-4 bg-blue-${shade}` as const}>
                <span className="font-mono text-sm text-gray-900/80 dark:text-gray-900">
                  blue-{shade}
                </span>
              </div>
            ))}
          </div>

          {/* Teal scale */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {shades.map((shade) => (
              <div key={`teal-${shade}`} className={`rounded-lg p-4 bg-teal-${shade}` as const}>
                <span className="font-mono text-sm text-gray-900/80 dark:text-gray-900">
                  teal-{shade}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Spacing (uses theme.extend.spacing xs, sm, md, lg, xl) */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Spacing</h2>
          <div className="space-y-4">
            {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
              <div key={size} className="flex items-center">
                <div className={`h-5 bg-blue-400 dark:bg-blue-500`} style={{ width: undefined }}>
                  {/* box purely sized by padding utility for visual width */}
                </div>
                <div className={`h-5 w-0 bg-purple-400 p-${size}`} />
                <span className="ml-2 font-mono text-gray-700 dark:text-gray-300">{`p-${size}`}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius (sm / lg / xl) */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Border Radius
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-sm bg-gray-100 p-6 dark:bg-gray-800">rounded-sm</div>
            <div className="rounded-lg bg-gray-100 p-6 dark:bg-gray-800">rounded-lg</div>
            <div className="rounded-xl bg-gray-100 p-6 dark:bg-gray-800">rounded-xl</div>
          </div>
        </section>

        {/* Opacity (low / md / high from theme.extend.opacity) */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Opacity</h2>
          <div className="flex items-center gap-4">
            <div className="opacity-low h-10 w-24 rounded bg-purple-500" />
            <div className="opacity-md h-10 w-24 rounded bg-purple-500" />
            <div className="opacity-high h-10 w-24 rounded bg-purple-500" />
          </div>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">low / md / high</div>
        </section>

        {/* Typography (font families & sizes if configured) */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Typography</h2>
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
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <button className="rounded-lg bg-purple-400 px-6 py-2 text-white transition-opacity hover:opacity-90">
              Primary Button
            </button>
            <button className="rounded-lg border border-gray-400 px-6 py-2 text-gray-900 transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800">
              Secondary Button
            </button>
          </div>
        </section>

        {/* Cards (shadow & radius demo) */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Card</h2>
          <div className="p-md rounded-lg bg-white shadow-[5px_5px_5px_3px_rgba(26,32,44,0.15),_4px_4px_5px_6px_#00000033] dark:bg-gray-800">
            <p className="text-gray-800 dark:text-gray-200">
              Custom boxShadow from theme.extend.boxShadow.default applied.
            </p>
          </div>
          <p className="bg-gray-900 p-2 text-white">test</p>
        </section>
      </div>
    </div>
  );
};

export default Page;
