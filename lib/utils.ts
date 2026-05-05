import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Zap, Palette, Download, Sparkles, Layers, Shield, History, Heart, Settings } from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const NavbarLinks = [
  {
    id: 1,
    href: "/",
    label: "Home",
  },
  {
    id: 2,
    href: "#about",
    label: "About",
  },
  {
    id: 3,
    href: "#features",
    label: "Features",
  }
];

export const features = [
  {
    icon: Zap,
    title: 'Lightning Fast Generation',
    description: 'Create stunning AI artwork in seconds with our optimized neural networks and cloud infrastructure.',
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Palette,
    title: 'Multiple Art Styles',
    description: 'Choose from dozens of artistic styles - photorealistic, anime, oil painting, digital art, and more.',
    gradient: 'from-pink-400 to-purple-500',
  },
  {
    icon: Download,
    title: 'High Resolution Output',
    description: 'Download your creations in stunning 4K quality, perfect for prints, social media, and professional use.',
    gradient: 'from-blue-400 to-cyan-500',
  },
  {
    icon: Sparkles,
    title: 'User-Friendly Interface',
    description: 'No technical skills needed. Simply describe your vision and watch it come to life instantly.',
    gradient: 'from-purple-400 to-pink-500',
  },
  {
    icon: Layers,
    title: 'Advanced Customization',
    description: 'Fine-tune every aspect with advanced controls for composition, lighting, colors, and effects.',
    gradient: 'from-green-400 to-emerald-500',
  },
  {
    icon: Shield,
    title: 'Commercial License',
    description: 'Full commercial rights to your generated images. Use them freely in your projects and business.',
    gradient: 'from-indigo-400 to-blue-500',
  },
];

export const navItems = [
  { id: 'generate', label: 'Generate Image', icon: Sparkles, href: "/dashboard" },
  { id: 'history', label: 'History', icon: History, href: "/dashboard/history" },
  { id: 'favorites', label: 'Favorites', icon: Heart, href: "/dashboard/favorites" },
  { id: 'settings', label: 'Settings', icon: Settings, href: "/dashboard/settings" },
];

export async function urlToFile(url: string) {
  const res = await fetch(url);
  const blob = await res.blob();

  return new File([blob], `image-${Date.now()}.png`, {
    type: "image/png",
  });
}