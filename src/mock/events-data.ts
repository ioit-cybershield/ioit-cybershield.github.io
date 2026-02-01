// lib/mock/events-data.ts
import type { EventItem } from "@/types/events";

export const MOCK_EVENTS: EventItem[] = [
  {
    id: "1",
    layout: "hero",
    title: "Celebrating almost a decade of discourse, connection and advocacy",
    slug: "celebrating-almost-a-decade",
    date: "24.10.2025",
    excerpt:
      "After almost ten years of critical inquiry and advocacy for Aotearoa's international visual arts community, Contemporary HUM has come to a close. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus deserunt libero doloremque at vitae eum?",
    image: {
      url: "https://cdn.pixabay.com/photo/2026/01/11/08/15/08-15-24-346_1280.png",
      alt: "Contemporary HUM Banner",
    },
  },
  {
    id: "2",
    layout: "card",
    title: "Through Air, Breath and Stone",
    slug: "through-air-breath-and-stone",
    date: "07.10.2025",
    category: "Writing",
    contributors: "Yuka Keino",
    excerpt:
      "Travelling to Japan's Seto Inland Sea, curator Yuka Keino responds to Aotearoa artist Sarah Hudson's work Reconciliation. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus deserunt libero doloremque at vitae eum?",
    image: {
      url: "https://cdn.pixabay.com/photo/2024/12/08/11/44/portrait-9252698_1280.jpg",
      alt: "Sarah Hudson artwork detail",
    },
  },
  {
    id: "3",
    layout: "card",
    title: "From Moutohora to Megijima",
    slug: "moutohora-to-megijima",
    date: "20.08.2025",
    category: "Writing",
    contributors: "Sarah Hudson, Ngāti Pūkeko",
    excerpt:
      "Aotearoa artist Sarah Hudson (Ngāti Awa, Ngāti Pūkeko, Ngāi Taiwhakaea) speaks to UK art journal Corridor on the occasion of her participation... Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus deserunt libero doloremque at vitae eum?",
    image: {
      url: "https://cdn.pixabay.com/photo/2025/08/26/20/39/flowers-9798743_1280.jpg",
      alt: "Coastal landscape",
    },
  },
  {
    id: "4",
    layout: "card",
    title: "Luke Willis Thompson in Sharjah Biennial 16: to carry",
    slug: "luke-willis-thompson-sharjah",
    date: "07.05.2025",
    category: "Writing",
    excerpt:
      "In February 2025, Contemporary HUM speaks with Luke Willis Thompson on Waitangi Day in 2040 as a public broadcast... Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus deserunt libero doloremque at vitae eum?",
    image: {
      url: "https://cdn.pixabay.com/photo/2025/11/10/14/19/aerial-9948115_1280.jpg",
      alt: "Luke Willis Thompson portrait",
    },
  },
  {
    id: "5",
    layout: "hero",
    title: "Fiona Pardington in Sharjah Biennial 16: to carry",
    slug: "fiona-pardington-sharjah",
    date: "23.04.2025",
    excerpt:
      "Aotearoa artist and representative for Aotearoa New Zealand at the upcoming 61st Venice Biennale (2026) Fiona Pardington talks to Contemporary HUM... Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus deserunt libero doloremque at vitae eum?",
    image: {
      url: "https://cdn.pixabay.com/photo/2025/11/28/14/40/sea-9983074_1280.jpg",
      alt: "Fiona Pardington exhibition",
    },
  },
  {
    id: "6",
    layout: "card",
    title: "Ana Iti in Sharjah Biennial 16: to carry",
    slug: "ana-iti-sharjah",
    date: "23.04.2025",
    category: "Writing",
    excerpt:
      "In conversation with Contemporary HUM, Ana Iti talks about relocating from London to Abu Dhabi in 2024... Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus deserunt libero doloremque at vitae eum?",
    image: {
      url: "https://cdn.pixabay.com/photo/2025/04/30/06/01/dandelion-9568531_1280.jpg",
      alt: "Ana Iti installation",
    },
  },
];
