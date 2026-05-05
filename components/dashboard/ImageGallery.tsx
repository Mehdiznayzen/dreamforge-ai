"use client";

import { useState } from 'react';
import { Download, Heart, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { ImageGalleryProps } from '@/types';


export function ImageGallery({ images, onLike, onDownload, onCopyPrompt }: ImageGalleryProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyPrompt = (id: string, prompt: string) => {
    onCopyPrompt(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {
        images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="group relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
          >
            {/* Image */}
            <div className="relative w-full aspect-5/5 overflow-hidden bg-black/40 rounded-xl">
              <img
                src={image.url}
                alt={image.prompt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Overlay - appears on hover */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              {/* Prompt */}
              <p className="text-white text-sm mb-3 line-clamp-2">{image.prompt}</p>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyPrompt(image.id, image.prompt)}
                  className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
                  title="Copy prompt"
                >
                  {copiedId === image.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span className="text-xs">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="text-xs">Copy</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onLike(image.id)}
                  className={`p-2 cursor-pointer rounded-lg backdrop-blur-sm border transition-all duration-200 ${
                    image.liked
                      ? 'bg-pink-500/30 border-pink-500 text-pink-400'
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  }`}
                  title="Like"
                >
                  <Heart className={`w-4 h-4 ${image.liked ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={() => onDownload(image.id)}
                  className="p-2 cursor-pointer rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Like indicator - always visible when liked */}
            {image.liked && (
              <div className="absolute top-3 right-3 p-2 rounded-full bg-pink-500/30 backdrop-blur-sm border border-pink-500">
                <Heart className="w-4 h-4 text-pink-400 fill-current" />
              </div>
            )}

            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-purple-500/20 via-transparent to-blue-500/20" />
            </div>
          </motion.div>
        ))
      }
    </div>
  );
}
