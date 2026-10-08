"use client";

import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { HeroVisual } from "./hero-visual";
import { eventData } from "@/lib/event-data";

export function HeroSection() {
  const handleExplore = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const section = document.getElementById("overview");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    // Keep URL clean
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  };

  return (
    <section className="relative overflow-hidden border-b border-white/10 pt-24 sm:pt-28">
      <div
        className="
          container relative grid
          min-h-[720px]
          items-center
          gap-10
          py-14
          sm:min-h-[760px]
          sm:gap-12
          sm:py-20
          lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)]
          lg:gap-16
        "
      >
        {/* =====================================================
            LEFT SIDE
        ====================================================== */}

        <div className="relative z-10 min-w-0 max-w-[760px]">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.08,
              duration: 0.8,
            }}
            className="relative"
          >
            {/* ================================================
                SUBTLE BACKGROUND TYPOGRAPHY
            ================================================= */}

            
            {/* ================================================
                LINE 1 — APPLICATION OF
            ================================================= */}

            <div
              className="
                relative
                text-[3.2rem]
                leading-[0.82]
                tracking-[-0.055em]
                text-gray-300/10
                sm:text-[4.4rem]
                lg:text-[5.5rem]
              "
              style={{
                fontFamily:
                  '"Apple Garamond", "Adobe Garamond Pro", "EB Garamond", Garamond, serif',
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              Application Of
            </div>

            {/* ================================================
                LINE 2 — AI / ML
            ================================================= */}

            <h1
              className="
                relative
                mt-2
                whitespace-nowrap
                text-[4.8rem]
                font-black
                uppercase
                leading-[0.78]
                tracking-[-0.07em]
                text-white
                sm:text-[6.2rem]
                md:text-[7rem]
                lg:text-[7.4rem]
              "
            >
              AI{" "}
              <span className="text-[var(--primary-light)]">/</span>{" "}
              ML
            </h1>

            {/* ================================================
                LINE 3 — & OPTIMISATION
            ================================================= */}

            <div
              className="
                relative
                mt-2
                ml-1
                whitespace-nowrap
                text-[3.6rem]
                leading-[0.82]
                tracking-[-0.06em]
                text-[var(--primary-light)]
                sm:text-[4.8rem]
                md:text-[5.5rem]
                lg:text-[6rem]
              "
              style={{
                fontFamily:
                  '"Apple Garamond", "Adobe Garamond Pro", "EB Garamond", Garamond, serif',
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              &amp; Optimisation
            </div>

            {/* ================================================
                LINE 4 — IN WATER MANAGEMENT
            ================================================= */}

            <div
              className="
                relative
                mt-4
                max-w-full
                text-[2rem]
                font-black
                uppercase
                leading-[0.88]
                tracking-[-0.055em]
                text-white
                sm:text-[2.8rem]
                md:text-[3.3rem]
                lg:text-[3.8rem]
              "
            >
              In Water Management
            </div>
          </motion.div>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.7,
            }}
            className="
              mt-8
              max-w-[620px]
              text-[0.95rem]
              leading-6
              text-white/50
              sm:mt-10
              sm:text-lg
              sm:leading-7
            "
          >
            {eventData.description}
          </motion.p>

          {/* =================================================
              CTA
          ================================================== */}

          <motion.a
            href="#overview"
            onClick={handleExplore}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.7,
            }}
            className="
              group
              mt-8
              inline-flex
              items-center
              gap-3
              border-b
              border-white/25
              pb-2
              text-xs
              font-medium
              uppercase
              tracking-[0.18em]
              text-white
              transition-colors
              hover:border-[var(--primary-light)]
              hover:text-[var(--primary-light)]
              sm:mt-10
              sm:text-sm
            "
          >
            Explore Workshop

            <ArrowDownRight
              size={17}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
                group-hover:translate-y-1
              "
            />
          </motion.a>
        </div>

        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}

        <div
          className="
            relative
            flex
            min-h-[380px]
            min-w-0
            items-center
            justify-center
            sm:min-h-[500px]
            lg:min-h-[620px]
            lg:justify-end
          "
        >
          <div
            className="
              relative
              w-full
              max-w-[420px]
              sm:max-w-[500px]
              lg:max-w-[600px]
            "
          >
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}