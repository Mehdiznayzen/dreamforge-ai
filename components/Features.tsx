"use client";

import { features } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Features = () => {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-black via-blue-950/10 to-black" />

      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-linear-to-r from-purple-600/10 to-blue-600/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">Powerful Features</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold">
            Everything You Need to{' '}
            <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Create Magic
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Packed with cutting-edge features designed to bring your creative visions to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8, transition: { duration: 0.3 } }}
                        className="group relative"
                    >
                        <div className={`absolute inset-0 bg-linear-to-br ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />

                        <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                            <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <Icon className="w-7 h-7 text-white" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>

                            <div className={`absolute top-6 right-6 w-20 h-20 bg-linear-to-br ${feature.gradient} rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                        </div>
                    </motion.div>
                );
            })
          }
        </div>
      </div>
    </section>
  );
}

export default Features;