"use client";
import { CheckCircle } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  onProceed: () => void;
  title: string;          // ✅ Dynamic title
  description: string;    // ✅ Dynamic description
  buttonText: string;     // ✅ Dynamic button text
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  open,
  onClose,
  onProceed,
  title,
  description,
  buttonText,
}) => {
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
              {title} {/* ✅ Dynamic title */}
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300">
              {description} {/* ✅ Dynamic description */}
            </DialogDescription>
          </div>
        </div>

        {/* Proceed Button */}
        <div className="mt-6">
          <Button className="w-full bg-green-500 text-white hover:bg-green-600" onClick={onProceed}>
            {buttonText} {/* ✅ Dynamic button text */}
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
