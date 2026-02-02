// La Société Automatique event page reconstruction. [page:0]

import React, { type FC, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface EventHeroImage {
  url: string;
  alt: string;
  aspectRatio: number;
}

interface EventInfoRow {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

interface EventBodySection {
  id: string;
  paragraphs: string[];
}

interface EventGalleryItem {
  id: string;
  src: string;
  alt: string;
}

interface EventDetail {
  slug: string;
  title: string;
  startDate: string;
  endDate: string;
  startLabel: string;
  endLabel: string;
  category: string;
  heroImage: EventHeroImage;
  infoRows: EventInfoRow[];
  bodySections: EventBodySection[];
  gallery: EventGalleryItem[];
}

const MOCK_EVENT: EventDetail = {
  slug: "la-societe-automatique",
  title: "LA SOCIÉTÉ AUTOMATIQUE",
  startDate: "2025-11-07",
  endDate: "2026-02-15",
  startLabel: "07.11.2025",
  endLabel: "15.02.2026",
  category: "Exhibitions",
  heroImage: {
    url: "https://www.imal.org/media/pages/events/la-societe-automatique/3064778490-1760515024/orange_for_site.png",
    alt: "La Société Automatique Abstract Graphic",
    aspectRatio: 1.75,
  },
  infoRows: [
    {
      label: "Category",
      value: "Exhibitions",
      href: "https://www.imal.org/en/events/tag:Exhibitions",
    },
    {
      label: "In the framework of",
      value: "EUROPALIA ESPAÑA",
      href: "https://europalia.eu",
      external: true,
    },
    {
      label: "Co-Produced By",
      value:
        "iMAL, LABoral Centro de Arte y Creación Industrial, EUROPALIA and FWB",
    },
    {
      label: "An Exhibition By",
      value:
        "Félix Luque Sánchez, in collaboration with Vincent Evrard, Damien Gernay and Íñigo Bilbao Lopategui",
    },
    { label: "Opening Hours", value: "Wed-Sun ▪ 11am — 6pm" },
    { label: "Holidays", value: "⚠ Closed on 25/12/2025 and 01/01/2026" },
    {
      label: "Location",
      value: "iMAL",
      href: "https://www.imal.org/en/visit",
      external: false,
    },
  ],
  bodySections: [
    {
      id: "intro",
      paragraphs: [
        "After Chapter I (2009), Nihil Ex Nihilo (2010) and Memory Lane (2016), Felix Luque Sanchez returns to iMAL with a new solo exhibition. Eight new creations – produced with his regular collaborators Vincent Evrard, Damien Gernay and Íñigo Bilbao Lopategui – explore different facets of our Automatic Society.",
        "Choreography and performance: Mercedes Dassy / Music: Le Motel & Ben Bertrand.",
      ],
    },
    {
      id: "statement",
      paragraphs: [
        "“Have we not always had the deep-seated phantasy of a world that would go on without us? The poetic temptation to see the world in our absence, free of any human, all-too-human will?”",
        "— Jean Baudrillard – Why hasn’t everything already disappeared",
        "Industrial robots are designed to perform repetitive tasks with near-perfect precision. They operate without hesitation, exhaustion or loss of concentration. This is the mastery of automation, a synchronised symphony.",
        "From Taylorism to contemporary artificial intelligence, the utopia of automation has become increasingly prevalent. Having already transformed the world of industrial production, it has now taken hold of our thinking, judgement and memory.",
        "This is the age of La Société Automatique (The Automatic Society), the title of a Bernard Stiegler lecture describing the total automation of our lives. All areas of existence are merging into an invisible network of computations; digital utilitarianism is supplanting human decisions, imposing efficiency-driven logic that reduces our scope for action. Technology is becoming the invisible architect of our lives.",
        "An already dystopian present, where education that critically engages with these opaque systems is key in securing the democratic reappropriation of technology.",
        "The exhibition La Société Automatique depicts the anxiety of a post-anthropic world where machines – Sisyphuses devoid of weariness or rebellion – threaten to erase us. A universe of automatons carrying out their self-contained, cyclical work, with no human purpose.",
      ],
    },
  ],
  gallery: [
    {
      id: "1",
      src: "https://www.imal.org/media/pages/events/la-societe-automatique/4172786240-1764939865/felix-luque-imal-2025-2445-2400x.jpg",
      alt: "Installation View 1",
    },
    {
      id: "2",
      src: "https://www.imal.org/media/pages/events/la-societe-automatique/4074729883-1764939865/felix-luque-imal-2025-2466-2400x.jpg",
      alt: "Installation View 2",
    },
    {
      id: "3",
      src: "https://www.imal.org/media/pages/events/la-societe-automatique/956678700-1764939866/felix-luque-imal-2025-2537-2400x.jpg",
      alt: "Installation View 3",
    },
    {
      id: "4",
      src: "https://www.imal.org/media/pages/events/la-societe-automatique/724868460-1764939865/felix-luque-imal-2025-2653-2400x.jpg",
      alt: "Installation View 4",
    },
    {
      id: "5",
      src: "https://www.imal.org/media/pages/events/la-societe-automatique/2858301050-1764939865/felix-luque-imal-2025-2708-2400x.jpg",
      alt: "Installation View 5",
    },
    {
      id: "6",
      src: "https://www.imal.org/media/pages/events/la-societe-automatique/3353444115-1764939865/felix-luque-imal-2025-2792-2400x.jpg",
      alt: "Installation View 6",
    },
  ],
};

const LaSocieteAutomatiquePage: FC = () => {
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
      prev === 0 ? MOCK_EVENT.gallery.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === MOCK_EVENT.gallery.length - 1 ? 0 : prev + 1,
    );
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const [newsletterEmail, setNewsletterEmail] = useState("");

  return (
    <div className="mt-25 min-h-screen bg-white text-black">
      <main
        id="main"
        aria-labelledby="event-title"
        className="mx-auto  max-w-[1160px] px-4 pb-28 pt-8 sm:px-6 lg:px-8 lg:pt-10"
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
                <span className="uppercase">{MOCK_EVENT.title}</span>
              </h1>
              <p className="text-[20px] leading-none text-neutral-400 sm:text-[24px] md:text-[28px]">
                <time dateTime={MOCK_EVENT.startDate}>
                  {MOCK_EVENT.startLabel}
                </time>
                —{" "}
                <time dateTime={MOCK_EVENT.endDate}>{MOCK_EVENT.endLabel}</time>
              </p>
            </div>
          </header>

          {/* Hero + Info */}
          <section className="mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-start lg:gap-12">
            <div className="lg:w-[55%]">
              <div className="relative w-full overflow-hidden bg-[#f46500]">
                <div className="aspect-[7/4]">
                  <img
                    src={MOCK_EVENT.heroImage.url}
                    alt={MOCK_EVENT.heroImage.alt}
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
                {MOCK_EVENT.infoRows.map((row, idx) => (
                  <div
                    key={row.label}
                    className={`grid grid-cols-[minmax(0,0.55fr)_minmax(0,1.45fr)] gap-x-6 border-t border-neutral-200 py-3 md:py-3.5 ${
                      idx === MOCK_EVENT.infoRows.length - 1 ? "border-b" : ""
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
          {MOCK_EVENT.bodySections.map((section, index) => (
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
                {MOCK_EVENT.gallery.map((item) => (
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
            <div className="grid gap-8 md:grid-cols-[minmax(0,0.35fr)_minmax(0,1.65fr)] items-start">
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

      {/* Newsletter bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-neutral-200 bg-white/95 px-4 py-3 shadow-[0_-2px_8px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:px-6 md:px-8 md:py-4">
        <form
          onSubmit={handleNewsletterSubmit}
          className="mx-auto flex max-w-[1160px] items-center gap-3 md:gap-4"
        >
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email"
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            className="w-full border-b border-black bg-transparent pb-1 text-[14px] uppercase tracking-[0.18em] placeholder-black/40 outline-none sm:text-[15px]"
          />
          <button
            type="submit"
            disabled={!newsletterEmail.trim()}
            className="flex h-9 w-9 items-center justify-center border border-black bg-black text-[14px] text-white disabled:border-neutral-400 disabled:bg-neutral-400"
            aria-label="Subscribe to newsletter"
          >
            →
          </button>
        </form>
      </div>
    </div>
  );
};

export default LaSocieteAutomatiquePage;
