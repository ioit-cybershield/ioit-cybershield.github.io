"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  format,
  parseISO,
  isSameDay,
  addMonths,
  subMonths,
  isAfter,
} from "date-fns";
import gsap from "gsap";
import { type EventItem } from "@/types/events";
import { EventDetailView } from "./Event";
import { CalendarSidebar } from "@/components/events/Calendar";

interface EventsComponentProps {
  events: EventItem[];
}

export const EventsComponent: React.FC<EventsComponentProps> = ({ events }) => {
  // Find closest upcoming event date on initial load
  const getDefaultDate = () => {
    if (events.length === 0) return format(new Date(), "yyyy-MM-dd");

    const today = new Date();
    const futureEvents = events.filter((e) => {
      const eventDate = parseISO(e.date);
      return isAfter(eventDate, today) || isSameDay(eventDate, today);
    });

    if (futureEvents.length === 0) return events[0].date;

    const sorted = futureEvents.sort(
      (a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime(),
    );
    return sorted[0].date;
  };

  const [selectedDate, setSelectedDate] = useState<string>(getDefaultDate());
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(parseISO(getDefaultDate()));
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedDateEvents = useMemo(() => {
    return events.filter((e) => e.date === selectedDate);
  }, [events, selectedDate]);

  useEffect(() => {
    setCurrentEventIndex(0);
    if (containerRef.current) {
      gsap.fromTo(
        ".detail-panel",
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
      );
    }
  }, [selectedDate]);

  const handlePrevEvent = () => {
    if (currentEventIndex > 0) setCurrentEventIndex((prev) => prev - 1);
  };

  const handleNextEvent = () => {
    if (currentEventIndex < selectedDateEvents.length - 1) {
      setCurrentEventIndex((prev) => prev + 1);
    }
  };

  const currentEvent = selectedDateEvents[currentEventIndex];
  const hasMultipleEvents = selectedDateEvents.length > 1;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-black text-white overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
        <div className="lg:col-span-4 xl:col-span-3 border-r border-zinc-900 bg-zinc-950 flex flex-col h-full">
          <CalendarSidebar
            events={events}
            selectedDate={selectedDate}
            currentMonth={currentMonth}
            onSelectDate={setSelectedDate}
            onMonthChange={setCurrentMonth}
          />
        </div>

        <div className="lg:col-span-8 xl:col-span-9 relative bg-black h-full overflow-hidden">
          <EventDetailView
            event={currentEvent}
            eventIndex={currentEventIndex}
            totalEvents={selectedDateEvents.length}
            onPrev={handlePrevEvent}
            onNext={handleNextEvent}
            hasNavigation={hasMultipleEvents}
          />
        </div>
      </div>
    </section>
  );
};

export default EventsComponent;
