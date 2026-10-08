"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { eventData } from "@/lib/event-data";
import { Reveal } from "@/components/ui/reveal";

export function KeyTopics() {
  return (
    <section id="topics" className="py-24 sm:py-32">
      <div className="container">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--primary-light)]">02 / Key Topics</p>
          <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">Seven areas shaping the conversation.</h2>
        </Reveal>
        <div className="mt-14 border-t border-white/10">
          {eventData.topics.map((topic, index) => (
            <motion.div key={topic.title} whileHover={{ x: 8 }} className="group grid gap-5 border-b border-white/10 py-7 md:grid-cols-[80px_1fr_40px]">
              <span className="font-mono text-sm text-white/30">0{index + 1}</span>
              <div>
                <h3 className="text-2xl font-medium">{topic.title}</h3>
                <p className="mt-2 max-w-3xl text-white/45">{topic.description}</p>
              </div>
              <ArrowUpRight className="text-white/20 transition group-hover:text-[var(--primary-light)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
