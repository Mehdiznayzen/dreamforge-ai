"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";

const UserButton = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();
  console.log(user);


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div ref={ref} className="relative mx-2 mb-6">
      
      {/* BUTTON */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
      >
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-linear-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-md">
          {user?.firstName?.charAt(0) || "M"}
        </div>

        {/* Info */}
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-white leading-none">
            {user?.username || "User"}
          </p>
          <p className="text-xs text-white/50">
            Pro Plan
          </p>
        </div>
      </div>

      {/* DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-64 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
          >
            
            {/* HEADER */}
            <div className="p-4 border-b border-white/10">
              <p className="text-white font-medium">
                {user?.fullName}
              </p>
              <p className="text-xs text-white/50">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>

            {/* MENU */}
            <div className="p-2 space-y-1">

              {/* PROFILE */}
              <button
                onClick={() => {
                  router.push("/profile");
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition text-sm text-white/80"
              >
                <User className="w-4 h-4" />
                Profile
              </button>

            </div>

            {/* FOOTER */}
            <div className="p-2 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/20 transition text-sm text-red-400"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserButton;