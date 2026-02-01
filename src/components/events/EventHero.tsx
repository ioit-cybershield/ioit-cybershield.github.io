// components/events/EventHero.tsx
import React from "react";
import type { EventItem } from "@/types/events";

interface EventHeroProps {
  item: EventItem;
}

// components/events/EventHero.tsx
export default function EventHero({ item }: EventHeroProps) {
  return (
    <article className="event-hero w-full py-10 md:py-14 border-y-2 border-1a1a1a bg-[#f7f7f5]">
      {item.image && (
        <a
          href={`/events/${item.slug}`}
          className="block w-full mb-6 overflow-hidden"
        >
          <img
            src={item.image.url}
            alt={item.image.alt || item.title}
            className="w-full h-auto max-h-[260px] md:max-h-[320px] object-cover"
            loading="lazy"
          />
        </a>
      )}

      <div className="text-center max-w-3xl mx-auto px-2">
        <h1 className="text-[1.9rem] md:text-[2.4rem] lg:text-[2.8rem] font-bold uppercase tracking-tight leading-[1.02] text-000 mb-4">
          <a
            href={`/events/${item.slug}`}
            className="hover:text-444 transition-colors duration-300"
          >
            {item.title}
          </a>
        </h1>

        <time
          dateTime={item.date}
          className="block text-xs md:text-sm text-666 mb-4 tabular-nums"
        >
          {item.date}
        </time>

        {item.excerpt && (
          <div className="text-sm md:text-[0.95rem] leading-relaxed text-444 max-w-2xl mx-auto">
            <p className="line-clamp-3 md:line-clamp-4">{item.excerpt}</p>
          </div>
        )}
      </div>
    </article>
  );
}
