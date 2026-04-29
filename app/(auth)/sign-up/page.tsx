"use client";

import CustomInputOTP from "@/components/CustomInputOTP";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUp, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion"
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { OAuthStrategy } from '@clerk/shared/types'


const SignupPage = () => {
  const { signUp } = useSignUp();
  const { isSignedIn } = useUser();
  const [showInputOTP, setShowInputOTP] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if(isSignedIn) {
      router.push('/');
    }
  }, [isSignedIn]);

  const handleResendCode = async () => {
    try {
      await signUp.verifications.sendEmailCode();
      toast.success("Code resent successfully");
    } catch (err: any) {
      toast.error(err?.errors?.[0]?.message || "Failed to resend code");
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
      });

      await signUp.verifications.sendEmailCode();

      setShowInputOTP(true);
      toast.success("Verification code sent to email");
    } catch (err: any) {
      console.log(err);
      toast.error(err.errors?.[0]?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (code: string) => {
    try {
      const result = await signUp.verifications.verifyEmailCode({
        code,
      });

      if (signUp.status === "complete") {
        await signUp.finalize();
        toast.success("Account created successfully");
        setShowInputOTP(false);
        router.push("/");
      } else {
        toast.error("Invalid code");
      }
    } catch (err) {
      console.log(err);
      toast.error("Verification failed");
    }
  };

  const handleGoogleSignUp = async (strategy: OAuthStrategy) => {
    try {
      const { error } = await signUp.sso({
        strategy,
        redirectCallbackUrl: '/sso-callback',
        redirectUrl: '/',
      });
      if (error) {
        console.error(JSON.stringify(error, null, 2))
        return
      }
    } catch (error) {
      console.log(error);
      toast.error("Google sign in failed");
    }
  }

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

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
        onSubmit={handleCreateUser}
      >
        <div className="space-y-2">
          <Label htmlFor="register-username" className="text-gray-300">Username</Label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
            <Input
              id="register-username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              name="username"
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
              value={formData.email}
              onChange={handleChange}
              name="email"
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
              value={formData.password}
              onChange={handleChange}
              name="password"
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
              value={formData.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
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

        <div id="clerk-captcha"></div>

        <Button
          type="submit"
          disabled={isLoading}
          className="cursor-pointer w-full h-12 bg-linear-to-r from-purple-600 to-blue-600 text-white hover:shadow-[0_0_40px_rgba(147,51,234,0.6)] transition-all duration-300 rounded-xl mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating Account...
            </div>
          ) : (
            <>
              Create Account
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </motion.form>

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
          onClick={() => handleGoogleSignUp('oauth_google')}
        >
          <FaGoogle className="w-5 h-5 mr-2" />
          Sign up with Google
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

      {
        showInputOTP && (
          <CustomInputOTP
            open={showInputOTP}
            onClose={() => setShowInputOTP(false)}
            onSubmit={handleVerify}
            onResend={handleResendCode}
          />
        )
      }
    </>
  )
}

export default SignupPage;