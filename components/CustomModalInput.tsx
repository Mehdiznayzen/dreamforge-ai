"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface CustomModalInputProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (email: string) => Promise<void>;
}

const CustomModalInput = ({ open, onClose, onSubmit }: CustomModalInputProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (!isValid) return;

    try {
      setLoading(true);
      await onSubmit(email);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
            Reset your password
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-center">
            Enter your email to receive a verification code
          </DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-6"
        >
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@doe.com"
              className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            />
          </div>
        </motion.div>

        <Button
          disabled={!isValid || loading}
          onClick={handleSubmit}
          className="cursor-pointer w-full h-12 bg-linear-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:shadow-purple-500/30 transition-all rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send Reset Code"}
        </Button>

      </DialogContent>
    </Dialog>
  );
};

export default CustomModalInput;