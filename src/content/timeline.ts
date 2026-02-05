// src/content/timeline.ts
export type TimelineState = {
  label: string;
  titleLines: string[];
  desc: string;
};

// const ADMINAPIURL = import.meta.env.ADMINAPIURL ?? "http://localhost:3000";

export const DEFAULT_TIMELINE_STATES: TimelineState[] = [
  {
    label: "Past",
    titleLines: ["Early days", "of CyberShield"],
    desc: "How the club started, first meetups, and initial workshops.",
  },
  {
    label: "Today",
    titleLines: ["Active community", "learning by doing"],
    desc: "Regular workshops, CTFs, awareness sessions and internal projects.",
  },
  {
    label: "Future",
    titleLines: ["Scaling impact", "across the campus"],
    desc: "Collaborations, inter‑college events, research and advanced tracks.",
  },
];
const ADMINAPIURL = import.meta.env.ADMINAPIURL ?? "http://localhost:3000";

async function fetchTimelineStates(): Promise<TimelineState[]> {
  try {
    const res = await fetch(`${ADMINAPIURL}/api/landing/timeline`);
    if (!res.ok) throw new Error("Failed to load timeline content");

    const data = await res.json();
    const apiStates = data.states;

    if (!Array.isArray(apiStates) || apiStates.length === 0) {
      return DEFAULT_TIMELINE_STATES;
    }

    return apiStates.map((state: any) => {
      const raw = state.titleLines ?? "";
      const [line1, line2 = ""] = raw
        .split(",", 2)
        .map((s: string) => s.trim());

      return {
        label: state.label,
        titleLines: [line1, line2].filter(Boolean),
        desc: state.desc,
      };
    });
  } catch (err) {
    console.error(err);
    return DEFAULT_TIMELINE_STATES;
  }
}

export const TIMELINE_STATES: TimelineState[] = await fetchTimelineStates();
