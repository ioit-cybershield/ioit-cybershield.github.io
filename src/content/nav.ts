// src/content/nav.ts - Replace with dynamic fetch
export type NavItem = {
  id: string;
  label: string;
  href?: string;
};

const ADMIN_API_URL = import.meta.env.ADMIN_API_URL || "http://localhost:3000";

async function fetchNavItems(): Promise<NavItem[]> {
  try {
    const response = await fetch(`${ADMIN_API_URL}/api/general/navbar`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return data.items
      .filter((item: any) => item.isActive)
      .sort((a: any, b: any) => a.order - b.order)
      .map((item: any) => ({
        id: item.key,
        label: item.label,
        href: item.href || undefined,
      }));
  } catch (error) {
    console.error("Failed to fetch navbar:", error);
    // Fallback items
    return [
      { id: "events", label: "Events", href: "/events" },
      { id: "gallery", label: "Gallery", href: "/gallery" },
      { id: "team", label: "Team", href: "/team" },
      { id: "about", label: "About Us", href: "/about" },
    ];
  }
}

export const NAV_ITEMS = await fetchNavItems();
