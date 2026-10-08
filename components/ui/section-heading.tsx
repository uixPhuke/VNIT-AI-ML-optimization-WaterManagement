export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-[var(--primary-light)]">{eyebrow}</p>
      <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">{title}</h2>
      {description && <p className="mt-5 max-w-2xl text-lg leading-8 text-white/50">{description}</p>}
    </div>
  );
}
