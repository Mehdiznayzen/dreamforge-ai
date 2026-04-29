"use client";

import { motion } from "framer-motion";
import { Sparkles, Wand2, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

const quickPrompts = [
  "Cyberpunk cityscape",
  "Fantasy portrait",
  "Abstract art",
  "Sci-fi landscape",
  "Minimalist design",
];

const PromptInput = () => {
  const [prompt, setPrompt] = useState("");

  return (
    <motion.div
      className="fixed bottom-0 left-64 right-0 p-6 bg-black/60 backdrop-blur-xl border-t border-purple-500/20"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex gap-2 flex-wrap">
          {quickPrompts.map((suggestion) => (
            <motion.button
              key={suggestion}
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-purple-500/30 text-sm text-gray-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPrompt(suggestion)}
            >
              {suggestion}
            </motion.button>
          ))}
        </div>

        <div className="relative">
          <Textarea
            placeholder="Describe your imagination..."
            value={prompt}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
            className="min-h-20 bg-white/5 border-purple-500/30 text-white placeholder:text-gray-500 resize-none pr-32 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20"
          />

          <div className="absolute right-2 bottom-2 flex gap-2">
            <motion.button
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ImageIcon className="w-5 h-5 text-gray-300" />
            </motion.button>
            <motion.button
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Wand2 className="w-5 h-5 text-gray-300" />
            </motion.button>
            <motion.button
              className="px-6 py-2 rounded-lg bg-linear-to-r from-purple-600 to-blue-600 text-white font-medium flex items-center gap-2"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)"
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(168, 85, 247, 0.3)",
                  "0 0 30px rgba(168, 85, 247, 0.5)",
                  "0 0 20px rgba(168, 85, 247, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5" />
              Generate
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PromptInput;