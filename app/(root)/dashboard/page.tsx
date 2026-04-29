"use client";

import { Image, Zap, Clock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Masonry from "react-responsive-masonry";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import AnalyticsCard from "@/components/dashboard/AnalyticsCard";
import UsageChart from "@/components/dashboard/UsageChart";
import ImageCard from "@/components/dashboard/ImageCard";
import QuickActionsPanel from "@/components/dashboard/QuickActionsPanel";
import SubscriptionCard from "@/components/dashboard/SubscriptionCard";
import PromptInput from "@/components/dashboard/PromptInput";

const mockImages = [
  {
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    prompt: "A futuristic cyberpunk city at night with neon lights reflecting on wet streets",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&q=80",
    prompt: "Fantasy portrait of an ethereal elf warrior in enchanted forest",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
    prompt: "Abstract cosmic nebula with swirling galaxies and star clusters",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80",
    prompt: "Minimalist geometric shapes floating in pastel gradient space",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    prompt: "Majestic mountain landscape with aurora borealis dancing in the sky",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80",
    prompt: "Steampunk mechanical dragon with intricate brass gears and copper wings",
  },
];

export default function App() {
  return (
    <div className="flex h-screen bg-linear-to-br from-black via-purple-950 to-blue-950 overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 overflow-y-auto pb-48">
        <div className="p-8 max-w-7xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold bg-linear-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-2">
              Welcome back, John
            </h1>
            <p className="text-gray-400">Let's create something amazing today</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnalyticsCard
              title="Total Images"
              value="1,247"
              icon={Image}
              trend="+12% from last month"
              color="purple"
            />
            <AnalyticsCard
              title="This Week"
              value="89"
              icon={Zap}
              trend="+23% from last week"
              color="blue"
            />
            <AnalyticsCard
              title="Avg. Generation Time"
              value="4.2s"
              icon={Clock}
              trend="-15% faster"
              color="pink"
            />
            <AnalyticsCard
              title="Success Rate"
              value="98.5%"
              icon={TrendingUp}
              trend="+2.3% improved"
              color="cyan"
            />
          </div>

          <UsageChart />

          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Recent Generations</h2>
            <Masonry columnsCount={3} gutter="1.5rem">
              {mockImages.map((image, index) => (
                <ImageCard
                  key={index}
                  imageUrl={image.imageUrl}
                  prompt={image.prompt}
                  liked={index % 3 === 0}
                />
              ))}
            </Masonry>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
            <QuickActionsPanel />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SubscriptionCard />
            <motion.div
              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-purple-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: "Generated", prompt: "Cyberpunk city", time: "2 min ago" },
                  { action: "Liked", prompt: "Fantasy portrait", time: "15 min ago" },
                  { action: "Downloaded", prompt: "Abstract art", time: "1 hour ago" },
                  { action: "Generated", prompt: "Space nebula", time: "2 hours ago" },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div>
                      <p className="text-sm text-white">
                        <span className="text-purple-400">{activity.action}</span> "{activity.prompt}"
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <PromptInput />
    </div>
  );
}