"use client";

import { useEffect, useId, type PointerEvent, type ReactNode } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { Activity, BrainCircuit, CalendarDays, MapPin } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* One orchestrated entrance: shell first, then each element rises in sequence. */
const stage: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: EASE, staggerChildren: 0.14, delayChildren: 0.25 },
  },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } },
};

/* Seamless wave: two full periods in the viewBox, shifted by exactly one period (-50%). */
const WAVE = "M0 40 Q150 0 300 40 T600 40 T900 40 T1200 40 V400 H0 Z";

const LINE =
  "M0 22 C8 22 8 18 14 18 S22 24 28 24 S36 12 42 12 S50 17 56 17 S64 8 70 8 S78 13 84 13 S94 5 100 5";

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function GlassCard({
  children,
  duration,
  delay = 0,
  reduce,
}: {
  children: ReactNode;
  duration: number;
  delay?: number;
  reduce: boolean;
}) {
  return (
    <motion.div variants={rise}>
      <motion.div
        animate={reduce ? undefined : { y: [0, -7, 0] }}
        transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-2xl border border-white/10 bg-white/[0.04] p-2.5 shadow-[0_12px_32px_-12px_rgba(0,0,0,.6),inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-xl sm:p-4"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function Sparkline({ reduce }: { reduce: boolean }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 100 32" fill="none" aria-hidden className="h-6 w-full overflow-visible sm:h-8">
      <defs>
        <linearGradient id={`area-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--primary-light)" stopOpacity=".35" />
          <stop offset="1" stopColor="var(--primary-light)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`${LINE} L100 32 L0 32 Z`}
        fill={`url(#area-${id})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.9 }}
      />
      <motion.path
        d={LINE}
        stroke="var(--primary-light)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 1, ease: EASE }}
      />
      <motion.circle
        cx="100"
        cy="5"
        r="2.5"
        fill="var(--primary-light)"
        initial={{ opacity: 0 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, r: [2.5, 4, 2.5] }}
        transition={{ opacity: { delay: 2.4 }, r: { delay: 2.4, duration: 2, repeat: Infinity } }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export function HeroVisual() {
  const reduce = !!useReducedMotion();

  /* Pointer position, normalised to -0.5 … 0.5, smoothed with a spring. */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 110, damping: 18, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 110, damping: 18, mass: 0.4 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);

  /* Depth: near layers move with the pointer, far layers against it. */
  const nearX = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const nearY = useTransform(sy, [-0.5, 0.5], [-12, 12]);
  const farX = useTransform(sx, [-0.5, 0.5], [7, -7]);
  const farY = useTransform(sy, [-0.5, 0.5], [7, -7]);

  /* Soft light that follows the cursor. */
  const lightX = useTransform(sx, [-0.5, 0.5], [15, 85]);
  const lightY = useTransform(sy, [-0.5, 0.5], [15, 85]);
  const light = useMotionTemplate`radial-gradient(420px circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.08), transparent 60%)`;

  /* One value drives both the number and the water level, so they stay in sync. */
  const score = useMotionValue(0);
  const scoreText = useTransform(score, (v) => Math.round(v));
  const waterY = useTransform(score, [0, 80], ["108%", "20%"]);

  useEffect(() => {
    const controls = animate(score, 80, {
      duration: reduce ? 0 : 2.6,
      delay: reduce ? 0 : 0.7,
      ease: EASE,
    });
    return () => controls.stop();
  }, [score, reduce]);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      role="img"
      aria-label="Two-day workshop on AI, ML and optimization in water management, December 15 to 16, 2026, at VNIT Nagpur. 80 seats available."
      className="relative mx-auto w-full max-w-[560px]"
    >
      <motion.div style={{ rotateX, rotateY, transformPerspective: 1000 }} className="will-change-transform">
        <motion.div
          variants={stage}
          initial="hidden"
          animate="show"
          className="relative aspect-square w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--surface)] shadow-[0_30px_80px_-30px_rgba(22,119,210,.5),inset_0_1px_0_rgba(255,255,255,.06)]"
        >
          {/* Backdrop ------------------------------------------------ */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(22,119,210,.34),transparent_52%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(circle_at_50%_50%,black,transparent_68%)]" />
          <motion.div aria-hidden style={{ background: light }} className="absolute inset-0" />

          {/* Far layer: rings -------------------------------------- */}
          <motion.div aria-hidden style={{ x: farX, y: farY }} className="pointer-events-none absolute inset-0">
            <motion.div
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 m-auto h-[66%] w-[66%] rounded-full border border-dashed border-[var(--primary-light)]/25"
            >
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[var(--primary-light)] shadow-[0_0_14px_3px_var(--primary-light)]" />
            </motion.div>
            <motion.div
              animate={reduce ? undefined : { rotate: -360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 m-auto h-[86%] w-[86%] rounded-full border border-white/[0.06]"
            >
              <span className="absolute -bottom-0.5 left-[30%] h-1.5 w-1.5 rounded-full bg-white/40" />
            </motion.div>
          </motion.div>

          {/* Centre: the water orb --------------------------------- */}
          <motion.div style={{ x: nearX, y: nearY }} className="pointer-events-none absolute inset-0">
            <motion.div variants={rise} className="absolute inset-0">
              <motion.div
                aria-hidden
                animate={reduce ? undefined : { scale: [1, 1.12, 1], opacity: [0.55, 0.9, 0.55] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 m-auto h-[46%] w-[46%] rounded-full bg-[var(--primary)]/40 blur-3xl"
              />

              <div className="absolute inset-0 m-auto h-[42%] w-[42%] overflow-hidden rounded-full border border-[var(--primary-light)]/30 bg-[var(--primary)]/10 shadow-[inset_0_0_40px_rgba(22,119,210,.35),0_0_60px_-10px_rgba(22,119,210,.6)]">
                {/* Water body (rises with the score) */}
                <motion.div style={{ y: waterY }} className="absolute inset-0">
                  <motion.svg
                    viewBox="0 0 1200 400"
                    preserveAspectRatio="none"
                    aria-hidden
                    animate={reduce ? undefined : { x: ["0%", "-50%"] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 top-0 h-full w-[200%] fill-[var(--primary)]/45"
                  >
                    <path d={WAVE} />
                  </motion.svg>
                  <motion.svg
                    viewBox="0 0 1200 400"
                    preserveAspectRatio="none"
                    aria-hidden
                    animate={reduce ? undefined : { x: ["-50%", "0%"] }}
                    transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 top-[6%] h-full w-[200%] fill-[var(--primary-light)]/35"
                  >
                    <path d={WAVE} />
                  </motion.svg>
                </motion.div>

                {/* Glass highlight */}
                <div className="absolute inset-0 rounded-full bg-[linear-gradient(145deg,rgba(255,255,255,.18),transparent_38%)]" />

                {/* Readout */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 text-white">
                  <BrainCircuit strokeWidth={1.3} className="h-7 w-7 text-white/90 sm:h-10 sm:w-10" />
                  <p className="text-xl font-semibold tabular-nums leading-none drop-shadow sm:text-4xl">
                    <motion.span>{scoreText}</motion.span>
                  </p>
                  <p className="text-[10px] text-white/70 sm:text-xs">seats only</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Near layer: floating cards ------------------------------ */}
          <motion.div style={{ x: nearX, y: nearY }} className="pointer-events-none absolute inset-0">
            <div className="absolute left-[6%] top-[9%]">
              <GlassCard duration={7} reduce={reduce}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="grid h-7 w-7 place-items-center rounded-xl bg-[var(--primary)]/20 text-[var(--primary-light)] sm:h-10 sm:w-10">
                    <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold leading-tight text-white sm:text-lg">Dec 15–16, 2026</p>
                    <p className="text-[10px] text-white/60 sm:text-xs">9:00 AM – 5:00 PM</p>
                  </div>
                </div>
              </GlassCard>
            </div>

            <div className="absolute bottom-[21%] right-[6%] w-[42%] min-w-[128px] max-w-[220px]">
              <GlassCard duration={8} delay={0.6} reduce={reduce}>
                <div className="mb-1 flex items-center justify-between sm:mb-2">
                  <span className="flex items-center gap-1.5 text-[10px] text-white/60 sm:text-xs">
                    <Activity className="h-3.5 w-3.5 text-[var(--primary-light)] sm:h-4 sm:w-4" />
                    Real-time sensing
                  </span>
                </div>
                <Sparkline reduce={reduce} />
                <p className="mt-1 text-[10px] text-white/50 sm:text-xs">Predictive modelling for water</p>
              </GlassCard>
            </div>

            <div className="absolute bottom-[8%] left-[6%]">
              <motion.div variants={rise}>
                <div className="flex items-center gap-2 rounded-full border border-[var(--primary-light)]/25 bg-[var(--primary)]/15 py-1.5 pl-2 pr-3 text-[10px] text-white/90 backdrop-blur-xl sm:text-xs">
                  <MapPin className="h-3.5 w-3.5 text-[var(--primary-light)]" />
                  VNIT Nagpur · In person
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Baseline ------------------------------------------------ */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.4, ease: EASE }}
            className="absolute inset-x-12 bottom-4 h-px overflow-hidden bg-gradient-to-r from-transparent via-[var(--primary-light)]/60 to-transparent sm:bottom-5"
          >
            {!reduce && (
              <motion.span
                animate={{ x: ["-100%", "400%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
                className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white to-transparent"
              />
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}