"use client";

import React from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
  parseISO,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type EventItem } from "@/types/events";

interface CalendarSidebarProps {
  events: EventItem[];
  selectedDate: string;
  currentMonth: Date;
  onSelectDate: (date: string) => void;
  onMonthChange: (date: Date) => void;
}

export const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  events,
  selectedDate,
  currentMonth,
  onSelectDate,
  onMonthChange,
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getEventsForDate = (date: string) => {
    return events.filter((e) => e.date === date);
  };

  return (
    <div className="flex flex-col h-full p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-zinc-600 text-xs font-bold uppercase tracking-widest block mb-1">
            {format(currentMonth, "yyyy")}
          </span>
          <h2 className="text-3xl font-bold font-['Syne'] text-white">
            {format(currentMonth, "MMMM")}
          </h2>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onMonthChange(subMonths(currentMonth, 1))}
            className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => onMonthChange(addMonths(currentMonth, 1))}
            className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-4">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-bold text-zinc-700 uppercase tracking-wider py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, idx) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const isSelected = dateStr === selectedDate;
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isTodayDate = isToday(day);
          const dayEvents = getEventsForDate(dateStr);
          const hasEvents = dayEvents.length > 0;

          return (
            <button
              key={idx}
              onClick={() => onSelectDate(dateStr)}
              className={`
                relative aspect-square flex flex-col items-center justify-center rounded-lg
                transition-all duration-200 text-sm font-medium
                ${
                  isSelected
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }
                ${!isCurrentMonth && "opacity-20 pointer-events-none"}
                ${isTodayDate && !isSelected && "text-lime-400"}
              `}
            >
              <span className="relative z-10">{format(day, "d")}</span>

              {hasEvents && (
                <div className="absolute bottom-2 flex gap-0.5">
                  {dayEvents.slice(0, 3).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 h-1 rounded-full ${
                        isSelected ? "bg-black" : "bg-lime-400"
                      }`}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-8 border-t border-zinc-900">
        <div className="text-xs text-zinc-600 uppercase tracking-widest mb-2">
          Selected Date
        </div>
        <div className="text-xl font-bold font-['Syne'] text-white">
          {format(parseISO(selectedDate), "EEEE, MMM do")}
        </div>
      </div>
    </div>
  );
};
