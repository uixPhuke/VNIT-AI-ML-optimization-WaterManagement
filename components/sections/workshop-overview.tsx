import { Reveal } from "@/components/ui/reveal";
import { eventData } from "@/lib/event-data";

export function WorkshopOverview() {
  return (
    <section id="overview" className="py-24 sm:py-32">
      <div className="container grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--primary-light)]">01 / Overview</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Where intelligent systems meet water management.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg leading-8 text-white/55">{eventData.description}</p>
          <p className="mt-5 text-lg leading-8 text-white/55">The workshop brings together academia, research and industry to explore practical challenges, emerging technologies and policy needs around intelligent water management.</p>
        </Reveal>
      </div>
    </section>
  );
}
