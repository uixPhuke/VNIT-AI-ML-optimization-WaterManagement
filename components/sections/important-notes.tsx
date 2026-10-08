import { Reveal } from "@/components/ui/reveal";
import { eventData } from "@/lib/event-data";

export function ImportantNotes() {
  return (
    <section id="notes" className="py-24 sm:py-32">
      <div className="container">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--primary-light)]">07 / Important Notes</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">Everything you need to know.</h2>
        </Reveal>
        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {eventData.notes.map((note, index) => (
            <Reveal key={note} delay={index * 0.06} className="border border-white/10 bg-[var(--surface)] p-7">
              <span className="font-mono text-xs text-[var(--primary-light)]">0{index + 1}</span>
              <p className="mt-10 text-lg leading-7 text-white/65">{note}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
