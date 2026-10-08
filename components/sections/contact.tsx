"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, Check, Copy, Mail, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { eventData } from "@/lib/event-data";

type Person = { name: string; role: string; phone?: string; email: string };

const EASE = [0.22, 1, 0.36, 1] as const;
const TITLES = /^(dr|prof|professor|er|mr|mrs|ms|shri|smt)\.?$/i;

/* "Dr. Rajesh Gupta" -> "RG" (skips titles, uses first and last name). */
function initials(name: string) {
  const parts = name.split(/\s+/).filter((p) => p && !TITLES.test(p));
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function CopyButton({ value, label, reduce }: { value: string; label: string; reduce: boolean }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      /* Clipboard blocked: the link beside the button still works. */
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className="relative mr-1.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg text-white/40 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-light)]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "done" : "copy"}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.5, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.5, rotate: 30 }}
          transition={{ duration: 0.18 }}
          className={copied ? "text-emerald-400" : undefined}
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
        </motion.span>
      </AnimatePresence>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? `${label} copied to clipboard` : ""}
      </span>
    </button>
  );
}

function ContactRow({
  icon: Icon,
  href,
  value,
  label,
  reduce,
}: {
  icon: LucideIcon;
  href: string;
  value: string;
  label: string;
  reduce: boolean;
}) {
  return (
    <div className="group/row flex items-center rounded-xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-[var(--primary-light)]/40 hover:bg-white/[0.06]">
      <a
        href={href}
        className="flex min-w-0 flex-1 items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-light)]"
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[var(--primary)]/15 text-[var(--primary-light)] transition-transform duration-300 group-hover/row:scale-105">
          <Icon size={15} />
        </span>
        <span className="min-w-0 truncate" title={value}>
          {value}
        </span>
      </a>
      <CopyButton value={value} label={label} reduce={reduce} />
    </div>
  );
}

function ContactCard({ person, index, reduce }: { person: Person; index: number; reduce: boolean }) {
  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 26, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.75, ease: EASE, delay: (index % 3) * 0.09 },
    },
  };

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <motion.article
      variants={variants}
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      onPointerMove={onMove}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-[var(--primary-light)]/30 sm:p-7"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(280px_circle_at_var(--x,50%)_var(--y,0%),rgba(22,119,210,.18),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative flex items-center gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[var(--primary)]/40 bg-[var(--primary)]/10 text-sm font-semibold tracking-wide text-[var(--primary-light)]">
          {initials(person.name)}
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-medium leading-snug text-white">{person.name}</h3>
          <p className="mt-0.5 text-sm leading-5 text-white/50">{person.role}</p>
        </div>
      </div>

      <div className="relative mt-7 space-y-2.5">
        {person.phone && (
          <ContactRow
            icon={Phone}
            href={`tel:${person.phone.replace(/[^\d+]/g, "")}`}
            value={person.phone}
            label="phone number"
            reduce={reduce}
          />
        )}
        <ContactRow icon={Mail} href={`mailto:${person.email}`} value={person.email} label="email address" reduce={reduce} />
      </div>
    </motion.article>
  );
}

export function Contact() {
  const reduce = !!useReducedMotion();
  const people = eventData.contacts as Person[];

  const rise: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  const words = "Questions? Talk to the workshop team.".split(" ");

  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-[min(900px,90vw)] -translate-x-1/2 rounded-full bg-[var(--primary)]/10 blur-3xl"
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
            <MessageCircle size={14} className="text-[var(--primary-light)]" />
            Contact
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

          <motion.p variants={rise} className="mt-5 max-w-xl text-base leading-7 text-white/55 sm:text-lg">
            Ask about registration, the venue or the programme. Tap a number or email to reach out, or copy it to use
            elsewhere.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-4 sm:mt-14 md:grid-cols-2 lg:grid-cols-3"
        >
          {people.map((person, index) => (
            <ContactCard key={person.email} person={person} index={index} reduce={reduce} />
          ))}
        </motion.div>

        {/* Closing call to action */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl border border-[var(--primary-light)]/20 bg-[linear-gradient(120deg,rgba(22,119,210,.18),rgba(22,119,210,.04))] p-6 sm:flex-row sm:items-center sm:p-8"
        >
          <div>
            <p className="text-lg font-medium text-white sm:text-xl">Ready to join the workshop?</p>
            <p className="mt-1 text-sm text-white/55">Only 80 seats are available, so register early.</p>
          </div>
          <motion.a
            href={eventData.registration.formUrl}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_32px_-12px_var(--primary)] transition-colors hover:bg-[var(--primary-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]"
          >
            Register now
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}