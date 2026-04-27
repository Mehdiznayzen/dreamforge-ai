"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion"
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-3xl font-bold text-white mb-2 text-center">
          Create Your Workspace
        </h2>
        <p className="text-gray-400 text-center">
          Everything you need to create with AI, in one place.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <div className="space-y-2">
          <Label htmlFor="register-username" className="text-gray-300">Username</Label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
            <Input
              id="register-username"
              type="text"
              placeholder="John Doe"
              className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-email" className="text-gray-300">Email</Label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
            <Input
              id="register-email"
              type="email"
              placeholder="john@doe.com"
              className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-password" className="text-gray-300">Password</Label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
            <Input
              id="register-password"
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

        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="text-gray-300">Confirm Password</Label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
            <Input
              id="confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="pl-12 pr-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <Button className="cursor-pointer w-full h-12 bg-linear-to-r from-purple-600 to-blue-600 text-white hover:shadow-[0_0_40px_rgba(147,51,234,0.6)] transition-all duration-300 rounded-xl mt-6">
          Create Account
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>

      <div className="relative my-10 flex items-center">
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

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

        <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 gap-4"
      >
        <Button
          variant="outline"
          className="cursor-pointer h-12 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all rounded-xl"
        >
          <FaGoogle className="w-5 h-5 mr-2" />
          Google
        </Button>
      </motion.div>

      <p className="text-xs text-gray-500 text-center mt-4">
        By creating an account, you agree to our{' '}
        <Link href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
          Privacy Policy
        </Link>
      </p>
    </>
  )
}

export default SignupPage;