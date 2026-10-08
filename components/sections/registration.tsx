"use client";

import type { PointerEvent } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, Briefcase, Check, GraduationCap, Ticket, type LucideIcon } from "lucide-react";
import { eventData } from "@/lib/event-data";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Payment portal from the workshop poster. Move into eventData.registration if you prefer. */
const PAYMENT_URL = "https://pay.vnit.ac.in/home";

const includes = ["Free accommodation", "Meals for all participants", "Certificates provided"];

const steps = [
  { title: "Submit the form", text: "Fill in the online registration form with your details." },
  { title: "Open the payment portal", text: "Pay the fee for your category on the VNIT payment portal." },
  {
    title: "Choose the right category",
    text: "Select the payment category “Conf./Int. sympos./seminar/workshop” and enter the name of the event.",
  },
];

function FeeCard({
  icon: Icon,
  label,
  note,
  price,
  index,
  reduce,
}: {
  icon: LucideIcon;
  label: string;
  note: string;
  price: string | number;
  index: number;
  reduce: boolean;
}) {
  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, x: 28, filter: "blur(6px)" },
    show: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: EASE, delay: 0.15 + index * 0.12 },
    },
  };

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      variants={variants}
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      onPointerMove={onMove}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-[var(--primary-light)]/40 sm:p-7"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(260px_circle_at_var(--x,50%)_var(--y,0%),rgba(22,119,210,.22),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--primary)]/15 text-[var(--primary-light)] transition-transform duration-300 group-hover:scale-105">
          <Icon size={19} />
        </span>
        <div>
          <p className="text-sm font-medium text-white">{label}</p>
          <p className="text-xs text-white/45">{note}</p>
        </div>
      </div>
      <p className="relative mt-6 text-[clamp(2.25rem,5vw,3.25rem)] font-semibold leading-none tracking-tight tabular-nums text-white">
        {price}
      </p>
      <p className="relative mt-2 text-sm text-white/45">Including GST</p>
    </motion.div>
  );
}

export function Registration() {
  const reduce = !!useReducedMotion();
  const reg = eventData.registration;

  const rise: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  const words = "Reserve your place in the conversation.".split(" ");

  return (
    <section id="registration" className="py-20 sm:py-28 lg:py-32">
      <div className="container">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 36, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--surface)] p-6 shadow-[0_30px_80px_-40px_rgba(22,119,210,.45)] sm:p-10 lg:p-14"
        >
          {/* Ambient light */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <motion.div
              animate={reduce ? undefined : { x: [0, -30, 0], y: [0, 20, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[var(--primary)]/25 blur-3xl"
            />
            <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[var(--primary)]/10 blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_85%_10%,black,transparent_60%)]" />
          </div>

          <div className="relative grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
            {/* Left: pitch and calls to action */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.15 }}
            >
              <motion.p
                variants={rise}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2.5 pr-4 text-xs font-medium text-white/70 backdrop-blur"
              >
                <Ticket size={14} className="text-[var(--primary-light)]" />
                Registration
              </motion.p>

              <motion.h2
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
                className="mt-6 max-w-2xl text-[clamp(2.25rem,5.4vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-white"
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
                Seats are limited, and every participant gets accommodation and meals at no extra cost.
              </motion.p>

              <motion.ul variants={rise} className="mt-6 flex flex-wrap gap-2">
                {includes.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-2 pr-3.5 text-xs text-white/70"
                  >
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-[var(--primary)]/25 text-[var(--primary-light)]">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </motion.ul>

              <motion.div variants={rise} className="mt-9 flex flex-col gap-3 sm:flex-row">
                <motion.a
                  href={reg.formUrl}
                  whileTap={{ scale: 0.97 }}
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--primary)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_32px_-12px_var(--primary)] transition-colors hover:bg-[var(--primary-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/25 opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100 motion-reduce:hidden"
                  />
                  <span className="relative">Register now</span>
                  <ArrowUpRight
                    size={17}
                    className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </motion.a>

                <motion.a
                  href={PAYMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.97 }}
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white/80 backdrop-blur transition hover:border-white/30 hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  Open payment portal
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </motion.a>
              </motion.div>

              <motion.p variants={rise} className="mt-5 flex items-center gap-2.5 text-sm text-white/55">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--primary-light)] opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--primary-light)]" />
                </span>
                Only {reg.seats} seats. Register early to secure yours.
              </motion.p>
            </motion.div>

            {/* Right: fees */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1"
            >
              <FeeCard
                icon={GraduationCap}
                label="Students"
                note="UG, PG and PhD"
                price={reg.student}
                index={0}
                reduce={reduce}
              />
              <FeeCard
                icon={Briefcase}
                label="Faculty and industry"
                note="Faculty members and industry professionals"
                price={reg.professional}
                index={1}
                reduce={reduce}
              />
            </motion.div>
          </div>

          {/* How to apply: a real sequence, so numbering is meaningful here */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ staggerChildren: 0.12 }}
            className="relative mt-12 border-t border-white/10 pt-10 sm:mt-14"
          >
            <motion.h3 variants={rise} className="text-lg font-medium text-white">
              How to apply
            </motion.h3>

            <ol className="relative mt-7 grid gap-8 md:grid-cols-3 md:gap-6">
              {/* Connecting line draws itself on desktop */}
              <motion.span
                aria-hidden
                variants={{
                  hidden: { scaleX: 0 },
                  show: { scaleX: 1, transition: { duration: 1.2, ease: EASE, delay: 0.2 } },
                }}
                className="absolute left-4 right-4 top-4 hidden h-px origin-left bg-gradient-to-r from-[var(--primary-light)]/60 via-white/15 to-white/5 md:block"
              />
              {steps.map((step, i) => (
                <motion.li key={step.title} variants={rise} className="relative flex gap-4 md:block">
                  <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--primary-light)]/50 bg-[var(--surface)] text-sm font-semibold tabular-nums text-[var(--primary-light)]">
                    {i + 1}
                  </span>
                  <div className="md:mt-5">
                    <p className="text-base font-medium text-white">{step.title}</p>
                    <p className="mt-1.5 max-w-sm text-sm leading-6 text-white/50">{step.text}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}