"use client";

import { navItems } from '@/lib/utils';
import { SidebarProps } from '@/types';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

const Sidebar = ({ activeTab, onTabChange, isDark, onThemeToggle }: SidebarProps) => {
  return (
    <aside className="w-64 h-screen bg-black/40 backdrop-blur-xl border-r border-white/10 flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-center gap-3">
          <Image 
              src={"/images/logo.png"}
              width={87}
              height={87}
              alt='logo'
          />
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {
          navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <Link
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                  ${isActive
                    ? 'bg-linear-to-r from-purple-500/20 to-blue-500/20 text-white border border-purple-500/50 shadow-lg shadow-purple-500/20'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                  }
                `}
                href={item.href}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : ''}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })
        }
      </nav>

      <div className="p-4 border-t border-white/10">
  <div className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">

    {/* User info (optionnel) */}
    <div className="flex-1 text-left">
      <p className="text-sm text-white font-medium">Account</p>
      <p className="text-xs text-white/50">Manage your profile</p>
    </div>

    {/* Clerk User Button */}
    <UserButton
      appearance={{
        elements: {
          avatarBox: "w-10 h-10 rounded-full ring-2 ring-purple-500/40 hover:ring-purple-400 transition-all",
          userButtonPopoverCard:
            "bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl",
          userButtonPopoverActionButton:
            "hover:bg-white/10 text-white/80",
          userButtonPopoverActionButtonText:
            "text-sm",
        },
      }}
    />

  </div>
</div>
    </aside>
  );
}

export default Sidebar;