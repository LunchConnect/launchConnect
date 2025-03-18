"use client";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorModalProps {
  open: boolean;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-lg p-6 bg-white dark:bg-gray-900">
        
        {/* Header with Icon on the Left */}
        <div className="flex items-center gap-3">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertCircle className="text-red-500" size={40} /> 
          </div>
          <div>
            <DialogTitle className="text-xl font-bold text-black dark:text-white">
              Incorrect Login Details
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300">
              Login failed. Check your credentials and try again.
            </DialogDescription>
          </div>
        </div>

        {/* Retry Button */}
        <div className="mt-6">
          <Button className="w-full bg-red-500 text-white hover:bg-red-600">
            Retry
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default ErrorModal;
