"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CustomInputOTPProps } from "@/types";

const CustomInputOTP = ({ open, onClose, onSubmit, onResend }: CustomInputOTPProps) => {
  const [value, setValue] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(0);

  const isComplete = value.length === 6;

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = async () => {
    if (timer > 0) return;

    try {
      setIsResending(true);
      await onResend();

      setTimer(30);
    } catch (error) {
      console.log(error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={onClose}
    >
      <DialogContent className="bg-black/40 backdrop-blur-xl border border-white/10 text-white rounded-2xl shadow-2xl">

        <DialogHeader>
          <DialogTitle className="text-xl text-center">
            Verify your email
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-center">
            Enter the 6-digit code sent to your email
          </DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center py-6"
        >
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup className="gap-3">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </motion.div>

        <Button
          disabled={!isComplete}
          className="cursor-pointer w-full h-12 bg-linear-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:shadow-purple-500/30 transition-all rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onSubmit(value)}
        >
          Verify Code
        </Button>

        <p className="text-xs text-center text-gray-500 mt-2">
          Didn’t receive code?{" "}
          <button
            onClick={handleResend}
            disabled={timer > 0 || isResending}
            className="text-purple-400 cursor-pointer hover:underline disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            {
              isResending
              ? "Sending..."
              : timer > 0
              ? `Resend in ${timer}s`
              : "Resend"
            }
          </button>
        </p>

      </DialogContent>
    </Dialog>
  );
};

export default CustomInputOTP;