"use client"

import { useState } from 'react';
import { Sparkles, Settings2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GenerationSettings, PromptInputProps } from '@/types';

const PromptInput = ({ onGenerate, isGenerating }: PromptInputProps) => {
  const [prompt, setPrompt] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<GenerationSettings>({
    model: 'stable-diffusion-xl',
    style: 'photorealistic',
    aspectRatio: '1:1',
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onGenerate(prompt, settings);
    }
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black via-black/95 to-transparent">
      <div className="max-w-5xl mx-auto">
        <AnimatePresence>
          {
            showSettings && (
              <motion.div
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: 20, height: 0 }}
                className="mb-4 p-5 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                  <div className="group">
                    <label className="block text-xs tracking-wider uppercase text-white/60 mb-2">
                      Model
                    </label>

                    <div className="relative">
                      <select
                        value={settings.model}
                        onChange={(e) => setSettings({ ...settings, model: e.target.value })}
                        className="w-full appearance-none cursor-pointer px-4 py-3 pr-10 rounded-2xl 
                        bg-linear-to-b from-white/10 to-white/5 
                        backdrop-blur-xl border border-white/10 
                        text-white shadow-lg
                        focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                        hover:border-purple-400/40 transition-all"
                      >
                        <option className="text-black" value="stable-diffusion-xl">Stable Diffusion XL</option>
                        <option className="text-black" value="midjourney-v6">Midjourney v6</option>
                        <option className="text-black" value="dall-e-3">DALL·E 3</option>
                        <option className="text-black" value="leonardo-ai">Leonardo AI</option>
                      </select>

                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none transition-all duration-300 group-focus-within:text-white group-focus-within:rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* STYLE */}
                  <div className="group">
                    <label className="block text-xs tracking-wider uppercase text-white/60 mb-2">
                      Style
                    </label>

                    <div className="relative">
                      <select
                        value={settings.style}
                        onChange={(e) => setSettings({ ...settings, style: e.target.value })}
                        className="w-full appearance-none cursor-pointer px-4 py-3 pr-10 rounded-2xl 
                        bg-linear-to-b from-white/10 to-white/5 
                        backdrop-blur-xl border border-white/10 
                        text-white shadow-lg
                        focus:outline-none focus:ring-2 focus:ring-blue-500/50 
                        hover:border-blue-400/40 transition-all"
                      >
                        <option className="text-black" value="photorealistic">Photorealistic</option>
                        <option className="text-black" value="artistic">Artistic</option>
                        <option className="text-black" value="anime">Anime</option>
                        <option className="text-black" value="3d-render">3D Render</option>
                        <option className="text-black" value="digital-art">Digital Art</option>
                        <option className="text-black" value="oil-painting">Oil Painting</option>
                      </select>

                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none transition-all duration-300 group-focus-within:text-white group-focus-within:rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* ASPECT RATIO */}
                  <div className="group">
                    <label className="block text-xs tracking-wider uppercase text-white/60 mb-2">
                      Aspect Ratio
                    </label>

                    <div className="relative">
                      <select
                        value={settings.aspectRatio}
                        onChange={(e) => setSettings({ ...settings, aspectRatio: e.target.value })}
                        className="w-full appearance-none cursor-pointer px-4 py-3 pr-10 rounded-2xl 
                        bg-linear-to-b from-white/10 to-white/5 
                        backdrop-blur-xl border border-white/10 
                        text-white shadow-lg
                        focus:outline-none focus:ring-2 focus:ring-pink-500/50 
                        hover:border-pink-400/40 transition-all"
                      >
                        <option className="text-black" value="1:1">1:1 Square</option>
                        <option className="text-black" value="16:9">16:9 Landscape</option>
                        <option className="text-black" value="9:16">9:16 Portrait</option>
                        <option className="text-black" value="4:3">4:3 Standard</option>
                        <option className="text-black" value="3:2">3:2 Photo</option>
                      </select>

                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none transition-all duration-300 group-focus-within:text-white group-focus-within:rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )
          }
        </AnimatePresence>

        {/* Main Input Area */}
        <div className="relative rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />

          <div className="relative flex items-end gap-3 p-4">
            {/* Settings Toggle Button */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-3 rounded-xl transition-all duration-300 ${
                showSettings
                  ? 'bg-purple-500/30 border border-purple-500 text-purple-400'
                  : 'bg-white/10 border border-white/20 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
              title="Advanced settings"
            >
              <Settings2 className="w-5 h-5" />
            </button>

            {/* Text Input */}
            <div className="flex-1">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe the image you want to generate..."
                rows={1}
                disabled={isGenerating}
                className="w-full px-4 py-3 bg-transparent text-white placeholder-white/50 focus:outline-none resize-none max-h-32"
                style={{ minHeight: '48px' }}
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={() => onGenerate(prompt, settings)}
              disabled={!prompt.trim() || isGenerating}
              className={`
                px-6 cursor-pointer py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2
                ${!prompt.trim() || isGenerating
                  ? 'bg-white/10 text-white/40 cursor-not-allowed'
                  : 'bg-linear-to-r from-purple-500 via-pink-500 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105'
                }
              `}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate</span>
                </>
              )}
            </button>
          </div>

          {/* Neon glow effect */}
          {!isGenerating && prompt.trim() && (
            <div className="absolute inset-0 rounded-2xl opacity-50 pointer-events-none">
              <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-xl" />
            </div>
          )}
        </div>

        {/* Generation Progress Indicator */}
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center justify-center gap-3"
          >
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-linear-to-r from-purple-500 to-pink-500"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
            <p className="text-sm text-white/70">Creating your masterpiece...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}


export default PromptInput;