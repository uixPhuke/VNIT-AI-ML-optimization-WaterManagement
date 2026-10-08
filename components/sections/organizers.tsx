import { Reveal } from "@/components/ui/reveal";
import { eventData } from "@/lib/event-data";

export function Organizers() {
  return (
    <section id="organizers" className="border-y border-white/10 bg-[var(--surface)] py-24 sm:py-32">
      <div className="container">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--primary-light)]">08 / Organizers & Partners</p>
          <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">A collaborative platform for intelligent water management.</h2>
        </Reveal>
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {eventData.organizers.map((item, index) => (
            <Reveal key={item} delay={index * 0.05} className="flex min-h-32 items-end border border-white/10 p-6 text-lg font-medium text-white/65">
              {item}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
