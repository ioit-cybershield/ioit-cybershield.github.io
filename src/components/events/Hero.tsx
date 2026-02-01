// src/components/events/Hero.tsx
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Split text animation
      const words = gsap.utils.toArray(".hero-word");

      gsap.fromTo(
        words,
        { y: 100, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.5,
        },
      );

      // Image parallax
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text fade out on scroll
      gsap.to(textRef.current, {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "30% top",
          scrub: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={container}
      className="relative h-[70vh] min-h-[600px] w-full overflow-hidden bg-zinc-900"
    >
      {/* Background Image with Overlay */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <img
          src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=2400"
          alt="Events background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-zinc-900/20 to-[#F1EFE5]" />
      </div>

      {/* Content */}
      <div
        ref={textRef}
        className="relative h-full flex flex-col items-center justify-center px-6 text-center"
      >
        <div className="overflow-hidden mb-4">
          <span className="hero-word inline-block text-lime-300 text-sm font-bold uppercase tracking-[0.4em]">
            CyberShield Presents
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white font-['Syne'] leading-[0.9] tracking-tight max-w-6xl">
          <div className="overflow-hidden">
            <span className="hero-word inline-block">Calendar</span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-word inline-block text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-white">
              2026
            </span>
          </div>
        </h1>

        <div className="overflow-hidden mt-8">
          <div className="hero-word flex flex-col items-center gap-2 text-white/60 animate-bounce">
            <span className="text-xs uppercase tracking-widest">
              Scroll to explore
            </span>
            <ArrowDown size={20} />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F1EFE5] to-transparent" />
    </div>
  );
};

export default Hero;
