import React, { useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// --- UTILS & CONFIG ---
const CUSTOM_EASE = "cubic-bezier(0.43, 0.195, 0.02, 1)";

// --- COMPONENTS ---

/**
 * SmoothScroll Wrapper
 * Initializes Lenis and syncs GSAP ScrollTrigger updates
 */
const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <div className="w-full min-h-screen">{children}</div>;
};

/**
 * Main Hero Component
 */
const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const bgMediaRef = useRef<HTMLDivElement>(null);
  const ctaButtonsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: CUSTOM_EASE } });

      // Title Lines Reveal
      tl.to(".title-mask-inner", {
        y: "0%",
        duration: 1.5,
        stagger: 0.15,
        delay: 0.2,
      });

      // Bottom Text Reveal
      tl.to(
        ".bottom-text-line",
        {
          y: "0%",
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
        },
        "-=1.0"
      );

      // CTA Fade In
      tl.fromTo(
        ctaButtonsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.8"
      );

      // Parallax Effect on Scroll
      gsap.to(bgMediaRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: "20%",
        scale: 1.1,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[800px] overflow-hidden bg-[#1B1B1C] text-white flex flex-col justify-between"
    >
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          ref={bgMediaRef}
          className="relative w-full h-full scale-110 origin-center"
        >
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="https://www.gencellenergy.com/wp-content/uploads/2023/08/GENCELL-VIDEO-HEADER-4-HOME.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent h-[40%]" />
        </div>
      </div>

      {/* --- MAIN TITLE AREA --- */}
      <div className="relative z-10 w-full px-6 md:px-12 pt-32 md:pt-48 flex-grow flex flex-col justify-center items-start font-hero">
        <h1 className="font-bold leading-[0.8] uppercase tracking-[-0.04em] text-[clamp(4rem,11vw,12rem)] flex flex-col items-start select-none">
          {/* LINE 1: POWER */}
          <div className="overflow-hidden relative block">
            <span className="title-mask-inner block translate-y-full">
              Cyber-Security
            </span>
          </div>

          {/* LINE 2: FOR (Indented) */}
          <div className="overflow-hidden relative block ml-[12vw] md:ml-[8vw]">
            <span className="title-mask-inner block translate-y-full">FOR</span>
          </div>

          {/* LINE 3: HUMANITY */}
          <div className="overflow-hidden relative block -ml-[2vw]">
            <span className="title-mask-inner block translate-y-full">
              Everyone
            </span>
          </div>
        </h1>
      </div>

      {/* --- BOTTOM AREA --- */}
      <div className="relative z-10 w-full px-6 md:px-12 pb-12 flex flex-col md:flex-row justify-between items-end gap-10">
        {/* Split Text Description */}
        <div className="font-bold text-lg md:text-xl lg:text-2xl leading-[0.9] uppercase tracking-tighter max-w-sm">
          <div className="overflow-hidden">
            <div className="bottom-text-line translate-y-full opacity-0">
              FEARLESSLY FUELING
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="bottom-text-line translate-y-full opacity-0">
              THE FUTURE
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaButtonsRef} className="flex flex-col md:flex-row gap-4">
          <CTAButton text="U.S. Power Gap" href="#gap" />
          <CTAButton text="Power your project now" href="#contact" />
        </div>
      </div>
    </section>
  );
};

/**
 * CTA Button Component
 */
const CTAButton = ({ text, href }: { text: string; href: string }) => {
  return (
    <a
      href={href}
      className="group relative overflow-hidden inline-flex items-center justify-between px-6 py-4 md:px-8 md:py-3 border border-[#F1EFE5] rounded text-sm md:text-base uppercase tracking-tight transition-colors duration-300 hover:text-black hover:border-transparent min-w-[220px]"
    >
      {/* Hover Fill Layer */}
      <span className="absolute inset-0 bg-[#F1EFE5] transform origin-top-left scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />

      {/* Text Content */}
      <span className="relative z-10 font-medium">{text}</span>

      {/* Arrow Icon */}
      <span className="relative z-10 transform rotate-180 group-hover:-translate-x-1 transition-transform duration-300 text-lg">
        ↳
      </span>
    </a>
  );
};

// --- APP ROOT ---

export default function App() {
  return (
    <SmoothScroll>
      <main className="font-sans text-[#F1EFE5]">
        <Hero />

        {/* Dummy content to demonstrate scrolling */}
        <div className="h-screen bg-[#F1EFE5] text-black flex items-center justify-center">
          <h2 className="text-4xl font-bold uppercase tracking-tight">
            Scroll Content
          </h2>
        </div>
      </main>
    </SmoothScroll>
  );
}
