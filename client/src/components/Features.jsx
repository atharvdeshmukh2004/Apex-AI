
import React, { useRef } from "react";
import { features } from "../../data/feature";
import { Card, CardContent } from "@/components/ui/card";
import Accordian from "./Accordian";
import { motion, useInView } from "framer-motion";

// ─── Inline SVG icons (no react-icons) ───────────────────────────────────────
const IconSparkle = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3v1m0 16v1M4.22 4.22l.7.7m13.16 13.16.7.7M3 12h1m16 0h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

// ─── Fade-up scroll wrapper ───────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Icon accent colours cycling through indigo/violet/emerald/amber ─────────
const iconBgs = [
  "bg-indigo-600",
  "bg-violet-600",
  "bg-emerald-600",
  "bg-amber-500",
];
const iconShadows = [
  "shadow-indigo-200",
  "shadow-violet-200",
  "shadow-emerald-200",
  "shadow-amber-200",
];

function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* ── Section header ── */}
        <FadeUp className="text-center mb-14">
          <span className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-[0.15em] text-indigo-600 uppercase bg-indigo-50 rounded-full">
            What you get
          </span>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Powerful features for your{" "}
            <span className="text-indigo-600">career growth</span>
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto text-base">
            Everything you need to discover, prepare for, and land the role that
            fits you best.
          </p>
        </FadeUp>

        {/* ── Feature cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {features.map((feature, index) => (
            <FadeUp key={feature.id ?? index} delay={index * 0.07}>
              <div className="group relative bg-white rounded-2xl border border-slate-200 p-7 h-full hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-50 transition-all duration-300 flex flex-col">
                {/* Ghost index number */}
                <span className="absolute top-4 right-5 text-5xl font-black text-slate-100 group-hover:text-indigo-50 transition-colors select-none leading-none">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div
                  className={`relative z-10 w-11 h-11 rounded-xl ${iconBgs[index % iconBgs.length]} text-white flex items-center justify-center mb-5 shadow-md ${iconShadows[index % iconShadows.length]} flex-shrink-0`}
                >
                  {/* Render the feature icon if it's a valid React element, else fallback */}
                  {feature.icon ? (
                    <span className="[&_svg]:w-5 [&_svg]:h-5 [&_svg]:stroke-white">
                      {feature.icon}
                    </span>
                  ) : (
                    <IconSparkle />
                  )}
                </div>

                {/* Text */}
                <h3 className="relative z-10 text-base font-bold text-slate-900 mb-2 text-left">
                  {feature.title ?? "Feature"}
                </h3>
                <p className="relative z-10 text-sm text-slate-500 leading-relaxed text-left flex-1">
                  {feature.description ?? "Description"}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* ── Divider before Accordion ── */}
        <FadeUp>
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">
              Frequently asked
            </span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>
        </FadeUp>

        {/* ── Accordion ── */}
        <FadeUp>
          <Accordian />
        </FadeUp>
      </div>
    </section>
  );
}

export default Features;
