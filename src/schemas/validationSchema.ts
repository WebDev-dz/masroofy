import { z } from "zod";
import { Account } from "../types/models";

// Helper for ISO date string validation
const isoDateString = z.string().regex(
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:?\d{2})$/,
  "Invalid ISO date format"
);

export const accountSchema = z.object({
  accountId: z.number().positive(),
  balance: z.number(),
  currency: z.string().length(3), // ISO currency code
  type: z.enum(["checking", "savings", "credit", "investment", "cash"]),
  color: z.string(),
  bankNumber: z.string().optional(),
  name: z.string().min(1),
  isActive: z.boolean()
});

export const categorySchema = z.object({
  name: z.string().min(3),
  icon: z.string(),
  theme: z.string(),
  id: z.string(),
  parentId: z.string().optional(),
  isActive: z.boolean()
});



export const transactionSchema = z.object({
  transactionId: z.number().positive(),
  amount: z.number(),
  date: isoDateString,
  category: categorySchema,
  tags: z.array(z.string()),
  fromAccountId: z.number().positive().nullable(),
  toAccountId: z.number().positive().optional().nullable(),
  type: z.enum(["income", "expense", "transfer"]),
  status: z.enum(["pending", "completed", "failed", "cancelled"]),
  description: z.string().optional(),
  reference: z.string().optional(),
  createdAt: isoDateString,
  updatedAt: isoDateString,
  deletedAt: isoDateString.optional()
});
export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})
export const budgetSchema = z.object({
  budgetId: z.number().positive(),
  account: accountSchema,
  period: z.enum(["One time", "Month", "Week", "Year"]),
  limit: z.number().positive(),
  category: categorySchema.optional(),
  startDate: isoDateString,
  endDate: isoDateString.optional(),
  isRecurring: z.boolean()
});

export const savingsGoalSchema = z.object({
  goalId: z.number().positive(),
  name: z.string().min(1),
  targetAmount: z.number().positive(),
  currentAmount: z.number().min(0),
  dueDate: isoDateString,
  note: z.string(),
  color: z.string(),
  icon: z.string()
});

export const billSubscriptionSchema = z.object({
  billId: z.number().positive(),
  amount: z.number().positive(),
  dueDate: isoDateString
});

export const shoppingItemSchema = z.object({
  itemName: z.string().min(1),
  price: z.number().nonnegative(),
  quantity: z.number().min(1),
  category: z.string().optional()
});

export const shoppingListSchema = z.object({
  name: z.string().min(3),
  items: z.array(shoppingItemSchema)
}); 