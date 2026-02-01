// components/events/EventsFeed.tsx
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EventHero from "./EventHero";
import EventCard from "./EventCard";
import EventsSkeleton from "./EventSkeleton";
import type { EventItem } from "@/types/events";

gsap.registerPlugin(ScrollTrigger);

interface EventsFeedProps {
  items: EventItem[];
  loading?: boolean;
}

// components/events/EventsFeed.tsx
export default function EventsFeed({
  items,
  loading = false,
}: EventsFeedProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (loading || !items.length) return;

      const ctx = gsap.context(() => {
        gsap.from(".event-hero", {
          scrollTrigger: {
            trigger: ".event-hero",
            start: "top 85%",
            scroller: document.documentElement,
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });

        gsap.from(".event-card-row", {
          scrollTrigger: {
            trigger: ".event-card-row",
            start: "top 90%",
            scroller: document.documentElement,
          },
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
        });
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef, dependencies: [items, loading] },
  );

  if (loading) {
    return <EventsSkeleton />;
  }

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#f5f5f3] antialiased"
      style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
    >
      <div className="max-w-screen mx-auto px-5 md:px-10 lg:px-12 pt-16 md:pt-20 pb-16">
        {items.map((item, index) =>
          item.layout === "hero" ? (
            <EventHero key={item.id} item={item} />
          ) : (
            <EventCard key={item.id} item={item} index={index} />
          ),
        )}
      </div>
    </section>
  );
}
