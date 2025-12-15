import Link from "next/link";

const securityPractices = [
  "HTTPS everywhere with HSTS and secure cookies.",
  "Input validation, output escaping, and strict content security policies.",
  "Auth with short-lived tokens and rotating refresh/keys.",
  "Rate limiting, IP throttling, and abuse detection on sensitive endpoints.",
  "Dependency scanning, SCA, and routine patching.",
  "Performance budgets, image optimization, and edge caching.",
  "Observability with structured logs, tracing, and alerts.",
];

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-[#030014] text-white pt-28 pb-16 px-6">
      <section className="max-w-5xl mx-auto space-y-10">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-[#b49bff]">
            Performance & Security
          </p>
          <h1 className="text-4xl font-semibold">How I keep products fast and safe</h1>
          <p className="text-gray-300">
            I combine secure-by-default patterns with performance-first engineering to
            ship experiences that feel instant and stay protected. Below is a snapshot of
            the approach I bring to client work and personal projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-[#2A0E61] bg-[#0c0f1a]/80 shadow-xl space-y-3">
            <h2 className="text-xl font-semibold">Security playbook</h2>
            <ul className="space-y-2 text-gray-300 text-sm leading-relaxed list-disc list-inside">
              {securityPractices.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-[#2A0E61] bg-[#0c0f1a]/80 shadow-xl space-y-4">
            <h2 className="text-xl font-semibold">Performance approach</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              I set performance budgets early, measure with Web Vitals, and ship with
              modern tooling—edge rendering, image/CDN optimization, code splitting, and
              caching strategies tailored to the product. The goal: sub-second TTFB, fast
              LCP, and resilient UX under load.
            </p>
            <Link
              href="/contact"
              className="inline-flex px-4 py-2 button-primary rounded-lg text-white"
            >
              Discuss a hardening audit
            </Link>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-gray-400 underline decoration-[#7042f8]"
          >
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}

