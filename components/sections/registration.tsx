import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { eventData } from "@/lib/event-data";

export function Registration() {
  return (
    <section id="registration" className="py-24 sm:py-32">
      <div className="container">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--surface)] p-8 sm:p-12 lg:p-16">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--primary)]/20 blur-3xl" />
          <div className="relative grid gap-12 lg:grid-cols-[1fr_.8fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--primary-light)]">05 / Registration</p>
              <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">Reserve your place in the conversation.</h2>
              <p className="mt-5 max-w-xl leading-7 text-white/50">Limited seats are available. Accommodation and meals will be provided for all participants.</p>
              <a href={eventData.registration.formUrl} className="mt-9 inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold hover:bg-[var(--primary-light)]">Register Now <ArrowUpRight size={17} /></a>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="border border-white/10 p-6">
                <p className="text-xs uppercase tracking-widest text-white/35">Students</p>
                <p className="mt-2 text-4xl font-semibold">{eventData.registration.student}</p>
                <p className="mt-1 text-sm text-white/35">Including GST</p>
              </div>
              <div className="border border-white/10 p-6">
                <p className="text-xs uppercase tracking-widest text-white/35">Faculty / Industry</p>
                <p className="mt-2 text-4xl font-semibold">{eventData.registration.professional}</p>
                <p className="mt-1 text-sm text-white/35">Including GST</p>
              </div>
              <p className="font-mono text-xs text-[var(--primary-light)]">{eventData.registration.seats} LIMITED SEATS AVAILABLE</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
