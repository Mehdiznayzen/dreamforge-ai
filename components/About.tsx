"use client";

import { ImageWithFallback } from '@/public/figma/ImageWithFallback';
import { motion } from 'framer-motion';
import { Brain, Zap, Users } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-black via-purple-950/20 to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-br from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-2 border border-white/10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1737505599159-5ffc1dcbc08f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBuZXVyYWwlMjBuZXR3b3JrfGVufDF8fHx8MTc3NzI4MjY3M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Neural Network Technology"
                  className="w-full h-125 object-cover rounded-2xl"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">About DreamForge AI</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Empowering Creativity with{' '}
              <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Advanced AI
              </span>
            </h2>

            <p className="text-lg text-gray-400 leading-relaxed">
              DreamForge AI is revolutionizing digital art creation by combining cutting-edge artificial
              intelligence with intuitive design. Our mission is to democratize creativity and make
              professional-grade image generation accessible to everyone.
            </p>

            <p className="text-lg text-gray-400 leading-relaxed">
              Whether you're a professional designer, content creator, or someone exploring their creative
              side, our platform transforms your ideas into stunning visual reality in seconds.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-3xl font-bold text-white">2M+</span>
                </div>
                <p className="text-sm text-gray-400">Images Created</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-3xl font-bold text-white">50K+</span>
                </div>
                <p className="text-sm text-gray-400">Active Users</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span className="text-3xl font-bold text-white">99%</span>
                </div>
                <p className="text-sm text-gray-400">Satisfaction</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;