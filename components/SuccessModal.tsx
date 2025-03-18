"use client";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-lg p-6">
        
        {/* Header Section with Icon on the Left */}
        <DialogHeader className="flex items-center gap-3">
          <CheckCircle className="text-green-600" size={40} /> 
          <div>
            <DialogTitle className="text-xl font-bold">
              Successful Password Creation
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Password changed successfully. You can now log in.
            </DialogDescription>
          </div>
        </DialogHeader>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <Button variant="outline" onClick={onClose} className="w-full">
            Cancel
          </Button>
          <Button className="w-full bg-green-500 text-white hover:bg-green-600">
            Log In
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
