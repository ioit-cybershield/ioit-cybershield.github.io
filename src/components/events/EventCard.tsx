// components/events/EventCard.tsx
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { EventItem } from "@/types/events";

interface EventCardProps {
  item: EventItem;
  index: number;
}

// components/events/EventCard.tsx
export default function EventCard({ item }: EventCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const image = cardRef.current?.querySelector(".event-image");
        const textElements = cardRef.current?.querySelectorAll(
          ".event-type, .event-title, .event-meta, .event-summary",
        );

        if (!image || !textElements?.length) return;

        gsap.set(image, { opacity: 0, scale: 1.04 });
        gsap.set(textElements, { y: 16, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 88%",
            scroller: document.documentElement,
            toggleActions: "play none none reverse",
          },
        });

        tl.to(image, {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
        }).to(
          textElements,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
          },
          "-=0.35",
        );
      }, cardRef);

      return () => ctx.revert();
    },
    { scope: cardRef },
  );

  return (
    <article
      ref={cardRef}
      className="event-card-row border-b-2 border-1a1a1a/80 bg-[#f8f8f6] hover:bg-[#f3f3f1] transition-colors duration-200"
    >
      <a
        href={`/events/${item.slug}`}
        className="block py-6 md:py-7 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 lg:gap-8"
      >
        {/* Image: slightly wider, shallower aspect */}
        <div className="md:col-span-6 lg:col-span-6 relative overflow-hidden aspect-[16/9] bg-e5e5e5">
          {item.image && (
            <img
              src={item.image.url}
              alt={item.image.alt || item.title}
              className="event-image absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          )}
        </div>

        {/* Content */}
        <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-center">
          {item.category && (
            <div className="event-type text-[0.7rem] md:text-xs uppercase tracking-[0.18em] text-555 mb-2 font-normal">
              {item.category}
            </div>
          )}

          <h2 className="event-title text-lg md:text-xl lg:text-[1.4rem] font-bold leading-snug tracking-tight text-000 mb-3 group-hover:text-444 transition-colors duration-300">
            {item.title}
          </h2>

          <div className="event-meta flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 text-[0.8rem] md:text-sm text-333">
            {item.contributors && (
              <span className="font-normal">
                By <span className="font-medium">{item.contributors}</span>
              </span>
            )}
            <time dateTime={item.date} className="tabular-nums text-666">
              {item.date}
            </time>
          </div>

          {item.excerpt && (
            <div className="event-summary">
              <p className="text-sm md:text-[0.95rem] leading-snug text-444 line-clamp-3">
                {item.excerpt}
              </p>
            </div>
          )}
        </div>
      </a>
    </article>
  );
}
