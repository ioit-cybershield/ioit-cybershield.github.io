import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// --- Types ---

interface ImageAsset {
  id: number;
  url: string;
  alt: string;
  aspect: "portrait" | "landscape" | "square" | "video";
}

// --- Data: Curated Unsplash images to match the video vibe ---
const HERO_IMAGES: ImageAsset[] = [
  // Initial Set
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1520045899857-15f6d7700250?q=80&w=1000&auto=format&fit=crop",
    alt: "Skater",
    aspect: "portrait",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1544191674-3d5f19ae6d29?q=80&w=1000&auto=format&fit=crop",
    alt: "Mountain Biker",
    aspect: "landscape",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1000&auto=format&fit=crop",
    alt: "Surfer",
    aspect: "landscape",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1565992441121-4367c2967103?q=80&w=1000&auto=format&fit=crop",
    alt: "BMX trick",
    aspect: "square",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1000&auto=format&fit=crop",
    alt: "Hiker",
    aspect: "portrait",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1518604666860-9ed391f76460?q=80&w=1000&auto=format&fit=crop",
    alt: "Wheelchair Athlete",
    aspect: "landscape",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1498855926480-d98e83099315?q=80&w=1000&auto=format&fit=crop",
    alt: "Climber",
    aspect: "portrait",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1517824806704-9040b037703b?q=80&w=1000&auto=format&fit=crop",
    alt: "Skiier",
    aspect: "landscape",
  },
  // Transition Set
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop",
    alt: "Road trip",
    aspect: "landscape",
  },
  {
    id: 10,
    url: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1000&auto=format&fit=crop",
    alt: "Nature",
    aspect: "portrait",
  },
  {
    id: 11,
    url: "https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=1000&auto=format&fit=crop",
    alt: "Paraglider",
    aspect: "landscape",
  },
  {
    id: 12,
    url: "https://images.unsplash.com/photo-1526772662003-6eb4ebf716b3?q=80&w=1000&auto=format&fit=crop",
    alt: "Skier2",
    aspect: "portrait",
  },
];

// --- Components ---

/**
 * Splits text into characters surrounded by <div> tags to match the
 * specific GSAP animation structure found in the original code.
 */
const SplitText: React.FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  const words = text.split(" ");

  return (
    <div
      className={className}
      style={{ display: "inline-block", position: "relative" }}
    >
      {words.map((word, wordIndex) => (
        <div
          key={wordIndex}
          className="word"
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
        >
          {word.split("").map((char, charIndex) => (
            <div
              key={`${wordIndex}-${charIndex}`}
              className="char inline-block opacity-0 transform translate-y-full"
            >
              {char}
            </div>
          ))}
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </div>
      ))}
    </div>
  );
};

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // State to cycle images for the "Video" effect
  const [activeImageSet, setActiveImageSet] = useState(0);

  // Image transition loop (replaces video background)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageSet((prev) => (prev + 1) % 3); // Cycle through 3 sets
    }, 4000); // Change every 4 seconds like a video cut
    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Hero Text Entrance Animation (Staggered Chars)
      tl.to(".char", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.03,
        delay: 0.2,
        ease: "expo.out",
      });

      // 2. Scroll Animations
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Parallax the grid up and fade slightly
      scrollTl.to(gridRef.current, {
        y: 150,
        scale: 1.05,
        opacity: 0.5,
        ease: "none",
      });

      // Pin text briefly then fade it out as it scrolls past
      scrollTl.to(
        textRef.current,
        {
          y: -100,
          opacity: 0,
          ease: "none",
        },
        0,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className="hero-section relative w-full min-h-screen bg-[#111] overflow-hidden"
    >
      {/* --- Background Grid (Replaces Video) --- */}
      <div ref={gridRef} className="absolute inset-0 w-full h-full z-0">
        {/* CSS Masonry Layout to match the collage in video */}
        <div className="mt-10 columns-2 md:columns-3 lg:columns-4 gap-2 p-2 h-full opacity-80">
          {HERO_IMAGES.map((img, i) => {
            // Logic to swap images based on state to simulate video cuts
            const isVisible = i % 3 === activeImageSet || img.id <= 8;
            return (
              <div
                key={img.id}
                className={`relative break-inside-avoid mb-2 overflow-hidden transition-opacity duration-1000 ${
                  isVisible ? "opacity-100" : "opacity-0 absolute"
                }`}
                style={{
                  height:
                    img.aspect === "portrait"
                      ? "60vh"
                      : img.aspect === "landscape"
                        ? "40vh"
                        : "50vh",
                }}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover grayscale-[20%] contrast-110 hover:scale-105 transition-transform duration-[10s]"
                />
              </div>
            );
          })}
        </div>

        {/* Opacity Overlay (Darken images for text contrast) */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>

      {/* --- Hero Content --- */}
      <div
        mobile-full="true"
        className="mt-0 container hero-video-bk-txt relative z-10 w-full h-full flex items-end pb-12 md:pb-24 px-6 md:px-12 pointer-events-none"
      >
        <div
          hero-align="bottom"
          className="hero-txt-wrap w-full max-w-[1400px] mt-20 mx-auto"
        >
          <div className="hero-txt-bloc flex flex-col items-start space-y-6">
            {/* Main Heading */}
            <div
              className="fs1 mt-30 text-[#E4B03C] leading-[0.85] tracking-tight uppercase font-black"
              style={{
                fontFamily: "'Anton', 'Impact', 'Helvetica Neue', sans-serif",
                fontSize: "clamp(3rem, 12vw, 10rem)",
              }}
              data-hero="h"
            >
              <div ref={textRef} className="max-w-[40ch]">
                <SplitText text="COME TOGETHER" />
                <br />
                <SplitText text="RETURN CHANGED" />
              </div>
            </div>

            {/* Sub-text */}
            {/* <div
              className="fs5 text-white/90 text-lg md:text-2xl max-w-[25ch] font-serif italic opacity-0 animate-[fadeIn_1s_ease_1.5s_forwards]"
              data-hero="p"
            >
              A celebration of adventure, film, and community.
            </div> */}

            {/* Button */}
            {/* <div
              data-hero="btn"
              className="opacity-0 animate-[fadeIn_1s_ease_1.8s_forwards] pointer-events-auto"
            >
              <a
                href="#"
                className="group inline-flex items-center gap-3 bg-transparent border border-[#E4B03C] text-[#E4B03C] hover:bg-[#E4B03C] hover:text-black transition-colors px-8 py-4 uppercase tracking-widest font-bold text-sm"
              >
                <span>Watch Trailer</span>
                <Play
                  className="w-4 h-4 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                />
              </a>
            </div> */}
          </div>
        </div>
      </div>

      {/* Decorative Film Grain */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.15] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  );
};

export function App() {
  return (
    <div className="bg-[#111] min-h-screen">
      {/* Global Font Injection for that specific "Film Festival" look */}

      <main className="relative">
        <HeroSection />
      </main>
    </div>
  );
}

export default HeroSection;
