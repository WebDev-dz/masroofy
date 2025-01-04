import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Pencil } from "lucide-react";

import { z } from "zod";
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
import { useBudgetStore } from "../../stores/budgetStore";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AsyncOperation, Budget } from "../../types/models";
import { useState } from "react";
import { budgetSchema } from "../../schemas/validationSchema";
import { Checkbox } from "../ui/checkbox";
import { useAccountStore } from "../../stores/accountStore";
import { useCategoryStore } from "../../stores/categoryStore";
type EntityFormType = "readonly" | "update" | "create";

type EntityFormProps<T> = {
  type: EntityFormType;
  title: string;
  value?: T;
  onSubmit?: (data: T) => AsyncOperation<any>;
};

type BudgetFormProps = EntityFormProps<Budget>;

export default function BudgetForm({ type, value, title, onSubmit }: BudgetFormProps) {
  const [isEditing, setIsEditing] = useState(true);
  const { toast } = useToast();
  const { accounts } = useAccountStore();
  const { categories } = useCategoryStore();
  const form = useForm<z.infer<typeof budgetSchema>>({
    resolver: zodResolver(budgetSchema),
    defaultValues: type === "create" ? {} : value,
  });

  async function handleSubmit(data: z.infer<typeof budgetSchema>) {
    if (onSubmit) {
      const response = await onSubmit(data as Budget);
      if (response) {
        toast({
          title: "Budget Submitted",
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
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Amount */}
            <FormField
              control={form.control}
              name="budgetId"
              render={({ field: { onChange, ...field } }) => (
                <FormItem className="flex gap-3 items-center">
                  <FormLabel className="basis-1/4">Budget Id</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Amount"
                      onChange={(e) => {
                        form.setValue("budgetId", parseFloat(e.target.value));
                      }}
                      readOnly={type === "readonly" || !isEditing}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="account"
              render={({ field }) => (
                <FormItem className="flex gap-3 items-center">
                  <FormLabel className="basis-1/4">Account</FormLabel>
                  <Select
                    disabled={!isEditing}
                    onValueChange={(c) => form.setValue("account", accounts.find(a => a?.accountId == parseInt(c))!)}
                    defaultValue={`${field.value?.accountId}`}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {accounts.map((account) => (
                        <SelectItem value={`${account?.accountId}`}>
                          {account.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="period"
              render={({ field }) => (
                <FormItem className="flex gap-3 items-center">
                  <FormLabel className="basis-1/4">Period</FormLabel>
                  <Select
                    disabled={type === "readonly" || !isEditing}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="One time">One time</SelectItem>
                      <SelectItem value="Month">Month</SelectItem>
                      <SelectItem value="Week">Week</SelectItem>
                      <SelectItem value="Year">Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount */}
            <FormField
              control={form.control}
              name="limit"
              render={({ field: { onChange, ...field } }) => (
                <FormItem className="flex gap-3 items-center">
                  <FormLabel className="basis-1/4">Limit</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Amount"
                      onChange={(e) => {
                        form.setValue("limit", parseFloat(e.target.value));
                      }}
                      readOnly={type === "readonly" || !isEditing}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex gap-3 items-center">
                  <FormLabel className="basis-1/4">Category</FormLabel>
                  <Select
                    disabled={type === "readonly" || !isEditing}
                    onValueChange={field.onChange}
                    defaultValue={field.value?.id}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {categories.map((category) => (
                        <SelectItem value={`${category.id}`}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex gap-3 items-center">
                  <FormLabel className="basis-1/4">Start Date</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex gap-3 items-center">
                  <FormLabel className="basis-1/4">End Date</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isRecurring"
              render={({ field: { onChange, ...field } }) => (
                <FormItem className="flex gap-3 items-center">
                  <FormLabel className="basis-1/4">Is Recurring</FormLabel>
                  <FormControl>
                    <Checkbox
                      disabled={type === "readonly" || !isEditing}
                      checked={field.value}
                      onCheckedChange={(e) =>
                        form.setValue("isRecurring", e as boolean)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Submit Button */}
            {type == "create" && <Button type="submit">{"Create"}</Button>}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
