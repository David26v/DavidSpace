import React from "react";

const capabilities = [
  "Web Development",
  "Mobile Apps",
  "Digital Marketing",
  "Cloud Infrastructure",
  "UI & UX Design",
  "API Integrations",
  "DevOps & CI/CD",
  "Security & Auth",
];

const Capabilities = () => {
  return (
    <section className="relative z-10 w-full py-20 px-6 lg:px-20 flex flex-col items-center gap-6 text-center">
      <div className="flex flex-col gap-3 max-w-full items-center">
        <p className="uppercase text-xs tracking-[0.3em] text-[#b49bff]">
          Capabilities
        </p>
        <h3 className="text-3xl md:text-4xl font-semibold text-white">
          A connected web of what I ship
        </h3>
        <p className="text-gray-300 max-w-2xl">
          Bigger, bolder view of the services I deliver—mapped like a web so you
          can see the range at a glance.
        </p>
      </div>

      <div className="w-full max-w-6xl mt-6 p-10 rounded-3xl bg-[#0c0f1a]/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#2A0E6122_0,transparent_45%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7042f822_0,transparent_65%)] pointer-events-none" />
        <div className="relative z-10 w-full flex items-center justify-center">
          <div className="relative w-full max-w-5xl h-[520px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-44 h-44 rounded-full bg-[#2A0E61]/30 border border-[#7042f8] flex items-center justify-center text-white text-sm text-center px-4">
                Outcome-driven delivery
              </div>
            </div>
            {capabilities.map((cap, idx) => {
              const angle = (idx / capabilities.length) * 2 * Math.PI;
              const radius = 220;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <div
                  key={cap}
                  className="absolute"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="w-32 text-xs text-white text-center rounded-xl border border-[#2A0E61]/60 bg-[#0f1220]/80 px-3 py-2 shadow-lg shadow-[#2A0E61]/30">
                    {cap}
                  </div>
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      left: "50%",
                      top: "50%",
                      width: "2px",
                      height: `${radius}px`,
                      transformOrigin: "top",
                      transform: `translate(-50%, -50%) rotate(${angle}rad)`,
                      background:
                        "linear-gradient(to bottom, #facc15 0%, transparent 80%)",
                      opacity: 0.65,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;

