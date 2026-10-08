"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function MagneticButton({ children }: { children: ReactNode }) {
  return <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold">{children}</motion.button>;
}
