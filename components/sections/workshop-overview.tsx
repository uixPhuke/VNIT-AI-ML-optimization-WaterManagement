"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { CalendarDays, Clock, MapPin, Presentation, type LucideIcon } from "lucide-react";
import { eventData } from "@/lib/event-data";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Details from the workshop poster. Move into eventData if you'd rather keep all copy in one place. */
const details: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: CalendarDays, label: "Dates", value: "December 15–16, 2026" },
  { icon: Clock, label: "Time", value: "9:00 AM – 5:00 PM" },
  { icon: MapPin, label: "Venue", value: "Department of Civil Engineering, VNIT Nagpur" },
  { icon: Presentation, label: "Format", value: "In-person, two-day workshop" },
];

export function WorkshopOverview() {
  const reduce = !!useReducedMotion();

  /* One simple motion for everything: a short fade with a small upward drift. */
  const fade: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };

  return (
    <section id="overview" className="py-20 sm:py-28 lg:py-32">
      <div className="container grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
        {/* Heading stays in view while the text scrolls on large screens */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2.5 pr-4 text-xs font-medium text-white/70 backdrop-blur">
            <Presentation size={14} className="text-[var(--primary-light)]" />
            Overview
          </p>
          <h2 className="mt-6 max-w-lg text-[clamp(2rem,4.6vw,3.25rem)] font-semibold leading-[1.07] tracking-[-0.035em] text-white">
            Where intelligent systems meet water management.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.p variants={fade} className="max-w-2xl text-xl leading-9 text-white/80 sm:text-2xl sm:leading-10">
            {eventData.description}
          </motion.p>

          <motion.p variants={fade} className="mt-6 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
            The workshop brings together academia, research and industry to explore practical challenges, emerging
            technologies and policy needs around intelligent water management.
          </motion.p>

          <motion.dl
            variants={fade}
            className="mt-10 grid gap-x-8 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-2"
          >
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary-light)]">
                  <Icon size={18} strokeWidth={1.7} />
                </span>
                <div className="min-w-0">
                  <dt className="text-sm text-white/45">{label}</dt>
                  <dd className="mt-0.5 text-base leading-6 text-white">{value}</dd>
                </div>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}