import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, useFieldArray } from "react-hook-form";
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
import { shoppingListSchema } from "../../schemas/validationSchema";

type ShoppingFormProps = {}

const ShoppingForm = (props: ShoppingFormProps) => {
    const form = useForm<z.infer<typeof shoppingListSchema>>({
        resolver: zodResolver(shoppingListSchema),
        defaultValues: {
          
        },
      });
    
      const { toast } = useToast()
      const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "items",
      });
    
      function onSubmit(data: z.infer<typeof shoppingListSchema>) {
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
        {fields.map((item, index) => (
          <div key={item.id} className="space-y-4 border-b pb-4 mb-4">
            <FormField
              control={form.control}
              name={`items.${index}.itemName`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter item name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`items.${index}.quantity`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter quantity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`items.${index}.category`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="groceries">Groceries</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            

            <Button variant="destructive" onClick={() => remove(index)}>
              Remove Item
            </Button>
          </div>
        ))}

        <Button
          type="button"
          onClick={() =>
            append({ itemName: "", quantity: 1, category: "", price: 0 })
          }
        >
          Add Item
        </Button>

        <Button type="submit">Submit Shopping List</Button>
      </form>
    </Form>
  )
}

export default ShoppingForm