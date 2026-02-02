// src/components/events/EventDetailsPage.tsx

import React, { type FC, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import type { EventDetail } from "@/types/events";

interface EventDetailsPageProps {
  event: EventDetail;
}

const EventDetailsPage: FC<EventDetailsPageProps> = ({ event }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const sliderTrackRef = useRef<HTMLDivElement | null>(null);
  const sliderWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sliderTrackRef.current) return;

    gsap.to(sliderTrackRef.current, {
      xPercent: -activeIndex * 100,
      duration: 0.7,
      ease: "power2.inOut",
    });
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? event.gallery.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === event.gallery.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div className="mt-25 min-h-screen bg-white text-black">
      <main
        id="main"
        aria-labelledby="event-title"
        // Changed pb-28 to pb-12 since the fixed newsletter bar is gone
        className="mx-auto max-w-[1160px] px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pt-10"
      >
        <article className="border-t border-neutral-200 pt-4">
          {/* Header */}
          <header className="border-b border-neutral-200 pb-5 md:pb-7">
            <div className="space-y-2 md:space-y-3">
              <h1
                id="event-title"
                className="flex items-center gap-3 text-[26px] leading-[1.1] tracking-tight sm:text-[32px] md:text-[38px] lg:text-[44px]"
              >
                <span className="inline-flex h-[18px] w-[18px] items-center justify-center bg-black" />
                <span className="uppercase">{event.title}</span>
              </h1>
              <p className="text-[20px] leading-none text-neutral-400 sm:text-[24px] md:text-[28px]">
                <time dateTime={event.startDate}>{event.startLabel}</time>
                {" — "}
                <time dateTime={event.endDate}>{event.endLabel}</time>
              </p>
            </div>
          </header>

          {/* Hero + Info */}
          <section className="mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-start lg:gap-12">
            <div className="lg:w-[55%]">
              <div className="relative w-full overflow-hidden bg-[#f46500]">
                <div className="aspect-[7/4]">
                  <img
                    src={event.heroImage.url}
                    alt={event.heroImage.alt}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <aside className="lg:w-[45%]">
              <dl
                aria-label="Practical information"
                className="text-[13px] leading-snug sm:text-[14px]"
              >
                {event.infoRows.map((row, idx) => (
                  <div
                    key={row.label}
                    className={`grid grid-cols-[minmax(0,0.55fr)_minmax(0,1.45fr)] gap-x-6 border-t border-neutral-200 py-3 md:py-3.5 ${
                      idx === event.infoRows.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                      {row.label}
                    </dt>
                    <dd className="text-[13px] leading-snug sm:text-[14px]">
                      {row.href ? (
                        <a
                          href={row.href}
                          target={row.external ? "_blank" : undefined}
                          rel={row.external ? "noreferrer" : undefined}
                          className="underline decoration-transparent transition-colors hover:decoration-black"
                        >
                          {row.value}
                        </a>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </section>

          {/* Body Sections */}
          {event.bodySections.map((section, index) => (
            <section
              key={section.id}
              className={`mt-14 border-t border-neutral-200 pt-10 md:mt-16 md:pt-12 ${
                index === 0 ? "lg:mt-18" : ""
              }`}
            >
              <div className="grid gap-8 md:grid-cols-[minmax(0,0.35fr)_minmax(0,1.65fr)]">
                <div>{/* Empty title column to match layout */}</div>
                <div className="space-y-4 text-[14px] leading-relaxed sm:text-[15px] md:text-[16px] md:leading-[1.6]">
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 32)}>{p}</p>
                  ))}
                </div>
              </div>
            </section>
          ))}

          {/* Gallery Slider */}
          <section className="mt-16 border-t border-neutral-200 pt-10 md:mt-18 md:pt-12">
            <div
              ref={sliderWrapperRef}
              className="relative h-[340px] overflow-hidden bg-neutral-50 sm:h-[420px] md:h-[520px]"
            >
              <div className="pointer-events-none absolute left-4 right-4 top-4 z-20 flex justify-between gap-2 sm:left-6 sm:right-6">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="pointer-events-auto flex h-8 w-8 items-center justify-center border border-black bg-white text-[11px] leading-none"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="pointer-events-auto flex h-8 w-8 items-center justify-center border border-black bg-white text-[11px] leading-none"
                  aria-label="Next image"
                >
                  ›
                </button>
              </div>

              <div
                ref={sliderTrackRef}
                className="relative flex h-full w-full"
                style={{ transform: "translateX(0%)" }}
              >
                {event.gallery.map((item) => (
                  <div
                    key={item.id}
                    className="h-full w-full shrink-0 grow-0 basis-full"
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Credits */}
          <section
            id="credits"
            className="mt-16 border-t border-neutral-200 pt-10 md:mt-18 md:pt-12"
          >
            <div className="grid gap-8 md:grid-cols-[minmax(0,0.35fr)_minmax(0,1.65fr)]">
              <div className="text-[11px] uppercase tracking-[0.18em]">
                CREDITS
              </div>
              <div className="text-[14px] leading-relaxed sm:text-[15px] md:text-[16px] md:leading-[1.6]">
                <p>
                  Music: Le Motel &amp; Ben Bertrand
                  <br />
                  Choreography and performance: Mercedes Dassy
                  <br />
                  Exhibition design: Nel Verbeke
                  <br />
                  Photos ©Alexander Popelier
                </p>
              </div>
            </div>
          </section>

          {/* Partners */}
          <section
            id="with-the-support-of"
            aria-labelledby="partners-title"
            className="mt-16 border-t border-neutral-200 pt-10 md:mt-18 md:pt-12"
          >
            <div className="grid items-start gap-8 md:grid-cols-[minmax(0,0.35fr)_minmax(0,1.65fr)]">
              <div className="text-[11px] uppercase tracking-[0.18em]">
                <h2 id="partners-title">With the support of</h2>
              </div>
              <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
                <div className="max-w-[160px]">
                  <img
                    src="https://www.imal.org/media/pages/events/la-societe-automatique/120168437-1761232710/logo2_abxl.svg"
                    alt="Partner"
                    className="h-auto w-full object-contain"
                  />
                </div>
                <div className="max-w-[200px]">
                  <img
                    src="https://www.imal.org/media/pages/events/la-societe-automatique/233211227-1761232710/logo2-bembajada-1440x.png"
                    alt="Partner"
                    className="h-auto w-full object-contain"
                  />
                </div>
                <div className="max-w-[180px]">
                  <img
                    src="https://www.imal.org/media/pages/events/la-societe-automatique/462700860-1761232710/logo2_caecid.svg"
                    alt="Partner"
                    className="h-auto w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
};

export default EventDetailsPage;
