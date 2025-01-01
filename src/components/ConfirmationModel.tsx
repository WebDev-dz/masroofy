import React, { useState } from "react";
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
import { AsyncOperation } from "../types/models";
import { toast } from "../hooks/use-toast";

type ConfirmationDialogProps = {
  triggerButton: React.ReactNode; // Button or element to open the dialog
  title: string; // Title of the dialog
  description?: string; // Optional description of the dialog
  confirmText?: string; // Text for the confirm button (default: "Confirm")
  cancelText?: string; // Text for the cancel button (default: "Cancel")
  onConfirm: () => AsyncOperation<any>; // Action to perform on confirmation
};

export function ConfirmationDialog({
  triggerButton,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
}: ConfirmationDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await onConfirm();

      if (response.error) {
        setError(response.error);
        toast({
          variant: "destructive",
          title: "Error",
          description: response.error.message || "An unexpected error occurred.",
        });
      } else {
        toast({
          title: "Success",
          description: "The operation was completed successfully.",
        });
        setIsOpen(false);
      }
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Unexpected Error",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Reset state when the dialog is reopened
  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      setError(null);
      setLoading(false);
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Processing..." : confirmText}
          </Button>
        </DialogFooter>
        {error && (
          <p className="mt-2 text-sm text-destructive">
            {error.message || "An unexpected error occurred."}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
