"use client";

import { motion } from "framer-motion";

export function AnimatedLine() {
  return <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="h-px origin-left bg-[var(--primary)]" />;
}
