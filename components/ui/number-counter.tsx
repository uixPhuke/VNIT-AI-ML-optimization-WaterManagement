"use client";

import { motion } from "framer-motion";

export function NumberCounter({ value }: { value: string }) {
  return <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>{value}</motion.span>;
}
