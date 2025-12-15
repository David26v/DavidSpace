 "use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const contactReasons = [
  { value: "project", label: "Project inquiry" },
  { value: "freelance", label: "Freelance engagement" },
  { value: "consulting", label: "Consulting / audit" },
  { value: "hiring", label: "Full-time opportunities" },
  { value: "other", label: "Other" },
];

export default function ContactPage() {
  const token = process.env.NEXT_PUBLIC_THUMIO_TOKEN;
  const slides = useMemo(
    () =>
      [
        {
          title: "C5M World",
          url: "https://c5m.world/",
          fallback: "/SpaceWebsite.png",
        },
        {
          title: "AMAYA PH",
          url: "https://amaya-ph.vercel.app/",
          fallback: "/CardImage.png",
        },
        {
          title: "SupraArc",
          url: "https://www.supraarc.com/",
          fallback: "/SpaceCenter.png",
        },
        {
          title: "Astraeus Tech",
          url: "https://astraeus-tech.vercel.app/",
          fallback: "/Space1.png",
        },
      ].map((item) => ({
        ...item,
        src: token
          ? `https://image.thum.io/get/raw/${token}/width/1200/crop/800/${encodeURI(
              item.url
            )}`
          : item.fallback,
      })),
    [token]
  );
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  return (
    <main className="min-h-screen bg-[#030014] text-white pt-28 pb-16 px-6">
      <section className="max-w-6xl mx-auto space-y-12">
        <div className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-[#facc15]">
            Contact
          </p>
          <h1 className="text-4xl font-semibold">Let&apos;s talk</h1>
          <p className="text-gray-300">
            Tell me what you need—whether it&apos;s a new build, a performance/security
            audit, or joining your team. I&apos;ll get back within one business day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="relative rounded-2xl overflow-hidden border border-[#2A0E61]/70 bg-[#0c0f1a] min-h-[380px] flex flex-col">
            <div className="relative flex-1">
              <Image
                src={slides[index].src}
                alt={slides[index].title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f1a]/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wide text-[#facc15]">
                    Featured preview
                  </span>
                  <span className="text-lg font-semibold text-white">
                    {slides[index].title}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    className="h-10 w-10 rounded-full bg-[#0c0f1a]/80 border border-[#2A0E61] text-white hover:border-[#facc15] transition"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="h-10 w-10 rounded-full bg-[#0c0f1a]/80 border border-[#2A0E61] text-white hover:border-[#facc15] transition"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 py-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    i === index
                      ? "bg-[#facc15]"
                      : "bg-[#2A0E61]/70 hover:bg-[#7042f8]"
                  }`}
                />
              ))}
            </div>
          </div>

          <form className="bg-[#0c0f1a]/80 border border-[#2A0E61] rounded-2xl p-8 space-y-6 shadow-xl flex flex-col justify-between">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-2 text-sm text-gray-200">
                Name
                <input
                  required
                  type="text"
                  className="rounded-lg bg-[#0d0f1f] border border-[#2A0E61] px-4 py-3 text-white focus:outline-none focus:border-[#7042f8]"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-gray-200">
                Email
                <input
                  required
                  type="email"
                  className="rounded-lg bg-[#0d0f1f] border border-[#2A0E61] px-4 py-3 text-white focus:outline-none focus:border-[#7042f8]"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm text-gray-200">
              What can I help with?
              <select
                required
                className="rounded-lg bg-[#0d0f1f] border border-[#2A0E61] px-4 py-3 text-white focus:outline-none focus:border-[#7042f8]"
                defaultValue=""
              >
                <option value="" disabled>
                  Select an option
                </option>
                {contactReasons.map((reason) => (
                  <option key={reason.value} value={reason.value}>
                    {reason.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm text-gray-200">
              Message
              <textarea
                required
                rows={5}
                className="rounded-lg bg-[#0d0f1f] border border-[#2A0E61] px-4 py-3 text-white focus:outline-none focus:border-[#7042f8]"
                placeholder="Share context, timelines, and any links that help."
              />
            </label>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#facc15] to-[#f97316] text-white font-semibold"
            >
              Send message
            </button>
            <p className="text-sm text-gray-400 text-center">
              Prefer email? Reach me directly at{" "}
              <a
                href="mailto:david.fajardo26v@gmail.com"
                className="underline decoration-[#7042f8]"
              >
                david.fajardo26v@gmail.com
              </a>
            </p>
          </form>
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

