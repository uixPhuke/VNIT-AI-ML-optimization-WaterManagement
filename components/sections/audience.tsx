"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  BookOpen,
  Cpu,
  Droplets,
  Factory,
  FlaskConical,
  GraduationCap,
  Landmark,
  Users,
  type LucideIcon,
} from "lucide-react";
import { eventData } from "@/lib/event-data";

const EASE = [0.22, 1, 0.36, 1] as const;

const fallbackIcons: LucideIcon[] = [Users, Droplets];

/* Picks an icon from the wording of each audience item, so editing eventData needs no code change. */
function iconFor(text: string, index: number): LucideIcon {
  const t = text.toLowerCase();
  if (/polic|govern/.test(t)) return Landmark;
  if (/scientist|research/.test(t)) return FlaskConical;
  if (/faculty|professor|teach/.test(t)) return GraduationCap;
  if (/scholar|student|phd|\bpg\b/.test(t)) return BookOpen;
  if (/smart|technolog|developer|manufactur/.test(t)) return Cpu;
  if (/industry|professional|corporation|supply|provider/.test(t)) return Factory;
  return fallbackIcons[index % fallbackIcons.length];
}

export function Audience() {
  const reduce = !!useReducedMotion();
  const items = eventData.audience as string[];

  /* One simple motion for everything: a short fade with a small upward drift. */
  const fade: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };

  return (
    <section id="audience" className="relative overflow-hidden bg-[var(--surface)] py-20 sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-[var(--primary)]/10 blur-3xl"
      />

      <div className="container relative grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
        {/* Intro stays in view while the cards scroll on large screens */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2.5 pr-4 text-xs font-medium text-white/70 backdrop-blur">
            <Users size={14} className="text-[var(--primary-light)]" />
            Who can attend
          </p>

          <h2 className="mt-6 max-w-lg text-[clamp(2rem,4.6vw,3.25rem)] font-semibold leading-[1.07] tracking-[-0.035em] text-white">
            Built for people working on the future of water.
          </h2>

          <p className="mt-5 max-w-md text-base leading-7 text-white/55">
            If your work touches water supply, irrigation, research or smart sensing, this workshop is for you.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.06 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {items.map((item, index) => {
            const Icon = iconFor(item, index);
            /* An odd last item spans both columns so the grid never ends with a gap. */
            const spansRow = items.length % 2 === 1 && index === items.length - 1;

            return (
              <motion.li
                key={item}
                variants={fade}
                className={`group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-[var(--primary-light)]/40 hover:bg-white/[0.06] sm:p-6 ${
                  spansRow ? "sm:col-span-2" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary-light)] transition-colors duration-300 group-hover:bg-[var(--primary)]/25">
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                 <p className="pt-1.5 text-[15px] leading-6 !text-white sm:text-base">
  {item}
</p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}