"use client";

import { motion } from "framer-motion";
import { Sparkles, Upload, Shuffle, TrendingUp } from "lucide-react";

const actions = [
  {
    icon: Sparkles,
    label: "New Generation",
    description: "Start fresh",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Upload,
    label: "Upload Reference",
    description: "Image to image",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Shuffle,
    label: "Random Prompt",
    description: "Get inspired",
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: TrendingUp,
    label: "Trending Prompts",
    description: "Popular ideas",
    color: "from-cyan-500 to-cyan-600",
  },
];

const QuickActionsPanel = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <motion.button
          key={action.label}
          className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all text-left group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className={`w-12 h-12 rounded-lg bg-linear-to-br ${action.color} flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-purple-500/20 transition-shadow`}>
            <action.icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-white font-semibold mb-1">{action.label}</h3>
          <p className="text-sm text-gray-400">{action.description}</p>
        </motion.button>
      ))}
    </div>
  );
}

export default QuickActionsPanel