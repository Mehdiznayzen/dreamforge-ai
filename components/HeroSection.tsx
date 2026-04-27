"use client";

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from '@/public/figma/ImageWithFallback';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-black">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-600/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-600/30 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">AI-Powered Image Generation</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Turn Your{' '}
            <span className="bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Imagination
            </span>{' '}
            Into AI-Generated Art
          </h1>

          <p className="text-xl text-gray-400 leading-relaxed">
            Transform your ideas into stunning visual masterpieces with cutting-edge AI technology.
            Create professional-grade artwork in seconds, no design skills required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Input
                placeholder="Describe your dream image..."
                className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-14 px-6 rounded-xl backdrop-blur-sm focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
            <Button className="h-14 cursor-pointer px-8 bg-linear-to-r from-purple-600 to-blue-600 text-white hover:shadow-[0_0_40px_rgba(147,51,234,0.6)] transition-all duration-300 rounded-xl">
              Generate Image
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <div className="flex items-center gap-6">
            <Button
              className="border-white/20 text-white hover:bg-white/5 transition-all duration-300 h-10 px-6 cursor-pointer"
            >
              Explore Gallery
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-blue-500 border-2 border-black flex items-center justify-center text-xs font-bold"
                >
                  {i}K
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-400">15K+ creators</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-blue-600 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

            {/* Main Image */}
            <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-2 border border-white/10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1704189125621-55e8c6cfd166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxBSSUyMGdlbmVyYXRlZCUyMGFydCUyMGZ1dHVyaXN0aWMlMjBkaWdpdGFsfGVufDF8fHx8MTc3NzI4MjY3M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="AI Generated Art Example"
                className="w-full h-150 object-cover rounded-2xl"
              />
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">Super Fast</p>
                  <p className="text-gray-400 text-sm">Generated in 3s</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-400 to-pink-600 flex items-center justify-center text-white font-bold">
                  4K
                </div>
                <div>
                  <p className="text-white font-semibold">High Quality</p>
                  <p className="text-gray-400 text-sm">Ultra HD Output</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;