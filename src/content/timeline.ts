import { PUBLIC_ADMIN_API_URL } from "@/scripts/config.mjs";

export type TimelineState = {
  key: string;
  label: string;
  titleLine1: string;
  titleLine2?: string;
  desc: string;
};

// ADMINAPIURL = import.meta.env.ADMINAPIURL ?? "http://localhost:3000";

export const DEFAULT_TIMELINE_STATES: TimelineState[] = [
  {
    key: "past",
    label: "Past",
    titleLine1: "Early days",
    titleLine2: "of CyberShield",
    desc: "How the club started, first meetups, and initial workshops.",
  },
  {
    key: "today",
    label: "Today",
    titleLine1: "Active community",
    titleLine2: "learning by doing",
    desc: "Regular workshops, CTFs, awareness sessions and internal projects.",
  },
  {
    key: "future",
    label: "Future",
    titleLine1: "Scaling impact",
    titleLine2: "across the campus",
    desc: "Collaborations, intercollege events, research and advanced tracks.",
  },
];

// const PUBLIC_ADMIN_API_URL = import.meta.env.PUBLIC_ADMIN_API_URL;

export async function fetchTimelineStates(): Promise<TimelineState[]> {
  try {
    const res = await fetch(`${PUBLIC_ADMIN_API_URL}/api/landing/timeline`);
    if (!res.ok) throw new Error("Failed to fetch timeline");
    const json = await res.json();
    const states = json.states as any[];

    return states.slice(0, 3).map((state) => ({
      key: state.key,
      label: state.label,
      titleLine1: state.titleLine1,
      titleLine2: state.titleLine2 ?? undefined,
      desc: state.desc,
    }));
  } catch {
    return DEFAULT_TIMELINE_STATES;
  }
}

export const TIMELINE_STATES: TimelineState[] = await fetchTimelineStates();
