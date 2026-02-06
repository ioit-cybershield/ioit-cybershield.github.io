import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// const BG_IMAGE_URL =
//   "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/69271f09c85e1d1bee5d34ce_bg%20new%20croptab.avif";

const CallToAction: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);

  const titleLine1Ref = useRef<HTMLHeadingElement>(null);
  const titleLine2Ref = useRef<HTMLHeadingElement>(null);
  const subHeadRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --------------------------
      // 1. INITIAL STATES
      // --------------------------
      gsap.set(".transition-line", { height: "0%" });

      gsap.set([titleLine1Ref.current, titleLine2Ref.current], {
        yPercent: 105,
      });

      gsap.set([subHeadRef.current, bodyRef.current, btnRef.current], {
        y: 40,
        autoAlpha: 0,
      });

      if (bgImageRef.current) {
        gsap.set(bgImageRef.current, { scale: 1, yPercent: 0 });
      }

      // --------------------------
      // 2. SCROLL TIMELINE
      // --------------------------
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%", // a bit more scroll to let the hero "sit"
          scrub: 0.8,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // Phase 1: Reveal (0 → ~0.7)
      tl.to(
        [titleLine1Ref.current, titleLine2Ref.current],
        {
          yPercent: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power3.out",
        },
        0,
      );

      tl.to(
        [subHeadRef.current, bodyRef.current, btnRef.current],
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
        },
        0.2,
      );

      if (bgImageRef.current) {
        tl.to(
          bgImageRef.current,
          {
            // yPercent: 10,
            scale: 1.15,
            ease: "none",
            duration: 1,
          },
          0,
        );
      }

      // Phase 2: Exit with drapes (very end of scroll)
      tl.to(
        ".transition-line",
        {
          height: "100%",
          duration: 0.35,
          stagger: 0.06,
          ease: "expo.inOut",
        },
        0.9,
      );

      tl.to(
        [
          titleLine1Ref.current,
          titleLine2Ref.current,
          subHeadRef.current,
          bodyRef.current,
          btnRef.current,
        ],
        {
          y: -50,
          autoAlpha: 0,
          duration: 0.25,
          ease: "power1.in",
        },
        0.93,
      );

      // --------------------------
      // 3. CYBER BUTTON EFFECTS
      // --------------------------
      const cyberButtons = gsap.utils.toArray<HTMLElement>(".cyber-btn");

      const scrambleText = (element: HTMLElement, finalText: string) => {
        let iteration = 0;
        const interval = setInterval(() => {
          element.innerText = finalText
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration) return finalText[index];
              return scrambleChars[
                Math.floor(Math.random() * scrambleChars.length)
              ];
            })
            .join("");

          if (iteration >= finalText.length) {
            clearInterval(interval);
            element.innerText = finalText;
          }

          iteration += 1 / 3;
        }, 30);
      };

      cyberButtons.forEach((btn) => {
        const btnText = btn.querySelector(".btn-text") as HTMLElement | null;
        const btnGlitch = btn.querySelector(
          ".btn-glitch",
        ) as HTMLElement | null;
        const scanLine = btn.querySelector(".scan-line") as HTMLElement | null;

        const originalText = btnText?.dataset.text || "";

        btn.addEventListener("mouseenter", () => {
          if (btnText && originalText) {
            scrambleText(btnText, originalText);
          }

          if (btnGlitch) {
            gsap.to(btnGlitch, {
              opacity: 1,
              duration: 0.08,
              repeat: 3,
              yoyo: true,
              ease: "steps(2)",
              onComplete: () => {
                gsap.set(btnGlitch, { opacity: 0 });
              },
            });
          }

          if (scanLine) {
            gsap.fromTo(
              scanLine,
              { left: "-100%", opacity: 0 },
              {
                left: "100%",
                opacity: 1,
                duration: 0.6,
                ease: "power2.inOut",
              },
            );
          }

          gsap.to(btn, {
            boxShadow:
              "0 0 24px rgba(0, 255, 136, 0.35), 0 0 50px rgba(0, 255, 136, 0.18)",
            duration: 0.25,
          });
        });

        btn.addEventListener("mouseleave", () => {
          if (btnText && originalText) {
            btnText.innerText = originalText;
          }
          gsap.to(btn, { boxShadow: "none", duration: 0.3 });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden text-[#333]"
      style={{ fontFamily: 'Arial,"Helvetica Neue",Helvetica,sans-serif' }}
    >
      {/* Drapes */}
      <div className="absolute inset-0 flex pointer-events-none z-50 h-full w-full">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div
            key={i}
            className={`transition-line flex-1 bg-[#1d2f4f] border-r border-[#ffffff10] origin-top ${
              i === 1 || i === 2 ? "hidden md:block" : ""
            }`}
          />
        ))}
      </div>

      {/* Background image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgImageRef}
          src="/assets/cta2.jpg"
          loading="eager"
          alt="Background"
          className="w-full h-[120%] -top-[10%] left-0 absolute object-cover object-center will-change-transform"
        />
        {/* gentle darkening to help legibility */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Wrapper that matches .cta-product-wrap */}
      <div className="relative z-10 w-full h-full">
        <div
          className="mx-5 max-w-screen mb-3 h-full"
          style={{
            WebkitTextSizeAdjust: "100%",
            color: "#333",
            lineHeight: "20px",
            fontSize: "0.96vw",
            WebkitFontSmoothing: "antialiased",
            boxSizing: "border-box",
            zIndex: 2,
            display: "flex",
            flexFlow: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            height: "100%",
            paddingTop: "5em",
            paddingBottom: "3.56em",
            position: "relative",
            paddingLeft: "1.88em",
            paddingRight: "1.88em",
          }}
        >
          {/* Top: left heading block */}
          <div className="w-full max-w-160">
            <div className="overflow-hidden mb-[-0.4em]">
              <h2
                ref={titleLine1Ref}
                className="block text-[7vw] md:text-[3.4vw] leading-[1.1] font-normal text-[#192536] tracking-[-0.02em]"
              >
                You don’t get many
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2
                ref={titleLine2Ref}
                className="block text-[7vw] md:text-[3.4vw] leading-[1.1] font-normal text-[#000000] tracking-[-0.02em]"
              >
                chances to be early.
              </h2>
            </div>
          </div>

          {/* Bottom: right CTA block */}
          <div className="w-full flex justify-end">
            <div className="max-w-136 text-right">
              <div className="overflow-hidden">
                <h2
                  ref={subHeadRef}
                  className="text-[7vw] md:text-[3vw] leading-[1.1] font-medium text-white mb-4 tracking-[-0.01em]"
                >
                  To lead, not follow.
                </h2>
              </div>

              <div
                ref={bodyRef}
                className="text-white/90 text-sm md:text-base leading-snug  tracking-[0em] font-light max-w-none inline-block"
              >
                To shape what cybersecurity becomes — not just adapt to it.
                <br />
                <br />
                CYBERSHIELD™ IS ALREADY IN THE HANDS OF TEAMS REWRITING THE
                RULES. IF YOU’RE READY, WE’LL MAKE ROOM FOR YOU.
              </div>

              <div
                ref={btnRef}
                className="mt-6 flex flex-col sm:flex-row gap-4 justify-end"
              >
                {/* Primary fancy button */}
                <a
                  href="#"
                  className="cyber-btn group relative overflow-hidden bg-[#005eff] text-[#142015] px-7 py-3.5 flex items-center justify-center font-bold uppercase tracking-[0.16em] text-[0.78rem] transition-colors hover:bg-[#00d8cd]"
                  style={{
                    fontFamily: '"JetBrains Mono","Fira Code",monospace',
                    clipPath:
                      "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                  }}
                >
                  <span className="scan-line absolute top-0 bottom-0 w-1/3 bg-linear-to-r from-transparent via-white/60 to-transparent opacity-0" />
                  <span className="btn-glitch absolute inset-0 bg-[#ff0040] opacity-0 mix-blend-multiply" />
                  <span
                    className="btn-text relative z-10"
                    data-text=">> REQUEST_ACCESS"
                  >
                    &gt;&gt; REQUEST_ACCESS
                  </span>
                  <span className="absolute top-0 left-0 w-2 h-2 bg-[#142015]" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-[#142015]" />
                </a>

                {/* Secondary fancy button */}
                <a
                  href="/contact-us"
                  className="cyber-btn group relative overflow-hidden border border-[#e5ecda] text-[#e5ecda] px-7 py-3.5 flex items-center justify-center font-bold uppercase tracking-[0.16em] text-[0.78rem] transition-all hover:bg-white/10 hover:border-white"
                  style={{
                    fontFamily: '"JetBrains Mono","Fira Code",monospace',
                    clipPath:
                      "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                  }}
                >
                  <span className="scan-line absolute top-0 bottom-0 w-1/3 bg-linear-to-r from-transparent via-[#e5ecda]/70 to-transparent opacity-0" />
                  <span className="btn-glitch absolute inset-0 bg-[#e5ecda] opacity-0 mix-blend-overlay" />
                  <span
                    className="btn-text relative z-10"
                    data-text=">> TALK_TO_OUR_TEAM"
                  >
                    &gt;&gt; TALK_TO_OUR_TEAM
                  </span>
                  <span className="absolute top-0 left-0 w-2 h-2 bg-[#e5ecda]" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-[#e5ecda]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
