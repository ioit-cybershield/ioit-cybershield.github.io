

export type NavItem = {
  id: string;
  label: string;
  href?: string;
};

export const NAV_ITEMS: NavItem[] = [
  {
    id: "events",
    label: "Events",
    href: "/events",
  },
  {
    id: "gallery",
    label: "Gallery",

    href: "/gallery",
  },
  { id: "Team", label: "Team", href: "/team" },
  { id: "About us", label: "About us", href: "/about" },
];
