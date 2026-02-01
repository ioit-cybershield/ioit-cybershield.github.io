// src/components/events/EventsList.tsx
import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EVENTS_DATA = [
  {
    id: "1",
    type: "Workshop",
    title: "Introduction to Ethical Hacking & Penetration Testing",
    href: "/events/ethical-hacking-intro",
    imageSrc:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    contributors: "Dr. Sarah Chen",
    date: "15.03.2026",
    summary:
      "A hands-on workshop covering the fundamentals of ethical hacking, including reconnaissance techniques, vulnerability assessment, and responsible disclosure practices. Participants will engage with real-world scenarios in a controlled lab environment.",
    featured: false,
  },
  {
    id: "2",
    type: "Competition",
    title: "CyberShield CTF: Winter Edition",
    href: "/events/winter-ctf-2026",
    imageSrc:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    contributors: "CyberShield Team",
    date: "22.02.2026",
    summary:
      "Our flagship Capture The Flag competition brings together students from across the campus to solve cryptography, reverse engineering, and web exploitation challenges. Prizes include internship opportunities with leading security firms.",
    featured: false,
  },
  {
    id: "3",
    type: "Awareness",
    title: "Social Engineering Defense: The Human Firewall",
    href: "/events/social-engineering-defense",
    imageSrc:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    contributors: "Marcus Johnson",
    date: "10.02.2026",
    summary:
      "Exploring the psychological tactics used by malicious actors to manipulate individuals into breaching security protocols. This session combines theory with interactive demonstrations to build resilient human-centered defense strategies.",
    featured: false,
  },
  {
    id: "4",
    type: "Project",
    title: "Open Source Security Audit: Campus Infrastructure",
    href: "/events/campus-security-audit",
    imageSrc:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    contributors: "Tech Committee",
    date: "Ongoing",
    summary:
      "A collaborative initiative where club members conduct authorized security assessments of university systems, identifying vulnerabilities and proposing patches. This project provides practical experience while contributing to campus safety.",
    featured: false,
  },
  {
    id: "5",
    type: "Workshop",
    title: "Malware Analysis & Reverse Engineering Basics",
    href: "/events/malware-analysis",
    imageSrc:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    contributors: "Alex Kumar",
    date: "05.03.2026",
    summary:
      "Learn to dissect malicious software in a safe sandbox environment. We cover static analysis techniques, dynamic behavioral monitoring, and the use of industry-standard tools like Ghidra and Cuckoo Sandbox.",
    featured: false,
  },
  {
    id: "6",
    type: "Writing",
    title: "Digital Privacy in the Age of Surveillance Capitalism",
    href: "/events/privacy-writing",
    imageSrc:
      "https://images.unsplash.com/photo-1563206767-5b1d972e2925?w=800&q=80",
    contributors: "Privacy Special Interest Group",
    date: "28.01.2026",
    summary:
      "An intimate reading and discussion session examining the intersection of personal privacy, corporate data harvesting, and state surveillance. We explore practical countermeasures and the philosophical implications of digital identity.",
    featured: false,
  },
];

interface EventItem {
  id: string;
  type: string;
  title: string;
  href: string;
  imageSrc: string;
  contributors: string;
  date: string;
  summary: string;
  featured: boolean;
}

const EventsList: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.from(".page-header-content", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".page-header",
          start: "top 80%",
          scroller: document.documentElement,
        },
      });

      // Animate each list item
      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        const image = item.querySelector(".event-image");
        const type = item.querySelector(".event-type");
        const title = item.querySelector(".event-title");
        const meta = item.querySelector(".event-meta");
        const summary = item.querySelector(".event-summary");

        // Set initial states
        gsap.set([type, title, meta, summary], {
          y: 20,
          opacity: 0,
        });
        gsap.set(image, {
          opacity: 0,
          scale: 1.05,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            scroller: document.documentElement,
            toggleActions: "play none none reverse",
          },
        });

        // Image fade in
        tl.to(image, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        });

        // Content stagger
        tl.to(
          [type, title, meta, summary],
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.4",
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#f5f5f3] text-[#1a1a1a] pt-24 md:pt-32 pb-24"
      style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
    >
      {/* Page Header */}
      <div className="page-header px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto mb-12 border-b border-[#1a1a1a] pb-6">
        <div className="page-header-content flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="text-xs uppercase tracking-[0.15em] text-[#666] mb-3 font-normal">
              Events & Activities
            </h2>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1] text-[#000]">
              Workshops, CTFs
              <br className="hidden md:block" />
              <span className="text-[#666]">& Competitions</span>
            </h1>
          </div>
          <p className="text-base text-[#444] leading-relaxed max-w-md md:text-right md:pb-1">
            Practical cybersecurity experiences built by and for students. Join
            our hands-on sessions and competitive events.
          </p>
        </div>
      </div>

      {/* Events List */}
      <div className="events-container px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto">
        {EVENTS_DATA.map((event, index) => (
          <div
            key={event.id}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            className="event-item group border-b border-[#1a1a1a] last:border-b-0"
          >
            <a
              href={event.href}
              className="block py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12"
            >
              {/* Image Column - ~40% */}
              <div className="md:col-span-5 lg:col-span-5 relative overflow-hidden aspect-[4/3] md:aspect-[3/2] bg-[#e5e5e5]">
                <img
                  src={event.imageSrc}
                  alt={event.title}
                  className="event-image absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Content Column - ~60% */}
              <div className="md:col-span-7 lg:col-span-7 flex flex-col justify-center">
                {/* Type Label */}
                <div className="event-type text-xs uppercase tracking-[0.15em] text-[#555] mb-3 font-normal">
                  {event.type}
                </div>

                {/* Title */}
                <h2 className="event-title text-xl md:text-2xl lg:text-[1.75rem] font-bold leading-[1.15] tracking-tight text-[#000] mb-4 group-hover:text-[#444] transition-colors duration-300">
                  {event.title}
                </h2>

                {/* Meta Info Row */}
                <div className="event-meta flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 text-sm text-[#333]">
                  {event.contributors && (
                    <span className="font-normal">By {event.contributors}</span>
                  )}
                  <time className="tabular-nums text-[#666]">{event.date}</time>
                </div>

                {/* Summary */}
                <div className="event-summary">
                  <p className="text-base leading-[1.5] text-[#444] line-clamp-3 md:line-clamp-none">
                    {event.summary}
                  </p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mt-12 pt-8 border-t border-[#1a1a1a] flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-sm text-[#666]">Showing 6 of 24 events</span>
        <div className="flex gap-4">
          <button
            className="px-6 py-2 border border-[#1a1a1a] text-xs uppercase tracking-[0.1em] font-medium hover:bg-[#1a1a1a] hover:text-white transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#1a1a1a]"
            disabled
          >
            Previous
          </button>
          <button className="px-6 py-2 border border-[#1a1a1a] text-xs uppercase tracking-[0.1em] font-medium hover:bg-[#1a1a1a] hover:text-white transition-colors duration-200">
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventsList;
