"use client";

import Sidebar from "@/components/dashboard/Sidebar"
import { useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState('generate');
  const [isDark, setIsDark] = useState(true);

  return (
    <div className="size-full flex bg-linear-to-br from-black via-purple-950/20 to-blue-950/20 overflow-hidden">
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isDark={isDark}
        onThemeToggle={() => setIsDark(!isDark)}
      />
      {children}
    </div>
  )
}

export default DashboardLayout