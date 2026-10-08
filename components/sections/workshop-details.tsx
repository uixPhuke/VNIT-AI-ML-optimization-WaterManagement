import { CalendarDays, Clock3, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { eventData } from "@/lib/event-data";

export function WorkshopDetails() {
  const details = [
    { icon: CalendarDays, label: "Date", value: eventData.date },
    { icon: Clock3, label: "Time", value: eventData.time },
    { icon: MapPin, label: "Venue", value: eventData.venue }
  ];
  return (
    <section id="details" className="border-y border-white/10 bg-[var(--surface)] py-20">
      <div className="container">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {details.map(({ icon: Icon, label, value }) => (
            <Reveal key={label} className="bg-[var(--surface)] p-7">
              <Icon className="mb-10 text-[var(--primary-light)]" size={23} />
              <p className="text-xs uppercase tracking-[0.2em] text-white/35">{label}</p>
              <p className="mt-3 text-lg font-medium leading-7">{value}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
