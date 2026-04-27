"use client";

import { motion } from "framer-motion"
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaGoogle} from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const SigninPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-3xl font-bold text-white mb-2 text-center">
          Access Your Account
        </h2>
        <p className="text-gray-400 text-center">
          Log in to continue building with AI.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-300">Email</Label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-300">Password</Label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="pl-12 pr-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
            Forgot password?
          </a>
        </div>

        {/* Login Button */}
        <Button className="cursor-pointer w-full h-12 bg-linear-to-r from-purple-600 to-blue-600 text-white hover:shadow-[0_0_40px_rgba(147,51,234,0.6)] transition-all duration-300 rounded-xl mt-6">
          Sign In
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>

      {/* Divider */}
      <div className="relative my-10 flex items-center">
        {/* Ligne gauche */}
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

        {/* Texte */}
        <span className="
          mx-4 px-4 py-1
          text-xs font-medium tracking-wide
          text-gray-400
          bg-black/40 backdrop-blur-md
          border border-white/10
          rounded-full
        ">
          Or continue with
        </span>

        {/* Ligne droite */}
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Social Login */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 gap-4"
      >
        <Button
          variant="outline"
          className="cursor-pointer h-12 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all rounded-xl"
        >
          <FaGoogle className="w-5 h-5 mr-2" />
          Google
        </Button>
        <Button
          variant="outline"
          className="cursor-pointer h-12 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all rounded-xl"
        >
          <FaGithub className="w-5 h-5 mr-2" />
          GitHub
        </Button>
      </motion.div>
    </>
    
  )
}

export default SigninPage;