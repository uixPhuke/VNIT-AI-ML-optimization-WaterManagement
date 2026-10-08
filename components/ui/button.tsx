import type { ButtonHTMLAttributes } from "react";

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold transition hover:bg-[var(--primary-light)] ${className}`} {...props} />;
}
