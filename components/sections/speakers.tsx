import { Reveal } from "@/components/ui/reveal";
import { eventData } from "@/lib/event-data";

export function Speakers() {
  return (
    <section id="speakers" className="py-24 sm:py-32">
      <div className="container">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--primary-light)]">04 / Speakers</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">Academia. Industry. Research.</h2>
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {eventData.speakers.map((speaker, index) => (
            <Reveal key={speaker.name} delay={index * 0.05} className="bg-[var(--surface)] p-7">
              <div className="mb-16 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--primary)]/40 text-sm font-semibold text-[var(--primary-light)]">
                {speaker.name.split(" ").slice(-2).map((word) => word[0]).join("")}
              </div>
              <h3 className="text-xl font-medium">{speaker.name}</h3>
              <p className="mt-2 text-sm leading-6 text-white/45">{speaker.role}</p>
              <p className="mt-1 text-sm text-white/30">{speaker.institution}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
