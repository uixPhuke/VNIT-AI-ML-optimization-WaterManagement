import { Mail, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { eventData } from "@/lib/event-data";

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="container">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--primary-light)]">09 / Contact</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">Questions? Talk to the workshop team.</h2>
        </Reveal>
        <div className="mt-14 grid gap-3 md:grid-cols-2">
          {eventData.contacts.map((person, index) => (
            <Reveal key={person.name} delay={index * 0.05} className="border border-white/10 bg-[var(--surface)] p-7">
              <h3 className="text-xl font-medium">{person.name}</h3>
              <p className="mt-2 text-sm text-white/45">{person.role}</p>
              <div className="mt-8 space-y-3 text-sm text-white/60">
                {person.phone && <a href={`tel:${person.phone}`} className="flex items-center gap-3 hover:text-white"><Phone size={16} />{person.phone}</a>}
                <a href={`mailto:${person.email}`} className="flex items-center gap-3 hover:text-white"><Mail size={16} />{person.email}</a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
