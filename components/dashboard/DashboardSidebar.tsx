"use client";

import { motion } from "framer-motion";
import { Home, Sparkles, Image as ImageIcon, Heart, BookText, CreditCard, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import Image from "next/image";

const navItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: Sparkles, label: "Generate Image", active: false },
  { icon: Image, label: "Gallery", active: false },
  { icon: Heart, label: "Favorites", active: false },
  { icon: BookText, label: "Prompt Library", active: false },
  { icon: CreditCard, label: "Usage & Credits", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const DashboardSidebar = () => {
  return (
    <div className="w-64 h-screen bg-black/40 backdrop-blur-xl border-r border-purple-500/20 flex flex-col">
      <div className="p-6">
        <motion.div
          className="flex items-center gap-3"
          animate={{
            filter: [
              "drop-shadow(0 0 8px rgba(168, 85, 247, 0.4))",
              "drop-shadow(0 0 16px rgba(168, 85, 247, 0.6))",
              "drop-shadow(0 0 8px rgba(168, 85, 247, 0.4))",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center justify-center gap-3 w-full">
            <Image 
              src={"/images/logo.png"}
              width={100}
              height={100}
              alt='logo'
            />
          </div>
        </motion.div>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item, index) => (
          <motion.button
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              item.active
                ? "bg-linear-to-r from-purple-600/30 to-blue-600/30 text-white border border-purple-500/50"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ImageIcon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </motion.button>
        ))}
      </nav>

      <div className="p-4 border-t border-purple-500/20">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
          <Avatar className="w-10 h-10 ring-2 ring-purple-500/50">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">John Doe</p>
            <Badge className="mt-1 bg-linear-to-r from-purple-600 to-blue-600 text-white border-0 text-xs">
              Pro Plan
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;