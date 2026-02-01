"use client";

import React, { useRef, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";
import gsap from "gsap";
import { type EventItem } from "@/types/events";

interface EventDetailViewProps {
  event: EventItem | undefined;
  eventIndex: number;
  totalEvents: number;
  onPrev: () => void;
  onNext: () => void;
  hasNavigation: boolean;
}

export const EventDetailView: React.FC<EventDetailViewProps> = ({
  event,
  eventIndex,
  totalEvents,
  onPrev,
  onNext,
  hasNavigation,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      );
    }
    if (imagesRef.current) {
      gsap.fromTo(
        imagesRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      );
    }
  }, [event]);

  if (!event) {
    return (
      <div className="h-full flex items-center justify-center text-zinc-600">
        <div className="text-center">
          <p className="text-xl font-bold uppercase tracking-widest mb-2">
            No Events
          </p>
          <p className="text-sm text-zinc-500">Select a date with events</p>
        </div>
      </div>
    );
  }

  const eventDate = parseISO(event.date);
  const images = event.images || [];

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <div className="min-h-full flex flex-col justify-between">
        <div ref={contentRef} className="px-8 lg:px-16 py-12 lg:py-20">
          {hasNavigation && (
            <div className="flex items-center gap-4 mb-12">
              <button
                onClick={onPrev}
                disabled={eventIndex === 0}
                className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-900 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-zinc-600 text-sm font-mono">
                {eventIndex + 1} / {totalEvents}
              </span>
              <button
                onClick={onNext}
                disabled={eventIndex === totalEvents - 1}
                className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-900 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          <div className="max-w-5xl">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-600 mb-6">
              Event
            </h3>

            <h1 className="text-6xl lg:text-8xl xl:text-9xl font-bold font-['Syne'] leading-[0.85] tracking-tight text-white mb-8">
              {event.title}
            </h1>

            <div className="flex flex-wrap gap-8 text-zinc-400 text-sm uppercase tracking-widest mb-12">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-lime-400" />
                <span>{event.time || "All Day"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-lime-400" />
                <span>{event.location || "TBA"}</span>
              </div>
              <div className="text-zinc-600">
                {format(eventDate, "EEEE, MMMM do")}
              </div>
            </div>

            <div className="max-w-3xl space-y-6">
              <p className="text-2xl lg:text-3xl text-zinc-200 leading-relaxed font-light">
                {event.summary}
              </p>
              {event.description && (
                <p className="text-lg text-zinc-500 leading-relaxed">
                  {event.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {images.length > 0 && (
          <div className="px-8 lg:px-16 pb-12 mt-8">
            <div
              ref={imagesRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {images.slice(0, 3).map((img, idx) => (
                <div
                  key={idx}
                  className="aspect-[4/3] overflow-hidden bg-zinc-900 group"
                >
                  <img
                    src={img}
                    alt={`${event.title} ${idx + 1}`}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
