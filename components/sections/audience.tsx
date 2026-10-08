import { Reveal } from "@/components/ui/reveal";
import { eventData } from "@/lib/event-data";

export function Audience() {
  return (
    <section id="audience" className="bg-[var(--surface)] py-24 sm:py-32">
      <div className="container grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--primary-light)]">03 / Who Can Attend?</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Built for people working on the future of water.</h2>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2">
          {eventData.audience.map((item, index) => (
            <Reveal key={item} delay={index * 0.04} className="border border-white/10 bg-black/10 p-5 text-white/65 transition hover:border-[var(--primary)]/50 hover:text-white">
              <span className="mr-3 font-mono text-xs text-[var(--primary-light)]">{String(index + 1).padStart(2, "0")}</span>
              {item}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
