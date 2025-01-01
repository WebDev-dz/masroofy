"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

type FormDialogProps = {
  triggerButton: React.ReactNode; // Button or element to open the dialog
  title: string; // Title of the dialog
  description?: string; // Optional description of the dialog
  children: React.ReactNode; // Your custom form or component
  onCancel?: () => void; // Optional cancel handler
  submitText?: string; // Text for the submit button (default: "Save")
  onSubmit?: () => void; // Optional submit handler
  isLoading?: boolean; // Loading state for the submit button
};

export function FormDialog({
  triggerButton,
  title,
  description,
  children,
  onCancel,
  onSubmit,
  submitText = "Save",
  isLoading = false,
}: FormDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleCancel = () => {
    setIsOpen(false);
    if (onCancel) onCancel();
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <form onSubmit={(e) => e.preventDefault()} className="h-96 flex flex-col space-y-4">
          {/* Render your form or custom content here */}
          <div className="overflow-auto">
            {children}

          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : submitText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
