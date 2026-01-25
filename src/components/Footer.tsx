import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LogoText } from "./ui/logo-text-copyright";

gsap.registerPlugin(ScrollTrigger);

// --- Icons ---

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 40 41"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m26.8333 17.5709c.6334.2667 1.0334.8667 1.0334 1.5667v9.7h3.6333v-20.06666h-20.0333v3.63336h9.8333c.7 0 1.3.4 1.5667 1.0666.2666.6667.1333 1.3667-.3667 1.8667l-14 13.7 2.5333 2.5667 13.9667-13.7c.5-.5 1.2-.6334 1.8333-.3667z"
      fill="currentColor"
    ></path>
  </svg>
);

const LogoIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 184 184"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="currentColor">
      <path d="M65.1896 27.2328L70.1777 10.1643C71.8144 4.47475 77.1142 0.499878 83.0376 0.499878H101.041C106.965 0.499878 112.265 4.47475 113.901 10.1643L127.463 56.6157L148.428 62.7729L144.219 70.4109L120.526 63.4743L105.64 12.5804C105.016 10.554 103.146 9.07313 100.963 9.07313H82.9596C80.7773 9.07313 78.9068 10.554 78.2833 12.5804L72.7496 31.4415L65.1117 27.2328H65.1896ZM27.2335 118.811L31.4421 111.173L12.581 105.639C10.5546 105.016 9.07374 103.145 9.07374 100.963V82.959C9.07374 81.634 9.61931 80.387 10.4766 79.5297C11.0222 78.9841 11.7237 78.5165 12.503 78.2827L63.397 63.3964L70.3335 39.703L62.6956 35.4943L56.5384 56.4599L10.0869 70.0212C4.47536 71.8138 0.500488 77.1136 0.500488 83.0369V101.041C0.500488 106.964 4.47536 112.264 10.1649 113.901L27.2335 118.889V118.811ZM173.914 70.1771L156.845 65.189L152.637 72.827L171.498 78.3606C173.524 78.9841 175.005 80.8547 175.005 83.0369V101.041C175.005 103.223 173.602 105.094 171.498 105.717L120.604 120.603L113.667 144.297L121.305 148.505L127.463 127.54L173.914 113.979C176.096 113.355 178.045 112.186 179.604 110.627C182.098 108.133 183.578 104.782 183.578 101.119V83.1149C183.578 77.1915 179.604 71.8917 173.914 70.255V70.1771ZM111.173 152.636L105.64 171.497C105.016 173.524 103.146 175.005 100.963 175.005H82.9596C80.7773 175.005 78.9068 173.602 78.2833 171.497L63.397 120.603L39.7036 113.667L35.495 121.305L56.4605 127.462L70.0218 173.913C71.6585 179.603 76.9583 183.578 82.8817 183.578H100.886C106.809 183.578 112.109 179.603 113.745 173.913L118.733 156.845L111.095 152.636H111.173Z" />
      <path
        opacity="0.62"
        d="M27.2328 65.1888L18.6595 49.6011C15.8538 44.4571 16.789 37.9103 20.9198 33.7016L33.6238 20.9976C37.8325 16.7889 44.3014 15.8536 49.5233 18.7374L91.9998 41.9631L111.173 31.4414L113.589 39.7808L91.9219 51.6275L45.3925 26.1415C43.522 25.1283 41.1059 25.4401 39.6251 26.9989L26.921 39.7029C25.4402 41.2616 25.0505 43.5998 26.0637 45.4703L35.4943 62.6948L27.1549 65.1109L27.2328 65.1888ZM65.1889 156.767L62.7728 148.427L45.5484 157.858C43.6779 158.871 41.2618 158.559 39.7809 157.001L27.0769 144.297C26.1417 143.361 25.674 142.114 25.674 140.867C25.674 139.62 25.8299 139.231 26.2975 138.529L51.7835 91.9997L39.9368 70.3328L31.5974 72.7489L42.1191 91.9218L18.8934 134.398C16.0876 139.542 17.0228 146.089 21.1536 150.298L33.8576 163.002C38.0663 167.211 44.5352 168.146 49.7571 165.262L65.3448 156.689L65.1889 156.767ZM134.476 18.6594L118.889 27.2327L121.305 35.5721L138.529 26.1415C140.4 25.1283 142.816 25.4401 144.297 26.9989L157.001 39.7029C158.482 41.2616 158.871 43.5998 157.858 45.4703L132.372 91.9997L144.219 113.667L152.558 111.251L142.036 92.0777L165.262 49.6011C166.353 47.5747 166.899 45.3924 166.899 43.2101C166.899 39.7029 165.574 36.2736 163.002 33.7016L150.298 20.9976C146.089 16.7889 139.62 15.8536 134.398 18.7374L134.476 18.6594ZM148.427 121.305L157.858 138.529C158.871 140.4 158.559 142.816 157.001 144.297L144.297 157.001C142.816 158.481 140.4 158.871 138.529 157.858L91.9998 132.372L70.3329 144.219L72.749 152.558L91.9219 142.036L134.398 165.262C139.542 168.068 146.089 167.133 150.298 163.002L163.002 150.298C167.211 146.089 168.146 139.62 165.262 134.398L156.689 118.811L148.35 121.227L148.427 121.305Z"
      />
    </g>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.52373 6.77569L15.4811 0H14.0699L8.89493 5.88203L4.7648 0H0L6.24693 8.89552L0 16H1.4112L6.87253 9.78704L11.2352 16H16M1.92053 1.04127H4.08853L14.0688 15.0099H11.9003"
      fill="currentColor"
    ></path>
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.13073 4.375H0V14.0003H3.13073V4.375Z"
      fill="currentColor"
    ></path>
    <path
      d="M11.6585 4.48788C11.6252 4.47738 11.5937 4.466 11.5587 4.45638C11.5167 4.44675 11.4747 4.43888 11.4318 4.43188C11.2656 4.39863 11.0836 4.375 10.8701 4.375C9.04485 4.375 7.88723 5.70241 7.50573 6.21518V4.375H4.375V14.0003H7.50573V8.75013C7.50573 8.75013 9.87172 5.45478 10.8701 7.87511C10.8701 10.0355 10.8701 14.0003 10.8701 14.0003H13.9999V7.50497C13.9999 6.05068 13.0033 4.83876 11.6585 4.48788Z"
      fill="currentColor"
    ></path>
    <path
      d="M1.53124 3.06259C2.37692 3.06259 3.06248 2.37701 3.06248 1.5313C3.06248 0.685585 2.37692 0 1.53124 0C0.68556 0 0 0.685585 0 1.5313C0 2.37701 0.68556 3.06259 1.53124 3.06259Z"
      fill="currentColor"
    ></path>
  </svg>
);

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 18 12.6"
  >
    <path d="M17.62,2A2.21,2.21,0,0,0,16,.38,53.19,53.19,0,0,0,9,0,53.19,53.19,0,0,0,2,.38,2.21,2.21,0,0,0,.38,2,23.15,23.15,0,0,0,0,6.3a23.15,23.15,0,0,0,.38,4.33A2.21,2.21,0,0,0,2,12.22a53.19,53.19,0,0,0,7,.38,53.19,53.19,0,0,0,7-.38,2.21,2.21,0,0,0,1.59-1.59A23.15,23.15,0,0,0,18,6.3,23.15,23.15,0,0,0,17.62,2ZM7.2,9V3.6l4.68,2.7Z"></path>
  </svg>
);

// --- Subcomponents ---

interface PrimaryLinkProps {
  href: string;
  label: string;
  className?: string;
}

const PrimaryLink = ({ href, label, className = "" }: PrimaryLinkProps) => {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const hoverLayerRef = useRef<HTMLDivElement>(null);
  const arrowDefaultRef = useRef<SVGSVGElement>(null);
  const arrowHoverRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el || !hoverLayerRef.current) return;

    const ctx = gsap.context(() => {
      // Hover Reveal Animation
      const tl = gsap.timeline({ paused: true });

      tl.to(hoverLayerRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.5,
        ease: "power3.out",
      }).to(
        [arrowDefaultRef.current, arrowHoverRef.current],
        {
          x: 6,
          duration: 0.5,
          ease: "power3.out",
        },
        0,
      );

      el.addEventListener("mouseenter", () => tl.play());
      el.addEventListener("mouseleave", () => tl.reverse());
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <a
      ref={containerRef}
      href={href}
      className={`primary-link-item group relative block w-full overflow-hidden py-1 text-fg no-underline ${className}`}
    >
      {/* Default Layer */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="font-sans text-[clamp(2.5rem,4vw,3.5rem)] font-medium uppercase leading-tight tracking-wide">
          {label}
        </span>
        <ArrowIcon
          // ref={arrowDefaultRef}
          className="h-6 w-6 text-fg md:h-8 md:w-8"
        />
      </div>

      {/* Hover Layer (Reveals on top) */}
      <div
        ref={hoverLayerRef}
        className="clip-hidden absolute inset-0 z-20 flex items-center justify-between bg-bg"
        aria-hidden="true"
      >
        <span className="font-sans text-[clamp(2.5rem,4vw,3.5rem)] font-medium uppercase leading-tight tracking-wide text-fg">
          {label}
        </span>
        <ArrowIcon
          // ref={arrowHoverRef}
          className="h-6 w-6 text-fg md:h-8 md:w-8"
        />
      </div>
    </a>
  );
};

// --- Main Component ---

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const primaryNavRef = useRef<HTMLElement>(null);
  const secondaryNavRef = useRef<HTMLElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Primary Nav Entrance
      gsap.from(".primary-link-item", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          scroller: document.documentElement,
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      });

      // 2. Secondary Nav Entrance
      gsap.from(".secondary-link-item", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
        delay: 0.2,
      });

      // 3. Bottom Row Entrance
      gsap.from(bottomRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
        },
        scale: 0.98,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-bg text-fg relative z-10 w-full overflow-hidden px-[var(--grid-side-margin)] py-12 pb-8 md:sticky md:bottom-0 md:-z-1 md:py-16"
    >
      <div className="mx-auto flex h-full max-w-[var(--grid-max-width)] flex-col justify-between">
        {/* Navigation Wrapper */}
        <div className="mb-16 flex flex-col justify-between gap-12 md:mb-24 md:flex-row">
          {/* Primary Navigation */}
          <nav
            ref={primaryNavRef}
            aria-label="Primary footer navigation"
            className="flex w-full flex-col md:w-2/3 lg:w-1/2"
          >
            <div className="flex flex-col gap-2">
              <PrimaryLink href="/portfolio" label="Portfolio" />
              <PrimaryLink href="/people" label="People" />
              <PrimaryLink href="/programs" label="Programs" />
              <PrimaryLink href="/perspectives" label="Perspectives" />
            </div>
          </nav>

          {/* Secondary Navigation */}
          <nav
            ref={secondaryNavRef}
            aria-label="Secondary footer navigation"
            className="flex flex-col items-start gap-8 md:w-1/3 md:items-end lg:w-1/2"
          >
            {/* Extra Primary Link (Home) */}
            <div className="secondary-link-item">
              <a
                href="/home"
                className="text-xl font-normal text-fg no-underline hover:text-muted transition-colors duration-300"
              >
                Home
              </a>
            </div>

            {/* Secondary Links */}
            <div className="flex flex-col gap-2 md:items-end">
              <a
                href="/privacy-policy"
                className="secondary-link-item text-muted text-base hover:text-fg transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="secondary-link-item text-muted text-base hover:text-fg transition-colors duration-300"
              >
                Terms
              </a>
              <a
                href="/scam-notice"
                className="secondary-link-item text-muted text-base hover:text-fg transition-colors duration-300"
              >
                Scam Prevention and Awareness
              </a>
            </div>
          </nav>
        </div>

        {/* Bottom Row */}
        <div
          ref={bottomRef}
          className="flex flex-col-reverse items-center justify-between gap-8 border-t border-[var(--color-border)] pt-8 md:flex-row"
        >
          {/* Copyright */}
          <span className="text-muted text-sm md:w-1/3 md:text-left">
            © 2025 Breakthrough Energy, LLC. All Rights Reserved.
          </span>

          {/* Center Logo */}
          <div className="flex justify-center md:w-1/3">
            <LogoText />
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 md:w-1/3 md:justify-end">
            <a
              href="https://x.com/breakthrough"
              target="_blank"
              rel="noreferrer"
              className="text-fg hover:text-muted transition-colors duration-300"
            >
              <span className="sr-only">x</span>
              <XIcon className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/breakthrough-energy"
              target="_blank"
              rel="noreferrer"
              className="text-fg hover:text-muted transition-colors duration-300"
            >
              <span className="sr-only">LinkedIn</span>
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a
              href="https://www.youtube.com/@breakthrough-energy"
              target="_blank"
              rel="noreferrer"
              className="text-fg hover:text-muted transition-colors duration-300"
            >
              <span className="sr-only">YouTube</span>
              <YouTubeIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
