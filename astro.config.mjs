// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://ioit-cybershield.github.io",
  base: process.env.NODE_ENV === "production" ? "/CyberShield-Web" : "/",
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },
});
