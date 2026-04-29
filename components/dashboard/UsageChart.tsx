"use client";

import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", images: 12 },
  { day: "Tue", images: 19 },
  { day: "Wed", images: 15 },
  { day: "Thu", images: 25 },
  { day: "Fri", images: 22 },
  { day: "Sat", images: 30 },
  { day: "Sun", images: 28 },
];

const UsageChart = () => {
  return (
    <motion.div
      className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-purple-500/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="text-lg font-semibold text-white mb-4">Weekly Usage</h3>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorImages" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
          <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
          <YAxis stroke="#9ca3af" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #a855f7",
              borderRadius: "8px",
              color: "#fff"
            }}
          />
          <Area
            type="monotone"
            dataKey="images"
            stroke="#a855f7"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorImages)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export default UsageChart;