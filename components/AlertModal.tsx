"use client";
import React from "react";
import { CheckCircle, XCircle } from "lucide-react"; // Success and Error icons
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface AlertModalProps {
  open: boolean;
  onClose: () => void;
  onAction: () => void;
  type: "success" | "error";  // ✅ Defines modal type
  title: string;
  description: string;
  buttonText: string;
}

const AlertModal: React.FC<AlertModalProps> = ({ open, onClose, onAction, type, title, description, buttonText }) => {
  const isSuccess = type === "success";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-lg p-6 bg-white">
        
        {/* Header with Icon on the Left */}
        <div className="flex flex-col items-start gap-3">
          <div className={`p-3 rounded-full ${isSuccess ? "bg-green-100" : "bg-red-100"}`}>
            {isSuccess ? (
              <CheckCircle className="text-primary" size={40} />
            ) : (
              <XCircle className="text-red-600" size={40} />
            )}
          </div>
          <div>
            <DialogTitle className={`text-xl font-bold mt-3 ${isSuccess ? "text-[#01011A]" : "text-[#01011A]"}`}>
              {title}
            </DialogTitle>
            <DialogDescription className="text-[#606060] mt-4">
              {description}
            </DialogDescription>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <Button
            className={`w-full text-white ${isSuccess ? "bg-green-500 hover:bg-green-600" : "bg-[#FB3748] hover:bg-red-600"}`}
            onClick={onAction}
          >
            {buttonText}
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default AlertModal;
