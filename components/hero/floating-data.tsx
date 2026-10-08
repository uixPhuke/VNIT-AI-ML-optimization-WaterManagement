"use client";

import { motion } from "framer-motion";

export function FloatingData() {
  return (
    <>
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-2 top-12 rounded-xl border border-white/10 bg-black/70 px-4 py-3 text-xs backdrop-blur-xl sm:-right-8">
        <span className="text-white/40">SYSTEM</span>
        <div className="mt-1 font-mono text-[var(--primary-light)]">AI / ML / OPT</div>
      </motion.div>
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-2 bottom-16 rounded-xl border border-white/10 bg-black/70 px-4 py-3 text-xs backdrop-blur-xl sm:-left-8">
        <span className="text-white/40">VENUE</span>
        <div className="mt-1 font-medium">VNIT · NAGPUR</div>
      </motion.div>
    </>
  );
}
