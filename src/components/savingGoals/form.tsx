import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { z } from "zod";

import { toast, useToast } from "../../hooks/use-toast"
import { ToastAction } from "../ui/toast"

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { savingsGoalSchema, shoppingListSchema } from "../../schemas/validationSchema";

export function SavingsGoalForm() {
    const form = useForm<z.infer<typeof savingsGoalSchema>>({
      resolver: zodResolver(savingsGoalSchema),
      defaultValues: {
        name: "",
        targetAmount: 0,
        currentAmount: 0,
        dueDate: "",
        note: "",
        color: "#000000",
        icon: "🏦",
      },
    });


    function onSubmit(data: z.infer<typeof savingsGoalSchema>) {
        toast({
            title: "Transaction Submitted",
            description: JSON.stringify(data, null, 2),
            action: (
              <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            )})
       
      }


    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter goal name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The name of your savings goal, e.g., "Vacation Fund".
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
    
            <FormField
              control={form.control}
              name="targetAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter target amount"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The amount you want to save for this goal.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
    
            <FormField
              control={form.control}
              name="currentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter current saved amount"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The amount you've already saved toward this goal.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
    
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="Enter due date" {...field} />
                  </FormControl>
                  <FormDescription>
                    The target date to achieve this goal.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
    
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Input placeholder="Optional notes" {...field} />
                  </FormControl>
                  <FormDescription>
                    Any additional notes about this goal.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
    
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input
                      type="color"
                      placeholder="Pick a color"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A color to represent this goal.
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
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter an emoji or icon"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    An emoji or icon to symbolize this goal (e.g., 🏦, ✈️).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
    
            <Button type="submit">Submit Goal</Button>
          </form>
        </Form>
      );
    }