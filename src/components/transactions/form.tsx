"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../../hooks/use-toast";
import { ToastAction } from "../ui/toast";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "../../lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Pencil } from "lucide-react";
import { AsyncOperation, Transaction } from "../../types/models";
import { useAccountStore } from "../../stores/accountStore";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useCategoryStore } from "../../stores/categoryStore";

export const transactionSchema = z.object({
  transactionId: z.number().positive(),
  amount: z.number(),
  date: z.string(),
  category: z.object({
    name: z.string(),
    icon: z.string(),
    theme: z.string(),
    id: z.string(),
    isActive: z.boolean(),
  }),
  tags: z.array(z.string()),
  fromAccountId: z.number().positive().nullable(),
  toAccountId: z.number().positive().nullable(),
  type: z.enum(["income", "expense", "transfer"]),
  status: z.enum(["pending", "completed", "failed", "cancelled"]),
  description: z.string().optional(),
  reference: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type EntityFormType = "readonly" | "update" | "create";

type EntityFormProps<T> = {
  type: EntityFormType;
  title: string;
  value?: T;
  onSubmit?: (data: T) => AsyncOperation<any>;
};

type TransactionFormProps = EntityFormProps<Transaction>;

export default function TransactionForm({
  type,
  value,
  title,
  onSubmit,
}: TransactionFormProps) {
  const [isEditing, setIsEditing] = useState(type === "create");
  const { toast } = useToast();

  const { accounts } = useAccountStore((state) => state);
  const { categories } = useCategoryStore()

  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: type === "create" ? {} : value,
  });

  async function handleSubmit(data: z.infer<typeof transactionSchema>) {
    if (onSubmit) {
      const response = await onSubmit(data as Transaction);
      if (response) {
        toast({
          title: "Transaction Submitted",
          description: `Transaction ${data.transactionId} processed successfully.`,
          action: <ToastAction altText="Undo">Undo</ToastAction>,
        });
      }
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="text-xl"> {title} </CardTitle>
        {type == "update" &&
          (!isEditing ? (
            <Button
              onClick={(e) => {
                setIsEditing(true);
              }}
            >
              {" "}
              <Pencil />{" "}
            </Button>
          ) : (
            <Button
              onClick={(e) => {
                handleSubmit(form.getValues());
                setIsEditing(false);
              }}
            >
              {" "}
              Save{" "}
            </Button>
          ))}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              console.log({data: form.getValues()})
              e.preventDefault()
              handleSubmit(form.getValues())
              }}
            className="space-y-6"
          >
            

            {/* Amount */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field: {onChange, ...field} }) => (
                <FormItem className="flex gap-3 items-center">
                  <FormLabel className="basis-1/4">Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Amount"
                      onChange={(e) => {form.setValue("amount", parseFloat(e.target.value))}}
                      readOnly={type === "readonly" || !isEditing}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex gap-3">
                  <FormLabel className="basis-1/4">Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          disabled={type === "readonly" || !isEditing}
                        >
                          {field.value
                            ? format(new Date(field.value), "PPP")
                            : "Pick a date"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      {type !== "readonly" && (
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={new Date(field.value) || new Date()}
                            onSelect={(date) =>
                              form.setValue("date", date?.toISOString() || "")
                            }
                            className="rounded-md border"
                          />
                        </PopoverContent>
                      )}
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* From Account */}
            <FormField
              control={form.control}
              name="fromAccountId"
              render={({ field }) => (
                <FormItem className="flex gap-3 items-center">
                  <FormLabel className="basis-1/4">From Account</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={`${field.value}`}
                      disabled={type === "readonly" || !isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an account" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.map((account) => (
                          <SelectItem
                            key={account.accountId}
                            value={`${account.accountId}`}
                          >
                            {account.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

             {/* From Account */}
             <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex gap-3 items-center">
                  <FormLabel className="basis-1/4">From Account</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(va) =>{
                        form.setValue("category", categories.find((ca) => ca.id == (va))!)}}
                      
                      defaultValue={`${field.value}`}
                      disabled={type === "readonly" || !isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an account" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem
                            key={cat.id}
                            value={`${cat.id}`}
                          >
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* From Account */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex gap-3 items-center">
                  <FormLabel className="basis-1/4">Transaction Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(val) => form.setValue("fromAccountId", parseInt(val))}
                      defaultValue={`${field.value}`}
                      disabled={type === "readonly" || !isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                        {["income", "expense", "transfer"].map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.toLocaleUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             { form.watch("type") == "transfer" ? <FormField
              control={form.control}
              name="toAccountId"
              render={({ field: {value, onChange, ...field} }) => (
                <FormItem className="flex gap-3 items-center">
                  <FormLabel className="basis-1/4">To Account </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(val) => form.setValue("toAccountId", parseInt(val))}
                      defaultValue={`${value}`}
                      disabled={type === "readonly" || !isEditing}
                      {...field}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an account" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.map((account) => (
                          <SelectItem
                            key={account.accountId}
                            value={`${account.accountId}`}
                          >
                            {account.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />:<></>}

            {/* Submit Button */}
            {type == "create" && <Button type="submit">{"Create"}</Button>}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
