"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Handshake } from "lucide-react";

type Org = {
  name: string;
  /**
   * Optional logo in /public, for example "/logos/vnit.png".
   * Without one, the name shows on its own.
   */
  logo?: string;
};

type Group = {
  label: string;
  featured?: boolean;
  orgs: Org[];
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Every organizer, funder and partner named or shown on the workshop poster.
 */
const groups: Group[] = [
  {
    label: "Organized by",
    featured: true,
    orgs: [
      {
        name: "Department of Civil Engineering, VNIT Nagpur",
      },
    ],
  },
  {
    label: "In association with",
    orgs: [
      {
        name: "Victoria University, Melbourne, Australia",
      },
      {
        name: "IIT Roorkee",
      },
      {
        name: "RV College of Engineering, Bengaluru",
      },
    ],
  },
  {
    label: "Funded by",
    orgs: [
      {
        name: "Centre for Australia-India Relations, Maitri Grant Program",
      },
      {
        name: "Australian Department of Foreign Affairs and Trade",
      },
      {
        name: "Australian Government",
      },
    ],
  },
  {
    label: "Partners",
    orgs: [
      {
        name: "Federation University Australia",
      },
      {
        name: "Australian Water School",
      },
      {
        name: "eWater Group",
      },
      {
        name: "Water Research Australia",
      },
      {
        name: "Intelligent Water Networks",
      },
      {
        name: "Wave Consulting",
      },
      {
        name: "Australian Water Association",
      },
    ],
  },
];

export function Organizers() {
  const reduce = !!useReducedMotion();

  /**
   * One simple motion for everything:
   * a short fade with a small upward drift.
   */
  const fade: Variants = {
    hidden: reduce
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: 14,
        },

    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: EASE,
      },
    },
  };

  return (
    <section
      id="organizers"
      className="border-y border-white/10 bg-[var(--surface)] py-20 sm:py-28 lg:py-32"
    >
      <div className="container">
        {/* Header */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-3xl"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2.5 pr-4 text-xs font-medium !text-white/70 backdrop-blur">
            <Handshake
              size={14}
              className="text-[var(--primary-light)]"
            />

            Organizers and partners
          </p>

          <h2 className="mt-6 text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.035em] !text-white">
            A collaborative platform for intelligent water management.
          </h2>
        </motion.div>

        {/* Groups */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.08 }}
          className="mt-12 border-t border-white/10 sm:mt-14"
        >
          {groups.map((group) => (
            <motion.section
              key={group.label}
              variants={fade}
              aria-label={group.label}
              className="grid gap-4 border-b border-white/10 py-7 sm:py-8 lg:grid-cols-[200px_1fr] lg:gap-10"
            >
              {/* Group label */}
              <h3 className="pt-1 text-sm font-medium !text-white/50">
                {group.label}
              </h3>

              {/* Organizations */}
              <ul className="flex flex-wrap gap-3">
                {group.orgs.map((org) => (
                  <li
                    key={org.name}
                    className={`group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-[var(--primary-light)]/40 hover:bg-white/[0.06] ${
                      group.featured
                        ? "px-5 py-4 sm:px-6 sm:py-5"
                        : "px-4 py-3"
                    }`}
                  >
                    {/* Optional logo */}
                    {org.logo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={org.logo}
                        alt=""
                        loading="lazy"
                        className="h-9 w-9 shrink-0 rounded-lg bg-white object-contain p-1"
                      />
                    )}

                    {/* Organization name */}
                    <span
                      className={`leading-snug !text-white ${
                        group.featured
                          ? "text-lg font-medium sm:text-2xl"
                          : "text-sm sm:text-base"
                      }`}
                    >
                      {org.name}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}
        </motion.div>
      </div>
    </section>
  );
}