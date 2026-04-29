"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { ConfirmSignOutModalProps } from "@/types";

const ConfirmSignOutModal = ({ open, onClose, onConfirm, loading = false }: ConfirmSignOutModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-black/40 backdrop-blur-xl border border-white/10 text-white rounded-2xl shadow-2xl">

        <DialogHeader className="text-center">
          <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
            <LogOut className="h-6 w-6 text-red-400" />
          </div>

          <DialogTitle className="text-xl">
            Are you sure you want to sign out?
          </DialogTitle>

          <DialogDescription className="text-gray-400">
            You will need to sign in again to access your DreamForge dashboard.
          </DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 mt-6"
        >
          <Button
            variant="outline"
            onClick={onClose}
            className="cursor-pointer flex-1 border-white/10 bg-white/5 hover:bg-white/10 hover:text-white"
          >
            Cancel
          </Button>

          <Button
            onClick={onConfirm}
            disabled={loading}
            className="cursor-pointer flex-1 bg-red-600 hover:bg-red-700 text-white shadow-lg"
          >
            {loading ? "Signing out..." : "Yes, Sign Out"}
          </Button>
        </motion.div>

      </DialogContent>
    </Dialog>
  );
};

export default ConfirmSignOutModal;