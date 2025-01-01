import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Checkbox } from "../ui/checkbox"
import { budgetSchema } from "../../schemas/validationSchema"
import { categories } from "@/src/constants"

// Import your existing schemas (accountSchema and categorySchema)

// Assuming isoDateString is a custom validation for ISO date format
const isoDateString = z.string().refine((val) => !isNaN(Date.parse(val)), {
  message: "Invalid date format, must be ISO 8601",
})



export function BudgetForm() {
  const form = useForm({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      budgetId: 1,
      account: {
        accountId: 1,
        balance: 0,
        currency: "USD",
        type: "checking",
        color: "#ffffff",
        isActive: true,
      },
      period: "Month",
      limit: 0,
      category: undefined, // Optionally, set a default category if necessary
      startDate: new Date().toISOString().split("T")[0], // Default to today's date
      isRecurring: false,
    },
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="budgetId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget ID</FormLabel>
              <FormControl>
                <Input placeholder="Budget ID" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="account.accountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account ID</FormLabel>
              <FormControl>
                <Input placeholder="Account ID" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="period"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Period</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="One time">One time</SelectItem>
                    <SelectItem value="Month">Month</SelectItem>
                    <SelectItem value="Week">Week</SelectItem>
                    <SelectItem value="Year">Year</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="limit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Limit</FormLabel>
              <FormControl>
                <Input placeholder="Budget Limit" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                        <SelectItem key = {c.id} value= {c.name}>Checking</SelectItem>
                    ))}
                    
                    
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date (Optional)</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="isRecurring"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Is Recurring</FormLabel>
              <FormControl>
              <Checkbox checked={field.value} ref={field.ref} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
