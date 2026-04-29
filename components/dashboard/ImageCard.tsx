"use client";

import { ImageWithFallback } from "@/public/figma/ImageWithFallback";
import { ImageCardProps } from "@/types";
import { motion } from "framer-motion";
import { Download, Heart, RefreshCw, Eye } from "lucide-react";
import { useState } from "react";

const ImageCard = ({ imageUrl, prompt, liked = false }: ImageCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(liked);

  return (
    <motion.div
      className="relative group rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm border border-purple-500/20"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.02,
        borderColor: "rgba(168, 85, 247, 0.6)",
        boxShadow: "0 0 24px rgba(168, 85, 247, 0.3)"
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="aspect-square relative overflow-hidden">
        <ImageWithFallback
          src={imageUrl}
          alt={prompt}
          className="w-full h-full object-cover"
        />

        <motion.div
          className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />

        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.2 }}
        >
          <button className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors border border-white/20">
            <Download className="w-5 h-5 text-white" />
          </button>
          <button
            className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors border border-white/20"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-pink-500 text-pink-500" : "text-white"}`} />
          </button>
          <button className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors border border-white/20">
            <RefreshCw className="w-5 h-5 text-white" />
          </button>
          <button className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors border border-white/20">
            <Eye className="w-5 h-5 text-white" />
          </button>
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.2, delay: 0.05 }}
        >
          <p className="text-xs text-white/90 line-clamp-2">{prompt}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ImageCard;