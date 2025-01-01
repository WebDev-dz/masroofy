import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import { useToast } from "../../hooks/use-toast"
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
import { accountSchema } from "../../schemas/validationSchema";
import { AsyncOperation } from "@/src/types/models";
import { currencies } from '../../constants/currencies';

type AccountFormProps = {
  onSubmit : (account: z.infer<typeof accountSchema>) => AsyncOperation<any>
} 

const AccountForm = ({onSubmit}: AccountFormProps) => {
    const form = useForm<z.infer<typeof accountSchema>>({
        resolver: zodResolver(accountSchema),
        defaultValues: { accountId: Math.floor( Math.random() * 1000000)
          
        },
      });
    
      const { toast } = useToast()
    
      async function handleSubmit(data: z.infer<typeof accountSchema>) {

        console.log({data})
        const res = await onSubmit(data)
        toast({
            title: "Transaction Submitted",
            description: JSON.stringify(data, null, 2),
            action: (
              <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            )})
       
      }

  return (
    <Form {...form}>
      <form onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(handleSubmit)
        console.log({data: form.getValues(), state: form.formState.errors})
        handleSubmit(form.getValues())
       }} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Name</FormLabel>
              <FormControl>
                <Input placeholder="Account Name" {...field} />
              </FormControl>
              <FormDescription>
                The name of the account, e.g., "Main Checking".
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="balance"
          render={({ field : {onChange, ...field} }) => (
            <FormItem>
              <FormLabel>Balance</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Current balance"
                  onChange={(n) => {form.setValue("balance", parseInt(n.target.value))}}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The current balance of the account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <FormControl>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(currencies).map((o, i) => (
                    <SelectItem value={o[0]}>{o[1].name}</SelectItem>
                  ))}
                  
                </SelectContent>
              </Select>
              </FormControl>
              <FormDescription>
                The ISO code for the currency (e.g., USD, EUR).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="checking">Checking</SelectItem>
                  <SelectItem value="savings">Savings</SelectItem>
                  <SelectItem value="credit">Credit</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
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
                onValueChange={(value) => field.onChange(value === "true")}
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

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Account color (e.g., #FF5733)" {...field} />
              </FormControl>
              <FormDescription>
                A color associated with this account, e.g., for visualization.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bankNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Number</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Bank Number" {...field} />
              </FormControl>
              <FormDescription>
                The bank number, if applicable.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default AccountForm