"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { MobileMenu } from "./mobile-menu";
import { navigation } from "@/lib/navigation";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // Only handle internal section links
    if (!href.startsWith("#")) return;

    e.preventDefault();

    const id = href.substring(1);
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    // Remove the hash from the URL
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );

    // Close mobile menu if open
    setOpen(false);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="relative flex items-center"
            aria-label="VNIT AI Workshop Home"
          >
            <Image
              src="/logo.png"
              alt="VNIT AI Workshop"
              width={120}
              height={40}
              priority
              className="h-9 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(true)}
            className="rounded-lg border border-white/10 p-2 transition-colors hover:bg-white/5 md:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}