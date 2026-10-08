"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HeroVisual } from "./hero-visual";
import { FloatingData } from "./floating-data";
import { eventData } from "@/lib/event-data";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 pt-28">
      <div className="container relative grid min-h-[760px] items-center gap-14 py-20 lg:grid-cols-[1.05fr_.95fr]">
        <div className="relative z-10">
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-light)]">
            {eventData.type} · {eventData.date}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.7 }} className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            {eventData.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="mt-7 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
            {eventData.description}
          </motion.p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={eventData.registration.formUrl} className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold transition hover:bg-[var(--primary-light)]">
              Register Now <ArrowUpRight size={17} />
            </a>
            <a href="#details" className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white">
              Explore Workshop
            </a>
          </div>
        </div>
        <div className="relative">
          <HeroVisual />
          {/*<FloatingData />} */}
        </div>
      </div>
    </section>
  );
}
