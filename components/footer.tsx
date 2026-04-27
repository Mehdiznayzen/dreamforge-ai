"use client";

import { NavbarLinks } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative py-16 border-t border-white/10">
      <div className="absolute inset-0 bg-linear-to-b from-black to-purple-950/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-blue-500 rounded-lg blur-md opacity-75" />
                <div className="relative bg-linear-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                DreamForge AI
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Empowering creativity through advanced AI technology. Transform your imagination into stunning visual art.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <FaTwitter className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <FaGithub className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <FaLinkedin className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <FaInstagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-white font-semibold text-lg">Quick Links</h3>
            <nav className="flex flex-col gap-3">
                {
                    NavbarLinks.map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                        >
                            {item.label}
                        </Link>
                    ))
                }
            </nav>
          </div>

          <div className="space-y-6">
            <h3 className="text-white font-semibold text-lg">Legal</h3>
            <nav className="flex flex-col gap-3">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Cookie Policy
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 DreamForge AI. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Built with passion and AI ✨
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;