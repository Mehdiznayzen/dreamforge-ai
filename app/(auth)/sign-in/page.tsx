"use client";

import { motion } from "framer-motion"
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaGoogle} from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useSignIn, useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { OAuthStrategy } from '@clerk/shared/types'
import { useRouter } from "next/navigation";
import CustomModalInput from "@/components/CustomModalInput";
import CustomInputOTP from "@/components/CustomInputOTP";
import CustomNewPasswordModal from "@/components/CustomNewPasswordModal";

const SigninPage = () => {
  const { isSignedIn } = useUser();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showInputOTP, setShowInputOTP] = useState(false);
  const { fetchStatus, signIn } = useSignIn();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalResetPassword, setShowModalResetPasswrod] = useState<boolean>(false);

  useEffect(() => {
    if(isSignedIn) {
      router.push('/');
    }
  }, [isSignedIn]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!signIn) return;
    setIsLoading(true);

    try {
      const { error } = await signIn.password({
        emailAddress: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error(error.message || "Login failed");
        return;
      }

      if (signIn.status === 'complete') {
        await signIn.finalize({
          navigate: ({ session, decorateUrl }) => {
            if (session?.currentTask) return;

            const url = decorateUrl('/');
            url.startsWith('http')
              ? (window.location.href = url)
              : router.push(url);
          },
        });

      } else if (signIn.status === 'needs_client_trust') {
        const emailCodeFactor = signIn.supportedSecondFactors.find(
          (factor) => factor.strategy === 'email_code',
        );

        if (emailCodeFactor) {
          await signIn.mfa.sendEmailCode();
          setShowInputOTP(true);
          toast.success("Verification code sent");
        }
      }

    } catch (error) {
      toast.error("Sign in failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async (strategy: OAuthStrategy) => {
    try {
      const { error } = await signIn.sso({
        strategy,
        redirectCallbackUrl: '/sso-callback',
        redirectUrl: '/',
      })
      if (error) {
        console.error(JSON.stringify(error, null, 2))
        return
      }

      if (signIn.status === 'needs_second_factor') {
      } else if (signIn.status === 'needs_client_trust') {
      } else {
        console.error('Sign-in attempt not complete:', signIn)
      }
    } catch (error) {
      console.log(error);
      toast.error("Google sign in failed");
    }
  }

  const handleSendCodeVarification = async (email: string) => {
    try {
      if (!signIn) return;
      const { error: createError } = await signIn.create({
        identifier: email,
      });

      if (createError) {
        toast.error(createError.message);
        return;
      }

      const { error: sendError } = await signIn.resetPasswordEmailCode.sendCode();
      if (sendError) {
        toast.error(sendError.message);
        return;
      }

      toast.success("Code sent to your email 📩");
      setShowModal(false);
      setShowInputOTP(true);

    } catch (err: any) {
      toast.error(err?.errors?.[0]?.message || "Failed to send code");
    }
  };

  const handleVerify = async (code: string) => {
    try {
      const { error } = await signIn.resetPasswordEmailCode.verifyCode({
        code,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Code verified ✅");
      setShowInputOTP(false);
      setShowModalResetPasswrod(true)
    } catch (err) {
      toast.error("Verification failed");
    }
  };

  const handleResendCode = async () => {
    try {
      await signIn.resetPasswordEmailCode.sendCode();
      toast.success("Code resent successfully");
    } catch (err: any) {
      toast.error(err?.errors?.[0]?.message || "Failed to resend code");
    }
  };
  
  const handleResetPassword = async (password: string) => {
    try {
      const { error } = await signIn.resetPasswordEmailCode.submitPassword({
        password
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (signIn.status === "complete") {
        await signIn.finalize();
        toast.success("Password updated successfully 🎉");
        setShowModalResetPasswrod(false);
        router.push("/");
      }

    } catch (err) {
      toast.error("Failed to update password");
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
          Access Your Account
        </h2>
        <p className="text-gray-400 text-center">
          Log in to continue building with AI.
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
        onSubmit={handleSignIn}
      >
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-300">Email</Label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
            <Input
              id="email"
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
          <Label htmlFor="password" className="text-gray-300">Password</Label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
            <Input
              id="password"
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

        {/* Forgot Password */}
        <div className="flex justify-end">
          <Button
            type="button"
            variant={"link"}
            onClick={() => setShowModal(true)}
            className="text-sm text-purple-400 cursor-pointer hover:no-underline transition-colors"
          >
            Forgot password?
          </Button>
        </div>

        <Button
          type="submit"
          disabled={isLoading || fetchStatus === "fetching"}
          className="cursor-pointer w-full h-12 bg-linear-to-r from-purple-600 to-blue-600 text-white hover:shadow-[0_0_40px_rgba(147,51,234,0.6)] transition-all duration-300 rounded-xl mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing in...
            </span>
          ) : (
            <>
              Sign In
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </motion.form>

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
        className="grid grid-cols-1 gap-4"
      >
        <Button
          variant="outline"
          className="cursor-pointer h-12 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all rounded-xl"
          onClick={() => handleGoogleSignIn('oauth_google')}
        >
          <FaGoogle className="w-5 h-5 mr-2" />
          Sign In with Google
        </Button>
      </motion.div>

      {
        showModal && (
          <CustomModalInput 
            open={showModal}
            onClose={() => setShowModal(false)}
            onSubmit={handleSendCodeVarification}
          />
        )
      }

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

      {
        showModalResetPassword && (
          <CustomNewPasswordModal 
            open={showModalResetPassword}
            onClose={() => setShowModalResetPasswrod(false)}
            onSubmit={handleResetPassword}
          />
        )
      }
    </>
    
  )
}

export default SigninPage;