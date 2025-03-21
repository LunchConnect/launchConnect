"use client";
import { CheckCircle } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";


interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  onProceed: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ open, onClose, onProceed }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-lg p-6 bg-white dark:bg-gray-900">
        
        {/* Header with Icon on the Left */}
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="text-green-600" size={40} /> 
          </div>
          <div>
            <DialogTitle className="text-xl font-bold text-black dark:text-white">
              Login Successful
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300">
              Welcome back! You’ve logged in successfully.
            </DialogDescription>
          </div>
        </div>

        {/* Proceed Button */}
        <div className="mt-6">
          <Button className="w-full bg-green-500 text-white hover:bg-green-600" onClick={onProceed}>
            Proceed to Dashboard
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
