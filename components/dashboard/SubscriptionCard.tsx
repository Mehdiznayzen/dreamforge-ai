"use client";

import { motion } from "framer-motion";
import { Crown, Zap } from "lucide-react";
import { Progress } from "../ui/progress";

const SubscriptionCard = () => {
  return (
    <motion.div
      className="p-6 rounded-xl bg-linear-to-br from-purple-500/20 to-blue-600/20 backdrop-blur-sm border border-purple-500/30 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Pro Plan</h3>
          </div>
          <motion.button
            className="px-4 py-2 rounded-lg bg-linear-to-r from-purple-600 to-blue-600 text-white text-sm font-medium flex items-center gap-2"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="w-4 h-4" />
            Upgrade
          </motion.button>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Credits Used</span>
              <span className="text-white font-medium">750 / 1,000</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-xs text-gray-400">This Month</p>
              <p className="text-xl font-bold text-white mt-1">247</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-xs text-gray-400">Remaining</p>
              <p className="text-xl font-bold text-purple-400 mt-1">250</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SubscriptionCard;