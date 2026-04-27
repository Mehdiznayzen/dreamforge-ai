"use client";

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageWithFallback } from '@/public/figma/ImageWithFallback';
import { usePathname, useRouter } from 'next/navigation';
import SigninPage from './sign-in/page';
import SignupPage from './sign-up/page';
import Image from 'next/image';

const AuthLayout = () => {
  const pathname = usePathname();
  const router = useRouter();

  const activeTab = pathname === "/sign-up" ? "register" : "login";

  const handleTabChange = (value: string) => {
    router.push(value === "login" ? "/sign-in" : "/sign-up");
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden relative">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-0 left-0 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-6xl bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
      >
        <div className="grid lg:grid-cols-2 min-h-175">
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-3 mb-12"
            >
              <div className="flex items-center gap-3">
                <Image 
                  src={"/images/logo.png"}
                  width={180}
                  height={180}
                  alt='logo'
                />
              </div>
            </motion.div>

            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 h-11 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
                <TabsTrigger
                  value="login"
                  className="cursor-pointer h-full rounded-xl text-sm font-medium text-gray-400 transition-all duration-300 flex items-center justify-center hover:text-white data-[state=active]:text-white data-[state=active]:bg-lineart-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-60 "
                >
                  Login
                </TabsTrigger>

                <TabsTrigger
                  value="register"
                  className="cursor-pointer h-full rounded-xl text-sm font-medium text-gray-400 transition-all duration-300 flex items-center justify-center hover:text-white data-[state=active]:text-white data-[state=active]:bg-lineart-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600"
                >
                  Register
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-6">
                <SigninPage />
              </TabsContent>

              <TabsContent value="register" className="space-y-6">
                <SignupPage />
              </TabsContent>
            </Tabs>
          </div>

          <div className="hidden lg:flex relative bg-linear-to-br from-purple-900/20 via-blue-900/20 to-black items-center justify-center p-12 overflow-hidden">
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-20 right-20 w-32 h-32 bg-linear-to-br from-purple-500 to-pink-500 rounded-full blur-2xl opacity-40"
            />
            <motion.div
              animate={{
                y: [0, 20, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
              className="absolute bottom-20 left-20 w-40 h-40 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full blur-2xl opacity-40"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative z-10"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-br from-purple-600 to-blue-600 rounded-3xl blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1761740533449-b8d4385e60b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBuZXVyYWwlMjBuZXR3b3JrfGVufDF8fHx8MTc3NzI4MjY3M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="AI Holographic Visual"
                  className="relative w-full max-w-md h-auto rounded-3xl shadow-2xl"
                />
              </div>

              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 3, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-10 -right-10 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl"
              >
                <Sparkles className="w-12 h-12 text-purple-400" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -3, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
                className="absolute -bottom-10 -left-10 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="text-3xl font-bold bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    10K+
                  </div>
                  <p className="text-xs text-gray-400">Active Users</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 left-12 right-12 text-center space-y-4"
            >
              <h3 className="text-3xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Create. Imagine. Generate.
              </h3>
              <p className="text-gray-400">
                Turn your ideas into powerful AI visuals in just a few seconds.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AuthLayout;