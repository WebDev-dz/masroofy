import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import { useToast } from "../../hooks/use-toast";
import { ToastAction } from "../ui/toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"; // Adjust the import path as necessary

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
import { Account, AsyncOperation } from "../../types/models";
import { currencies } from "../../constants/currencies";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Title } from "@radix-ui/react-dialog";

type EntityFormType = "readonly" | "update" | "create";

type EntityFormProps<T> = {
  type: EntityFormType;
  title: string
  value?: T;
  onSubmit?: (data: T) => AsyncOperation<any>;
};

type AccountFormProps = EntityFormProps<Account>;

const AccountForm = ({ type,title,  value, onSubmit }: AccountFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: value,
  });

  const { toast } = useToast();

  async function handleSubmit(data: z.infer<typeof accountSchema>) {
    if (onSubmit) {
      const response = await onSubmit(data as Account);
      if (response) {
        toast({
          title: "Account Submitted",
          description: `Account ${data.accountId} processed successfully.`,
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
              e.preventDefault();
              form.handleSubmit(handleSubmit);
              console.log({
                data: form.getValues(),
                state: form.formState.errors,
              });
              handleSubmit(form.getValues());
            }}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex gap-3 items-center">
                  <FormLabel className="basis-1/4">Account Name</FormLabel>
                  <div>
                    <FormControl>
                      <Input placeholder="Account Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      The name of the account, e.g., "Main Checking".
                    </FormDescription>
                    <FormMessage />{" "}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="balance"
              render={({ field: { onChange, ...field } }) => (
                <FormItem className="flex gap-3 items-center">
                  <FormLabel className="basis-1/4">Balance</FormLabel>
                  <div>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Current balance"
                        onChange={(n) => {
                          form.setValue("balance", parseInt(n.target.value));
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The current balance of the account.
                    </FormDescription>
                    <FormMessage />{" "}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem className="flex gap-3 items-center">
                  <FormLabel className="basis-1/4">Currency</FormLabel>
                  <div>
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
                    <FormMessage />{" "}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex gap-3 items-center">
                  <FormLabel className="basis-1/4">Account Type</FormLabel>
                  <div>
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
                    <FormMessage />{" "}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex gap-3 items-center">
                  <FormLabel className="basis-1/4">Status</FormLabel>
                  <div>
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
                    <FormMessage />{" "}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="flex gap-3 items-center">
                  <FormLabel className="basis-1/4">Color</FormLabel>
                  <div>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Account color (e.g., #FF5733)"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A color associated with this account, e.g., for
                      visualization.
                    </FormDescription>
                    <FormMessage />{" "}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bankNumber"
              render={({ field }) => (
                <FormItem className="flex gap-3 items-center">
                  <FormLabel className="basis-1/4">Bank Number</FormLabel>
                  <div>
                    <FormControl>
                      <Input type="text" placeholder="Bank Number" {...field} />
                    </FormControl>
                    <FormDescription>
                      The bank number, if applicable.
                    </FormDescription>
                    <FormMessage />{" "}
                  </div>
                </FormItem>
              )}
            />

            {type == "create" && <Button type="submit">Submit</Button>}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AccountForm;
