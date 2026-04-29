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
import { Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface CustomNewPasswordModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (password: string) => Promise<void>;
}

const CustomNewPasswordModal = ({ open, onClose, onSubmit }: CustomNewPasswordModalProps) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const isValid =
    password.length >= 6 &&
    confirm.length >= 6 &&
    password === confirm;

  const handleSubmit = async () => {
    if (!isValid) return;

    try {
      setLoading(true);
      await onSubmit(password);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-black/40 backdrop-blur-xl border border-white/10 text-white rounded-2xl shadow-2xl">

        <DialogHeader>
          <DialogTitle className="text-xl text-center">
            Set a new password
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-center">
            Enter your new password below
          </DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 py-6"
        >
          {/* Password */}
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="pl-12 pr-12 h-12 bg-white/5 border-white/10 text-white rounded-xl"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
            <Input
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm password"
              className="pl-12 pr-12 h-12 bg-white/5 border-white/10 text-white rounded-xl"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Error message */}
          {password && confirm && password !== confirm && (
            <p className="text-sm text-red-400 text-center">
              Passwords do not match
            </p>
          )}
        </motion.div>

        <Button
          disabled={!isValid || loading}
          onClick={handleSubmit}
          className="cursor-pointer w-full h-12 bg-linear-to-r from-purple-600 to-blue-600 rounded-xl disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </Button>

      </DialogContent>
    </Dialog>
  );
};

export default CustomNewPasswordModal;