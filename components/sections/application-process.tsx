import { Reveal } from "@/components/ui/reveal";
import { eventData } from "@/lib/event-data";

export function ApplicationProcess() {
  return (
    <section id="application" className="border-y border-white/10 bg-[var(--surface)] py-24 sm:py-32">
      <div className="container grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--primary-light)]">06 / How to Apply</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Registration in a few simple steps.</h2>
        </Reveal>
        <div>
          {eventData.applicationSteps.map((step, index) => (
            <Reveal key={step} delay={index * 0.06} className="flex gap-6 border-b border-white/10 py-6">
              <span className="font-mono text-sm text-[var(--primary-light)]">0{index + 1}</span>
              <p className="text-lg text-white/70">{step}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
