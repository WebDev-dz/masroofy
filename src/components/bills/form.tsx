import { toast } from "../../hooks/use-toast";
import { billSubscriptionSchema } from "../../schemas/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "../ui/form";
import { Input } from "../ui/input";



export function BillSubscriptionForm() {
  const form = useForm<z.infer<typeof billSubscriptionSchema>>({
    resolver: zodResolver(billSubscriptionSchema),
    defaultValues: {
      amount: 0,
      dueDate: "",
    },
  });

  function onSubmit(data: z.infer<typeof billSubscriptionSchema>) {
    toast({
      title: "Bill Subscription Submitted",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter amount" {...field} />
              </FormControl>
              <FormDescription>
                The amount for this bill or subscription.
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
                The date this bill or subscription is due.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit Bill</Button>
      </form>
    </Form>
  );
}
