"use client";

import { AnalyticsCardProps } from "@/types";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

const AnalyticsCard = ({ title, value, icon: Icon, trend, color = "purple" }: AnalyticsCardProps) => {
  const colorMap = {
    purple: "from-purple-500/20 to-purple-600/10 border-purple-500/30",
    blue: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
    pink: "from-pink-500/20 to-pink-600/10 border-pink-500/30",
    cyan: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30",
  };

  const iconColorMap = {
    purple: "bg-purple-500/20 text-purple-400",
    blue: "bg-blue-500/20 text-blue-400",
    pink: "bg-pink-500/20 text-pink-400",
    cyan: "bg-cyan-500/20 text-cyan-400",
  };

  return (
    <motion.div
      className={`p-6 rounded-xl bg-linear-to-br ${colorMap[color]} backdrop-blur-sm border relative overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 0 24px rgba(168, 85, 247, 0.2)`
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-2">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {trend && (
            <p className="text-xs text-green-400 mt-2">{trend}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconColorMap[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
    </motion.div>
  );
}

export default AnalyticsCard;