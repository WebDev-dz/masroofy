import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "../ui/input";
import { ColorsPicker } from "../ui/colors-picker"; // Assuming this is a custom component
import { toast } from "../../hooks/use-toast";
import { categorySchema } from "../../schemas/validationSchema";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  FormField,
  FormItem,
  Form,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { IconsPicker } from "../ui/icons-picker";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type FormDialogProps = {
  triggerButton: React.ReactNode; // Button or element to open the dialog
  title: string; // Title of the dialog
  description?: string; // Optional description of the dialog
  onCancel?: () => void; // Optional cancel handler
  submitText?: string; // Text for the submit button (default: "Save")
  onSubmit?: () => void; // Optional submit handler
  isLoading?: boolean; // Loading state for the submit button
};

export function FormDialog({
  triggerButton,
  title,
  description,
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
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      icon: "",
      theme: "#000000",
      // parentId: "",
      isActive: true,
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="space-y-6 flex flex-col max-w-full overflow-hidden"
          >
            <div className="fields-container over-flow-auto">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter category name" {...field} />
                    </FormControl>
                    <FormDescription>
                      The name of the category (minimum 3 characters).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Icon</FormLabel>
                    <IconsPicker
                      value={field.value}
                      onChange={field.onChange}
                      name="icon"
                      ref={field.ref}
                      onBlur={field.onBlur}
                      type="expense"
                    />
                    <FormDescription>
                      Select an icon to represent the category.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Theme</FormLabel>
                    <ColorsPicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormDescription>
                      Pick a color theme for the category.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Category</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter parent category ID (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Specify a parent category ID, if applicable.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      defaultValue={field.value ? "true" : "false"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">Active</SelectItem>
                        <SelectItem value="false">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <Button type="submit">Submit Category</Button> */}
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
        </Form>
      </DialogContent>
    </Dialog>
  );
}
