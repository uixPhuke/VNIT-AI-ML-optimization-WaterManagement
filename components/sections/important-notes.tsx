"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Award,
  BedDouble,
  ClipboardList,
  CreditCard,
  Info,
  MapPin,
  Users,
  type LucideIcon,
} from "lucide-react";
import { eventData } from "@/lib/event-data";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Picks an icon from the wording of each note, so editing eventData needs no code change. */
function iconFor(text: string): LucideIcon {
  const t = text.toLowerCase();
  if (/accommodation|meal|stay|food/.test(t)) return BedDouble;
  if (/certificate/.test(t)) return Award;
  if (/seat|limited|capacity/.test(t)) return Users;
  if (/in-person|in person|venue|nagpur|campus/.test(t)) return MapPin;
  if (/payment|fee|gst|pay/.test(t)) return CreditCard;
  if (/regist|form|apply/.test(t)) return ClipboardList;
  return Info;
}

export function ImportantNotes() {
  const reduce = !!useReducedMotion();
  const notes = eventData.notes as string[];

  const rise: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  /* Rows slide in from the left, one after another. */
  const row: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, x: -24 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
  };

  const words = "Everything you need to know.".split(" ");

  return (
    <section id="notes" className="py-20 sm:py-28 lg:py-32">
      <div className="container">
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
            <Info size={14} className="text-[var(--primary-light)]" />
            Important notes
          </motion.p>

          <motion.h2
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
            className="mt-6 text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-white"
          >
            {words.map((w, i) => (
              <span key={`${w}-${i}`}>
                <span className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-bottom">
                  <motion.span
                    className="inline-block"
                    variants={{
                      hidden: { y: "115%" },
                      show: { y: 0, transition: { duration: 0.8, ease: EASE } },
                    }}
                  >
                    {w}
                  </motion.span>
                </span>{" "}
              </span>
            ))}
          </motion.h2>
        </motion.div>

        {/* One calm list: no cards, no lift, no background effects */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.09 }}
          className="mt-12 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface)] sm:mt-14"
        >
          {notes.map((note) => {
            const Icon = iconFor(note);
            return (
              <motion.li
                key={note}
                variants={row}
                className="group relative flex items-start gap-4 px-5 py-5 transition-colors duration-300 hover:bg-white/[0.03] sm:items-center sm:gap-5 sm:px-8 sm:py-6"
              >
                {/* Accent bar grows in on hover */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-0.5 origin-center scale-y-0 bg-[var(--primary-light)] transition-transform duration-300 group-hover:scale-y-100"
                />
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary-light)] transition-colors duration-300 group-hover:border-[var(--primary-light)]/60 group-hover:bg-[var(--primary)]/25">
                  <Icon size={18} strokeWidth={1.7} />
                </span>
                <p className="pt-1.5 text-base leading-7 text-white/65 transition-colors duration-300 group-hover:text-white sm:pt-0 sm:text-lg">
                  {note}
                </p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}