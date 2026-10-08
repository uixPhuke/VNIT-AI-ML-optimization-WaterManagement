"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { navigation } from "@/lib/navigation";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/95 p-6">
          <div className="flex justify-end">
            <button onClick={onClose} aria-label="Close menu"><X size={26} /></button>
          </div>
          <nav className="mt-16 flex flex-col gap-7">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={onClose} className="text-3xl font-semibold">
                {item.label}
              </a>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
