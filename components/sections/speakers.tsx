"use client";

import type { PointerEvent } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Building2, Mic } from "lucide-react";
import { eventData } from "@/lib/event-data";

type Speaker = { name: string; role: string; institution: string };

const EASE = [0.22, 1, 0.36, 1] as const;

/* Groups listed on the workshop poster under "Speakers include". */
const groups = [
  "Academia and industry experts",
  "AI/ML practitioners",
  "Water resource engineers",
  "Water service provider managers",
];

const TITLES = /^(dr|prof|professor|er|mr|mrs|ms|shri|smt)\.?$/i;

/* "Dr. Pramod Kumar Sharma" -> "PS" (skips titles, uses first and last name). */
function initials(name: string) {
  const parts = name.split(/\s+/).filter((p) => p && !TITLES.test(p));
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function SpeakerCard({ speaker, index, reduce }: { speaker: Speaker; index: number; reduce: boolean }) {
  /* Column-based stagger so the delay stays short at every breakpoint. */
  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 28, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.75, ease: EASE, delay: (index % 3) * 0.09 },
    },
  };

  /* Updates CSS variables directly, so following the cursor never re-renders. */
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <motion.article
      variants={variants}
      whileHover={reduce ? undefined : { y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      onPointerMove={onMove}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-[var(--primary-light)]/40 hover:bg-white/[0.05] sm:p-7"
    >
      {/* Cursor spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(260px_circle_at_var(--x,50%)_var(--y,0%),rgba(22,119,210,.22),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Avatar with a ring that spins slowly on hover */}
      <div className="relative mb-6 h-14 w-14">
        <div
          aria-hidden
          className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,var(--primary-light),transparent_40%,var(--primary),var(--primary-light))] opacity-60 transition-opacity duration-300 [animation-duration:6s] group-hover:animate-spin group-hover:opacity-100 motion-reduce:animate-none"
        />
        <div className="absolute inset-[2px] grid place-items-center rounded-full bg-[var(--surface)] text-sm font-semibold tracking-wide text-[var(--primary-light)]">
          {initials(speaker.name)}
        </div>
      </div>

      <h3 className="relative text-xl font-medium leading-snug text-white">{speaker.name}</h3>
      <p className="relative mt-2 text-sm leading-6 text-white/60">{speaker.role}</p>

      <div className="relative mt-auto flex items-start gap-2.5 border-t border-white/10 pt-5 text-sm leading-5 text-white/45 transition-colors duration-300 group-hover:text-white/65">
        <Building2 size={16} className="mt-0.5 shrink-0 text-[var(--primary-light)]/70" />
        <span>{speaker.institution}</span>
      </div>
    </motion.article>
  );
}

export function Speakers() {
  const reduce = !!useReducedMotion();
  const speakers = eventData.speakers as Speaker[];

  const rise: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  const lines = ["Academia.", "Industry.", "Research."];

  return (
    <section id="speakers" className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[min(900px,90vw)] -translate-x-1/2 rounded-full bg-[var(--primary)]/10 blur-3xl"
      />

      <div className="container relative">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.1 }}
          className="max-w-3xl"
        >
          <motion.p
            variants={rise}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2.5 pr-4 text-xs font-medium text-white/70 backdrop-blur"
          >
            <Mic size={14} className="text-[var(--primary-light)]" />
            Speakers · {speakers.length} experts
          </motion.p>

          <h2 className="mt-6 text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-white">
            {lines.map((line) => (
              <span key={line} className="-mb-[0.1em] mr-[0.25em] inline-block overflow-hidden pb-[0.1em] align-bottom">
                <motion.span
                  className="inline-block"
                  variants={{
                    hidden: { y: "115%" },
                    show: { y: 0, transition: { duration: 0.8, ease: EASE } },
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p variants={rise} className="mt-5 max-w-xl text-base leading-7 text-white/55 sm:text-lg">
            Learn from people who build, run and research water systems every day.
          </motion.p>

          <motion.ul variants={rise} className="mt-6 flex flex-wrap gap-2">
            {groups.map((g) => (
              <li
                key={g}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-white/60"
              >
                {g}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          {speakers.map((speaker, index) => (
            <SpeakerCard key={speaker.name} speaker={speaker} index={index} reduce={reduce} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}